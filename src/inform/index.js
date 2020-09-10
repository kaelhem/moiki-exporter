/**
All this stuff was made possible with the help of @batteman and the fiction-interactive.fr community.
*/

import kebabCase from 'lodash.kebabcase'
import { getHeader, getAuthor } from '../utils'

const convertId = id => id.replace(/-/gi, '_')
const cleanContent = (content) => {
  return content
    .replace(/(<\/*(strong|b)>)/gi, '')
    .replace(/(<\/*(em)>)/gi, '')
    .replace(/(<\/*(h\d)>)/gi, '')
    .replace(/<span class="ql-cursor">/gi, '')
    .replace(/<\/p>/gi, '</p> ')
    .replace(/<\/*p>/gi, '')
    .replace(/(<\/*(span)>)/gi, '')
    .replace(/(\s)+/gi, ' ')
    .replace(/\s*<br\s*\/*>(\s|&nbsp;)*/gi, '^')
    .replace(/(\s)*&nbsp;(\s)*/gi, ' ') // maybe: [unicode 160] ?
    .replace(/(\"|“|”)/gim, '~')
    .replace(/\^/gim, '@@94')
    .trim()
}

const directions = ['w', 's', 'e', 'n', 'nw', 'ne', 'sw', 'se']

const getChoiceGotoFunctionFromIndex = (index) => {
  if (index >= 0 && index < 10) {
    return directions[index] + '_to'
  }
  throw new Error('Only 8 choices are allowed here...')
}

const getChoiceLinkValue = (choice, variables) => {
  if (choice.action && choice.action.params && typeof choice.action.params === 'string') {
    return `[; ClearScreen(); ${variables[choice.action.params].identifier}=inverse(${variables[choice.action.params].identifier}); style bold; addOrRemoveObject(${variables[choice.action.params].identifier}); print "${cleanContent(variables[choice.action.params].desc)}"; style roman; attend(); PlayerTo(${convertId(choice.next)}); rtrue;]`
  } else if (choice.condition && choice.condition.next && choice.condition.params) {
    return `[; ClearScreen(); if (${variables[choice.condition.params].identifier}) PlayerTo(${convertId(choice.condition.next)}); else PlayerTo(${convertId(choice.next)}); rtrue;]`
  } else {
    return `[; ClearScreen(); PlayerTo(${convertId(choice.next)}); rtrue;]`
  }
}

const getNodeDescription = (sequence, variables) => {
  const text = cleanContent(sequence.content)
  if (sequence.next && (!sequence.choices || sequence.choices.length === 0)) {
    // simple sequence
    if (sequence.action && sequence.action.params && typeof sequence.action.params === 'string') {
      return `[; print "${text}^^"; ${variables[sequence.action.params].identifier}=inverse(${variables[sequence.action.params].identifier}); style bold; addOrRemoveObject(${variables[sequence.action.params].identifier}); print "${cleanContent(variables[sequence.action.params].desc)}"; style roman; attend(); PlayerTo(${convertId(sequence.next)});];\n`
    } else if (sequence.condition && sequence.condition.next && sequence.condition.params) {
      return `[; print "${text}"; if (${variables[sequence.condition.params].identifier}) PlayerTo(${convertId(sequence.condition.next)}); else PlayerTo(${convertId(sequence.next)});];\n`
    }
    return `[; print "${text}"; PlayerTo(${convertId(sequence.next)});];\n`
  } else if (sequence.choices && sequence.choices.length > 0) {
    // choice sequence
    let choicesDescription = ''
    const choicesLinks = []
    let choiceIndex = 0
    for (let choice of sequence.choices) {
      const choiceContent = cleanContent(choice.content)
      choicesDescription += '- ' + (choiceIndex + 1) + '. ' + choiceContent + '^'
      choicesLinks.push({
        gotoFunction: getChoiceGotoFunctionFromIndex(choiceIndex),
        gotoValue: getChoiceLinkValue(choice, variables)
      })
      ++choiceIndex
    }
    return `"${text}^^${choicesDescription}",\n  ${choicesLinks.map(l => `${l.gotoFunction} ${l.gotoValue}`).join(',\n  ')};`
  } else {
    // final sequence
    return `[; print "${text}^"; deadflag=${ sequence.isHappyEnd ? '2' : '1' };];\n`
  }
}

export const convertToInform = (story) => {
  const { _id, meta, firstSequence, sequences, assets } = story

  let variables = {}
  for (let asset of assets) {
    variables[asset.id] = {
      identifier: '_' + convertId(kebabCase(asset.label)),
      ...asset
    }
  }

  const varsAsArray = Object.entries(variables).map(([_, data]) => data)

  let result = `!% !-s

! ${getHeader(_id).split('\n').join('\n! ')}

! author: ${getAuthor(meta)}
! title: ${meta.name}

Constant Story "${meta.name}";
Constant Headline "^${meta.description}^^Une histoire de ${getAuthor(meta)}.^^Cette histoire a été exportée avec Moiki Exporter.^La version originelle est accessible ici : https://moiki.fr/story/${_id}^";
Release 1;

Constant NO_SCORE;

Include "parser";

! Add a prefix to every commands to shortcut the lib. credit: @hlabrande
[ BeforeParsing pos ;
  #Ifdef TARGET_ZCODE;
    pos = parse->5;
  #Ifnot; ! TARGET_GLULX
    pos = parse->3;
  #Endif; ! TARGET_
  LTI_Insert(pos, 'c');
  LTI_Insert(pos+1, 'h');
  LTI_Insert(pos+2, 'o');
  LTI_Insert(pos+3, 'i');
  LTI_Insert(pos+4, 'x');
  LTI_Insert(pos+5, ' ');
  Tokenise__(buffer, parse);
];

Include "verblib";

! Wait for player to press a key. credit: @FibreTigre.
[ attend notNeeded;
  @read_char 1 notNeeded;
  rtrue;
];

[ addOrRemoveObject obj;
  if (obj) print "Objet récupéré : "; else print "Objet perdu : ";
  rtrue;
];

[ inverse obj;
  if (obj) return false; else return true;
];
`

if (varsAsArray.length > 0) {
result += `
! Variables for Objects / Heroes
!-------------------------------------------
${varsAsArray.map(v => 'Global ' + (v.identifier + ' = false')).join(';\n')};
`
}

result += `
! Start story
! ------------------------------------------

Class sequence
  with cant_go [; print "Choix non reconnu, veuillez recommencer.^"; <<Look>>; ];

`

  for (let sequence of sequences) {   
    result += `
Sequence ${convertId(sequence.id)} ""
with name "${convertId(sequence.id)}",
  description ${getNodeDescription(sequence, variables)}
`
}

result += `

! Routines
!-----------------------------------

[ Initialise;
  location = ${convertId(firstSequence)};
  give player light;
  introduction();
  lookmode=2; ! les lieux déjà visités sont décrits à chaque fois
  return;
];

[ introduction;
  style underline;
  print "Ce jeu ne se joue qu'en tapant les chiffres de vos choix.^De ce fait, vous ne pourrez ni sauver ni quitter de manière classique.^^";
  attend();
];

[ DeathMessage;
  switch (deadflag) {
    1: print "Fin Tragique !";
    2: print "Fin Heureuse !";
  }
];


! Grammar
!-----------------------------------

Include "FrenchG";

[ ChoixNumberSub ;
  ${directions.map((d, idx) => (`if (noun == ${idx + 1}) <<Go ${d}_obj>>;`)).join('\n  ')}
  print "Choix non reconnu, veuillez recommencer.^";
];

Verb 'choix'
* number        ->choixNumber;
`
  return result
}