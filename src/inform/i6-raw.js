/**
This export will not use any extra library, just Inform.

TODO: 
* add undo feature
*/

import kebabCase from 'lodash.kebabcase'
import { getHeader, getAuthor } from '../utils'
import * as informUtils from './i6-utils'

export const convertToI6Raw = (story) => {
  const { _id, meta, firstSequence, sequences, assets } = story
  const { convertId, cleanContent } = informUtils
  const STRINGS = informUtils.DEFAULT_STRINGS_FR
  const config = informUtils.informDefaultConfig

  const writeStyle = (style, tabs=1) => `#IfV5; style ${style}; #EndIf;\n${'  '.repeat(tabs)}`
  const bold = (tabs) => writeStyle('bold', tabs)
  const reverse = (tabs) => writeStyle('reverse', tabs)
  const underline = (tabs) => writeStyle('underline', tabs)
  const roman = (tabs) => writeStyle('roman', tabs)

  let variables = {}
  for (const [idx, asset] of assets.entries()) {
    variables[asset.id] = {
      identifier: '_' + convertId(kebabCase(asset.label), '') + '_' + (idx + 1),
      ...asset
    }
  }

  const varsAsArray = Object.entries(variables).map(([_, data]) => data)

  const getChoiceLinkValue = (choice, variables) => {
    if (choice.action && choice.action.params && typeof choice.action.params === 'string') {
      return [
        `cls();`,
        `${ bold(2) }toggleItem(${variables[choice.action.params].identifier});`,
        `print "${cleanContent(variables[choice.action.params].desc)}";`,
        `${ roman(2) }wait();`,
        `return ${convertId(choice.next)};`
      ]
    } else if (choice.condition && choice.condition.next && choice.condition.params) {
      return [
        `cls();`,
        `if (hasItem(${variables[choice.condition.params].identifier})) return ${convertId(choice.condition.next)};`,
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
          `${ bold() }toggleItem(${variables[sequence.action.params].identifier});`,
          `print "${cleanContent(variables[sequence.action.params].desc)}";`,
          `${ roman() }wait();`,
          `return ${convertId(sequence.next)};`
        ]
      } else if (sequence.condition && sequence.condition.next && sequence.condition.params) {
        statements = [
          `print "${text}";`,
          `wait();`,
          `if (hasItem(${variables[sequence.condition.params].identifier})) return ${convertId(sequence.condition.next)};`,
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

  // this helper method allows to construct the conditions checking user input (to match commands)
  const getInputConditionFor = (str, lenVarName='len') => {
    const matchChars = str.toLowerCase().split('').map((c, i) => {
      const thisKey = i === 0 ? `key->inputBufferStartIndex` : `key->(inputBufferStartIndex+${i})`
      return `${thisKey} == '${c}'`
    }).join(' && ')
    return `if (${lenVarName} == ${str.length} && ${matchChars}) {`
  }

  const moikiInformLibrary = `! This file contains the necessary core for the Moiki export to Inform6
! kaelhem (c) 2020
! kaelhem at gmail com


! Inform settings
! -------------------------------------------

Global location = DefaultRoomForStatusBar; ! Must be the first global to show location name
Global status_field_1 = 0; ! Must be the second global to show score or hours
Global status_field_2 = 0; ! Must be the third global to show turns or minutes


! Variables for game management
! -------------------------------------------
! Array path --> 10; ! allow 10 undo moves, but it's not implemented yet...
Global markForRedo = 0; ! used to restart game from beginning
Global markForShow = 0; ! used to re-display sequence text
Global gameOver = 0;


! Items management
! -------------------------------------------

#IfV3;
  Array userItems->(2+COUNT_TOTAL_ITEMS);
#IfNot;
  Array userItems->(3+COUNT_TOTAL_ITEMS);
#EndIf;

[ clearItems i;
  for (i=1: i<=userItems->0: i++) {
    userItems->i = 0;
  }
  return;
];

[ addItem index;
  userItems->index = 1;
  return;
];

[ removeItem index;
  userItems->index = 0;
  return;
];

[ hasItem index;
  return userItems->index == 1;
];

[ toggleItem index;
  if (userItems->index == 0) {
    userItems->index = 1;
    ++status_field_1;
    print (string) STR_OBJECT_WON;
  } else {
    userItems->index = 0;
    --status_field_1;
    print (string) STR_OBJECT_LOST;
  }
  return;
];

[ countItems i count;
  count = 0;
  for (i=1: i<=COUNT_TOTAL_ITEMS: i++) {
    if (userItems->i == 1) ++count;
  }
  return count;
];

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

! convert a string into array
[ toArray str arr;
  @output_stream 3 arr;
  @print_paddr str;
  @output_stream -3;
  return arr;
];

! take a char and return the same in lower case
[ toLowerCase c;
  if (c >= 'A' && c <= 'Z') return c + 32; else return c;
];

! return true if the given command as string match the current input buffer
[isCommand cmd aCmd i;
  aCmd = toArray(cmd);
  if (aCmd-->0 == length(key)) {
    for (i=0: i<aCmd-->0: i++) {
      if (key->(inputBufferStartIndex+i) ~= toLowerCase(aCmd->(2+i))) rfalse;
    }
    rtrue;
  }
  rfalse;
];

! store user input
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
    if (len == 1) {
      chNum = key->inputBufferStartIndex - 48;
      if (chNum > 0 && chNum <= numChoices) {
        done = true;
      } else if (chNum > 0 && chNum <= 10) {
        print (string) STR_NOCHOICE_MATCH, "^";
      } else {
        commandUnknown = true;
      }
    } else if (isCommand(STR_CMD_HELP)) {
      showHelp();
    } else if (isCommand(STR_CMD_UNDO)) {
      undo();
    } else if (isCommand(STR_CMD_REDO)) {
      if (redo()) return 0;
    } else if (isCommand(STR_CMD_EXIT)) {
      exit();
    } else if (isCommand(STR_CMD_LIST)) {
      inventory();
    } else if (isCommand(STR_CMD_SHOW)) {
      markForShow = 1;
      return 0;
    } else {
      commandUnknown = true;
    }
    if (commandUnknown) {
      print (string) STR_COMMAND_UNKNOWN_LEFT, (string) STR_CMD_HELP, (string) STR_COMMAND_UNKNOWN_RIGHT, "^";
    }
  } until(done);
  return chNum;
];

[ confirm question ok done;
  done = false;
  ok = false;
  do {
    do {
      if (question) {
        print (string) question;
      } else {
        print (string) STR_DEFAULT_CONFIRM_MSG;
      }
      print " (", (string) STR_CMD_YES, "/", (string) STR_CMD_NO, ")^> ";
    } until(KeyLine(key)-->0);
    if (isCommand(STR_CMD_YES) || isCommand(STR_CMD_YES_SHORT)) {
      ok = true;
      done = true;
    } else if (isCommand(STR_CMD_NO) || isCommand(STR_CMD_NO_SHORT)) {
      done = true;
    }
    if (~~done) {
      print (string) STR_PLEASE_ANSWER, (string) STR_CMD_YES, (string) STR_OR, (string) STR_CMD_NO,".^";
    }
  } until(done);
  return ok;
];

[ cls;
  #IfV3;
    ! in v3 it seems there is no way to clear the screen...
    print (string) CLS_PATTERN, "^";
  #Ifnot;
    @erase_window -1; ! this opcode is not available in V3
  #EndIf;
  rtrue;
];

[ wait x;
  #IfV3;
    read key 0;
  #Ifnot;
    @read_char 1 x; ! this opcode is not available in V3
    print "^";
  #EndIf;
];


! Menu
! -------------------------------------------

[ showHelp;
  ${ underline() }print (string) STR_LIST_OF_COMMANDS, "^";
  ${ roman() }! print "  - ", (string) STR_CMD_UNDO, (string) STR_COLON, " ", (string) STR_BACK_TO_PREVIOUS, "^";
  print "  - ", (string) STR_CMD_REDO, (string) STR_COLON, " ", (string) STR_RESTART_GAME, "^";
  print "  - ", (string) STR_CMD_LIST, (string) STR_COLON, " ", (string) STR_LIST_OBJECTS, "^";
  print "  - ", (string) STR_CMD_SHOW, (string) STR_COLON, " ", (string) STR_RESHOW_TEXT, "^";
  print "  - ", (string) STR_CMD_EXIT, (string) STR_COLON, " ", (string) STR_QUIT, "^";
  rtrue;
];

[ exit;
  print (string) STR_BYE_BYE, "^";
  @quit;
];

[ undo;
  print "Undo: not implemented yet !^";
  rtrue;
];

[ redo;
  if (confirm(STR_CONFIRM_RESTART)) {
    markForRedo = 1;
    rtrue;
  }
  rfalse;
];

[ inventory i;
  if (countItems() == 0) {
    print (string) STR_INVENTORY_EMPTY, "^";
  } else {
    ${ underline(2) }print (string) STR_INVENTORY_LIST, "^";
    ${ roman(2) }for (i=1: i<=COUNT_TOTAL_ITEMS: i++) {
      if (hasItem(i)) print "* ", (string) getItemDescription(i), "^";
    }
  }
  rtrue;
];


! Presentation
! -------------------------------------------

[ startScreen;
  ${ underline() }print (string) STR_HEADER, " ", (string) STORY_URL, "^^";
  ${ roman() }print (string) STR_MOIKI_PRESENTS, "^";
  ${ bold() }print (string) STORY_TITLE, "^^";
  ${ roman() }print (string) STR_A_STORY_BY, " ", (string) STORY_AUTHOR, "^^", (string) STORY_DESCRIPTION, "^";
  rtrue;
];


! Game loop
! -------------------------------------------
[ mainLoop firstSequence next res;
  next = firstSequence;
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
      print (string) STR_WIN_GAME, "^^";
    } else if (gameOver == 2) {
      print (string) STR_LOSE_GAME, "^^";
    }
    ${ roman(2) }gameOver = 0;
  }
];

[ startGame firstSequence replay msg;
  startScreen();
  wait();
  do {
    cls();
    replay = false;
    clearItems();
    status_field_1 = 0; ! reset score counter
    status_field_2 = 0; ! reset turns counter
    mainLoop(firstSequence);
    if (markForRedo == 1) {
      markForRedo = 0;
      replay = true;
    } else {
      
      if (confirm(STR_ANOTHER_GAME)) {
        replay = true;
      } else {
        exit();
      }
    }
  } until(~~replay);
];
`

  let moikiInformStory = `!% !-s
!% $OMIT_UNUSED_ROUTINES=1

! ${getHeader(_id).split('\n').join('\n! ')}

! author: ${getAuthor(meta)}
! title: ${meta.name}

Object DefaultRoomForStatusBar "${meta.name}"; ! used to force name in status line

! Constants
! -------------------------------------------
Constant STORY_TITLE = "${cleanContent(meta.name)}";
Constant STORY_DESCRIPTION = "${cleanContent(meta.description)}";
Constant STORY_AUTHOR = "${cleanContent(getAuthor(meta))}";
Constant STORY_URL = "https://moiki.fr/story/${_id}";

! Strings
${Object.entries(STRINGS).map(([key, value]) => `Constant STR_${key} = "${value}";`).join('\n')}
! Config
Constant CLS_PATTERN = "${config.CLS_PATTERN.repeat(40).slice(0, 40)}";


! Defines Objects / Heroes
!-------------------------------------------
Constant COUNT_TOTAL_ITEMS = ${varsAsArray.length};

${varsAsArray.length > 0 && varsAsArray.map((v, i) => 'Constant ' + v.identifier + ' = ' + (i + 1) + ';').join('\n')}

[ getItemDescription index;
  switch (index) {
    ${varsAsArray.length > 0 && varsAsArray.map(v => v.identifier + ': return "' + v.desc + '";').join('\n    ')}
    default: return "";
  }
];

Include "moikinform";


! App entry point
! ------------------------------------------
[ Main;
  startGame(${convertId(firstSequence)});
];


! Story sequences
! ------------------------------------------
`
  for (let sequence of sequences) {
    const { statements, vars } = getNodeDescription(sequence, variables)
    moikiInformStory += `[ ${convertId(sequence.id)}${vars && vars.length > 0 ? ' ' + vars.join(' ') : ''};\n  ${statements}\n];\n\n`
  }

  return [
    { filename: 'moikinform.h', asBinary: true, data: moikiInformLibrary },
    { filename: 'story.inf', asBinary: true, data: moikiInformStory}
  ]
}