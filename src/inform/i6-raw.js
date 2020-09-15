/**
Thi export will not use any extra library, just Inform.
*/

import kebabCase from 'lodash.kebabcase'
import { getHeader, getAuthor } from '../utils'
import { convertId, cleanContent } from './i6-utils'

export const convertToI6Raw = (story) => {
  const { _id, meta, firstSequence, sequences, assets } = story

  const writeStyle = (style, tabs=1) => `#IfV5; style ${style}; #EndIf;\n${'  '.repeat(tabs)}`
  const bold = (tabs) => writeStyle('bold', tabs)
  const reverse = (tabs) => writeStyle('reverse', tabs)
  const underline = (tabs) => writeStyle('underline', tabs)
  const roman = (tabs) => writeStyle('roman', tabs)

  let variables = {}
  for (let asset of assets) {
    variables[asset.id] = {
      identifier: '_' + convertId(kebabCase(asset.label)),
      ...asset
    }
  }

  const varsAsArray = Object.entries(variables).map(([_, data]) => data)

  const getChoiceLinkValue = (choice, variables) => {
    if (choice.action && choice.action.params && typeof choice.action.params === 'string') {
      return [
        `cls();`,
        `${variables[choice.action.params].identifier} = inverse(${variables[choice.action.params].identifier});`,
        `${ bold() }addOrRemoveObject(${variables[choice.action.params].identifier});`,
        `print "${cleanContent(variables[choice.action.params].desc)}";`,
        `${ roman() }wait();`,
        `return ${convertId(choice.next)};`
      ]
    } else if (choice.condition && choice.condition.next && choice.condition.params) {
      return [
        `cls();`,
        `if (${variables[choice.condition.params].identifier}) return ${convertId(choice.condition.next)};`,
        `return ${convertId(choice.next)};`
      ]
    } else {
      return [ 
        `cls();`,
        `return ${convertId(choice.next)};`
      ]
    }
  }

  const getNodeDescription = (sequence, variables) => {
    let statements = null
    const listVars = []
    const text = cleanContent(sequence.content)
    if (sequence.next && (!sequence.choices || sequence.choices.length === 0)) {
      // simple sequence
      if (sequence.action && sequence.action.params && typeof sequence.action.params === 'string') {
        statements = [
          `print "${text}^^";`,
          `${variables[sequence.action.params].identifier} = inverse(${variables[sequence.action.params].identifier});`,
          `${ bold() }addOrRemoveObject(${variables[sequence.action.params].identifier});`,
          `print "${cleanContent(variables[sequence.action.params].desc)}";`,
          `${ roman() }wait();`,
          `return ${convertId(sequence.next)};`
        ]
      } else if (sequence.condition && sequence.condition.next && sequence.condition.params) {
        statements = [
          `print "${text}";`,
          `wait();`,
          `if (${variables[sequence.condition.params].identifier}) return ${convertId(sequence.condition.next)};`,
          `return ${convertId(sequence.next)};`
        ]
      } else {
        statements = [
          `print "${text}";`,
          `wait();`,
          `return ${convertId(sequence.next)};`
        ]
      }
    } else if (sequence.choices && sequence.choices.length > 0) {
      // choice sequence
      listVars.push('choice')
      let choicesDescription = ''
      const choicesLinks = []
      let choiceIndex = 0
      for (let choice of sequence.choices) {
        const choiceContent = cleanContent(choice.content)
        choicesDescription += '- ' + (choiceIndex + 1) + '. ' + choiceContent + '^'
        choicesLinks.push(getChoiceLinkValue(choice, variables))
        ++choiceIndex
      }
      statements = [
        `print "${text}^^${choicesDescription}";`,
        `choice = getInputChoice(${choicesLinks.length});`,
        ...choicesLinks.map((link, i) => `if (choice == ${ i + 1 }) {\n    ${link.join('\n    ')}\n  }`)
      ]
    } else {
      // final sequence
      statements = [
        `print "${text}^";`,
        `wait();`,
        `gameOver = ${ sequence.isHappyEnd ? '1' : '2'};`,
        `return nothing;`
      ]
    }
    return {
      statements: statements.join('\n  '),
      vars: listVars
    }
  }

  let result = `!% !-s
!% $OMIT_UNUSED_ROUTINES=1

! ${getHeader(_id).split('\n').join('\n! ')}

! author: ${getAuthor(meta)}
! title: ${meta.name}

! Inform settings
! -------------------------------------------

Object DefaultRoomStoryForStatusBar "${meta.name}"; ! used to force name in status line
Global location = DefaultRoomStoryForStatusBar; ! Must be the first global to show location name
Global status_field_1 = 0; ! Must be the second global to show score or hours
Global status_field_2 = 0; ! Must be the third global to show turns or minutes

! Variables for game management
! -------------------------------------------
! Array path --> 10; ! allow 10 undo moves, but it's not implemented yet...
Global markForRedo = 0; ! used to restart game from beginning
Global markForShow = 0; ! used to re-display sequence text
Global gameOver = 0;

! Manage user inputs
! -------------------------------------------

! fix: in z-code v3, input buffers are not formatted the same way...
#IfV3;
  Constant inputBufferStartIndex 1;
  [ length arr len;
    len = 0;
    while (arr->(len+1) ~= 0) ++len;
    return len;
  ];
#Ifnot;
  Constant inputBufferStartIndex 2;
  [ length arr;
    return arr->1;
  ];
#EndIf;

! read user inputs
[ KeyLine buffer;
  buffer->0 = 10;
  read buffer 0;
  return buffer;
];

! To store user input
Array key -> 13;

! read user choices / menu commands
[ getInputChoice numChoices len chNum commandUnknown done;
  done = false;
  do {
    commandUnknown = false;
    do {
      print "> ";
    } until(KeyLine(key)-->0);
    len = length(key);
    if (len == 4) {
      if (key->inputBufferStartIndex == 'h' && key->(inputBufferStartIndex+1) == 'e' && key->(inputBufferStartIndex+2) == 'l' && key->(inputBufferStartIndex+3) == 'p') {
        showHelp();
      } else if (key->inputBufferStartIndex == 'u' && key->(inputBufferStartIndex+1) == 'n' && key->(inputBufferStartIndex+2) == 'd' && key->(inputBufferStartIndex+3) == 'o') {
        undo();
      } else if (key->inputBufferStartIndex == 'r' && key->(inputBufferStartIndex+1) == 'e' && key->(inputBufferStartIndex+2) == 'd' && key->(inputBufferStartIndex+3) == 'o') {
        if (redo()) return;
      } else if (key->inputBufferStartIndex == 'e' && key->(inputBufferStartIndex+1) == 'x' && key->(inputBufferStartIndex+2) == 'i' && key->(inputBufferStartIndex+3) == 't') {
        exit();
      } else if (key->inputBufferStartIndex == 'l' && key->(inputBufferStartIndex+1) == 'i' && key->(inputBufferStartIndex+2) == 's' && key->(inputBufferStartIndex+3) == 't') {
        inventory();
      } else if (key->inputBufferStartIndex == 's' && key->(inputBufferStartIndex+1) == 'h' && key->(inputBufferStartIndex+2) == 'o' && key->(inputBufferStartIndex+3) == 'w') {
        markForShow = 1;
        return;
      } else {
        commandUnknown = true;
      }
    } else if (len == 1) {
      chNum = key->inputBufferStartIndex - 48;
      if (chNum > 0 && chNum <= numChoices) {
        done = true;
      } else if (chNum > 0 && chNum <= 10) {
        print "Cette saisie ne correspond à aucun choix !^";
      } else {
        commandUnknown = true;
      }
    } else {
      commandUnknown = true;
    }
    if (commandUnknown) {
      print "Cette commande est inconnue ! Tapez ~HELP~ pour une liste des commandes disponibles.^";
    }
  } until(done);
  return chNum;
];

[ confirm question len ok done;
  done = false;
  ok = false;
  do {
    do {
      if (question) {
        print (string) question;
      } else {
        print "Etes-vous sûr de vouloir faire cette action ? (oui/non)";
      }
      print "^> ";
    } until(KeyLine(key)-->0);
    len = length(key);
    if (len == 1) {
      if (key->inputBufferStartIndex == 'o' or '1') {
        ok = true;
        done = true;
      } else if (key->inputBufferStartIndex == 'n' or '0') {
        done = true;
      }
    } else if (len == 3) {
      if (key->inputBufferStartIndex == 'o' && key->(inputBufferStartIndex+1) == 'u' && key->(inputBufferStartIndex+2) == 'i') {
        ok = true;
        done = true;
      } else if (key->inputBufferStartIndex == 'n' && key->(inputBufferStartIndex+1) == 'o' && key->(inputBufferStartIndex+2) == 'n') {
        done = true;
      }
    }
    if (~~done) {
      print "Veuillez répondre par oui ou non.^";
    }
  } until(done);
  return ok;
];


! Game utils
! -------------------------------------------

! fix: in z-code v3, it seems there is no way to clear the screen...
#IfV3;
  [ cls;
    print "----------------------------------------^";
    rtrue;
  ];
#Ifnot;
  [ cls;
    @erase_window -1;
    rtrue;
  ];
#EndIf;

[ wait;
  read key 0;
];

`

if (varsAsArray.length > 0) {
result += `
! Variables for Objects / Heroes
!-------------------------------------------
${varsAsArray.map(v => 'Global ' + v.identifier).join(';\n')};
`}

result += `
[ clearObjects;
  ${(varsAsArray && varsAsArray.length > 0) && varsAsArray.map(v => v.identifier + ' = false').join(';\n  ')};
  return;
];


! Game menu entries
! -------------------------------------------

[ showHelp;
  ${ underline() }print "Liste des commandes^";
  ${ roman() }! print "  - UNDO : Retourner au choix précédent^";
  print "  - REDO : Recommencer depuis le début^";
  print "  - LIST : Lister les objets récupérés^";
  print "  - SHOW : Afficher le texte de la dernière séquence^";
  print "  - EXIT : Quitter^";
  rtrue;
];

[ exit;
  print "Bye-bye !^";
  @quit;
];

[ undo;
  print "Undo: not implemented yet !^";
  rtrue;
];

[ redo;
  if (confirm("Recommencer depuis le début ?")) {
    markForRedo = 1;
    rtrue;
  }
  rfalse;
];

[ inventory empty;
  empty = true;
  ${ underline() }print "Liste des objets de l'inventaire:^";
  ${ roman() }${varsAsArray.map(v => 'if (' + v.identifier + ') {\n    print "* ' + v.desc + '^";\n    empty = false;\n  }').join('\n  ')}
  if (empty) print "Votre inventaire est vide !^";
  rtrue;
];


! Routines
!-----------------------------------

[ addOrRemoveObject obj;
  if (obj) {
    ++status_field_1;
    print "Objet récupéré : ";
  } else {
    --status_field_1;
    print "Objet perdu : ";
  }
  rtrue;
];

[ inverse obj;
  if (obj) rfalse; else rtrue;
];

[ startScreen;
  ${ underline() }print "Cette histoire a été exportée avec Moiki Exporter.^La version originelle est accessible ici : https://moiki.fr/story/${_id}^^";
  ${ roman() }print "Moiki présente:^";
  ${ bold() }print "${meta.name}^^";
  ${ roman() }print "Une histoire de ${getAuthor(meta)}^^${meta.description}^";
  rtrue;
];

[ startGameLoop next res;
  next = ${convertId(firstSequence)};
  do {
    ++status_field_2; ! increase turn counter
    res = next();
    if (markForShow == 1) {
      markForShow = 0;
      res = next;
    }
    if (markForRedo == 1) {
      res = false;
    }
    next = res;
    print "^";
  } until(~~next);
  if (gameOver > 0) {
    ${ bold(2) }if (gameOver == 1) {
      print "Gagné !^^";
    } else if (gameOver == 2) {
      print "Perdu !^^";
    }
    ${ roman(2) }gameOver = 0;
  }
];

[ Main replay;
  startScreen();
  wait();
  do {
    cls();
    replay = false;
    clearObjects();
    status_field_1 = 0; ! reset score counter
    status_field_2 = 0; ! reset turns counter
    startGameLoop();
    if (markForRedo == 1) {
      markForRedo = 0;
      replay = true;
    } else if (confirm("Lancer une autre partie ? (oui/non)")) {
      replay = true;
    } else {
      exit();
    }
  } until(~~replay);
];


! Story sequences
! ------------------------------------------

`
  for (let sequence of sequences) {
    const { statements, vars } = getNodeDescription(sequence, variables)
    result += `[ ${convertId(sequence.id)}${vars && vars.length > 0 ? ' ' + vars.join(' ') : ''};\n  ${statements}\n];\n\n`
  }
  return result
}