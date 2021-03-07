/**
This export will not use any extra library, just Inform (that means, there is no parser).

TODO: 
* add undo feature
*/

import kebabCase from 'lodash.kebabcase'
import { getHeader, getAuthor } from '../utils'
import * as informUtils from './inform6-utils'

export const convertToInform6 = (story, opts={}) => {
  const { _id, meta, firstSequence, sequences, assets, counters } = story
  const { convertId: idConverter, cleanContent: contentCleaner, SPECIAL_CHARS } = informUtils
  const settings = {...informUtils.informDefaultSettings, ...opts, lang: meta.lang === 'fr' ? 'fr' : 'en'}
  const STRINGS = {...(settings.lang === 'fr' ? informUtils.DEFAULT_STRINGS_FR : informUtils.DEFAULT_STRINGS_EN), ...(settings.strings || {})}

  const writeStyle = (style, tabs=1) => `#IfV5; style ${style}; #EndIf;\n${'  '.repeat(tabs)}`
  const bold = (tabs) => writeStyle('bold', tabs)
  //const reverse = (tabs) => writeStyle('reverse', tabs)
  const underline = (tabs) => writeStyle('underline', tabs)
  const roman = (tabs) => writeStyle('roman', tabs)

  /*
  @overriding cleanContent
  This part allows to manage special chars that need to be declared in Ztable
  */
  const specialChars = new Set([])
  const cleanContent = (str) => {
    const cleaned = contentCleaner(str)
    let cleanedAndConverted = settings.asciiOnly ? '' : cleaned
    let charCode
    for (let chr of cleaned) {
      charCode = chr.charCodeAt(0)
      if (charCode > 255 && !settings.asciiOnly) {
        specialChars.add(charCode.toString(16))
      } else if (settings.asciiOnly) {
        if (charCode > 127 && charCode < 255) {
          specialChars.add(charCode.toString(16))
          cleanedAndConverted += chr
        } else {
          cleanedAndConverted += charCode > 255 ? '?' : chr
        }
      }
    }
    return cleanedAndConverted
  }
  const writeSpecialCharsRoutine = () => {
    const specialCharsArray = Array.from(specialChars)
    const zCharTableKind = settings.asciiOnly ? 'Zcharacter table +' : 'Zcharacter table'
    if (specialCharsArray.length > 0) {
      return `\n${zCharTableKind} ${specialCharsArray.map(x => `'@{${x}}'`).join(' ')};\n`
    } else {
      return ''
    }
  }

  /*
  @overriding convertId
  This part allows to fix issue for names that exceeds the maximum length of 32 characters
  */
  const cuttedIds = {}
  const sliceIndexes = {}
  const convertId = (id, prefix) => {
    const convertedId = idConverter(id, prefix)
    if (convertedId.length >= 20) {
      if (!cuttedIds[convertedId]) {
        const slicedId = convertedId.slice(0, 18) + '_C'
        if (!sliceIndexes[slicedId]) {
          sliceIndexes[slicedId] = 1
        } else {
          sliceIndexes[slicedId] = (sliceIndexes[slicedId] + 1)
        }
        cuttedIds[convertedId] = slicedId + sliceIndexes[slicedId]
      }
      return cuttedIds[convertedId]
    }
    return convertedId
  }

  const objectVariables = {}
  for (const [idx, asset] of assets.entries()) {
    objectVariables[asset.id] = {
      identifier: '_' + convertId(kebabCase(asset.label), '') + '_' + (idx + 1),
      ...asset
    }
  }
  const objectVarsAsArray = Object.entries(objectVariables).map(([_, data]) => data)

  const counterVariables = {}
  for (const [idx, counter] of counters.entries()) {
    counterVariables[counter.id] = {
      identifier: '_' + convertId(kebabCase(counter.name), '') + '_' + (idx + 1),
      value: counter.defaultValue || 0,
      ...counter
    }
  }
  const counterVarsAsArray = Object.entries(counterVariables).map(([_, data]) => data)

  const extractPassageFromConditions = (conditions) => {
    const passages = []
    if (conditions && conditions.length > 0) {
      for (let c of conditions) {
        const {kind, query: {params}} = c
        if (kind === 'passage') {
          const [{target}] = params
          passages.push(target)
        } else if (kind === 'multiple') {
          for (let p of params) {
            const {kind, target} = p
            if (kind === 'passage') {
              passages.push(target)
            }
          }
        }
      }
    }
    return passages
  }

  const sequenceUsedInConditions = []
  for (let sequence of sequences) {
    if (sequence.choices && sequence.choices.length > 0) {
      for (let ch of sequence.choices) {
        sequenceUsedInConditions.push(...extractPassageFromConditions(ch.conditions))
        if (ch.showCondition && ch.showCondition.kind) {
          sequenceUsedInConditions.push(...extractPassageFromConditions([ch.showCondition]))
        }
      }
    } else {
      sequenceUsedInConditions.push(...extractPassageFromConditions(sequence.conditions))
    }
  }
  const uniquePassages = Array.from(new Set(sequenceUsedInConditions))
  const passageVarsAsArray = uniquePassages.map(x => convertId(x))
  

  const convertObjectCondition = (condition, target) => {
    switch (condition) {
      case 'with': return `hasItem(${objectVariables[target].identifier})`
      case 'without': return `~~hasItem(${objectVariables[target].identifier})`
      default: console.warn('This type of object condition is unknown:', condition)
    }
    return null
  }

  const convertCounterCondition = (condition, target, value) => {
    if (isNaN(value) || typeof value !== 'number') {
      console.warn('The value of this counter condition is invalid:', value)
      return null
    }
    switch (condition) {
      case '=': return `${counterVariables[target].identifier} == ${value}`
      case '!=': return `${counterVariables[target].identifier} ~= ${value}`
      case '<': case '<=': case '>': case '>=': {
        return `${counterVariables[target].identifier} ${condition} ${value}`
      }
      default: console.warn('This type of counter condition is unknown:', condition)
    }
    return null
  }

  const convertPassageCondition = (condition, target) => {
    switch (condition) {
      case 'by': return `userPassages-->PSG_${convertId(target)} == 1`
      case 'not-by': return `userPassages-->PSG_${convertId(target)} == 0`
      default: console.warn('This type of passage condition is unknown:', condition)
    }
    return null
  }

  const convertMultipleCondition = (allConditions) => {
    const res = []
    for (let c of allConditions) {
      const {kind, condition, target, value} = c
      switch (kind) {
        case 'object': res.push(convertObjectCondition(condition, target)); break
        case 'counter': res.push(convertCounterCondition(condition, target, value)); break
        case 'passage': res.push(convertPassageCondition(condition, target)); break
        default: {
          console.warn('This type of multiple condition is unknown:', kind)
        }
      }
    }
    return res.filter(x => x !== null).map(x => `(${x})`)
  }

  const convertShowCondition = (showCondition) => {
    const {kind, query: {operator, params}} = showCondition
    const [{target, condition, value}] = params
    switch (kind) {
      case 'object': return convertObjectCondition(condition, target)
      case 'counter': return convertCounterCondition(condition, target, value)
      case 'passage': return convertPassageCondition(condition, target)
      case 'multiple': {
        const multiCond = convertMultipleCondition(params)
        const joiner = operator === 'and' ? ' && ' : ' || '
        return multiCond ? multiCond.join(joiner) : null
      }
      default: {
        console.warn('This kind of condition is unknown:', kind)
      }
    }
  }

  const convertConditions = (conditions) => {
    const listConditions = []
    for (let c of conditions) {
      const {kind, next, query: {operator, params}} = c
      const [{target, condition, value}] = params
      switch (kind) {
        case 'object': {
          const objCondition = convertObjectCondition(condition, target)
          objCondition && listConditions.push(`if (${objCondition}) return ${convertId(next)};`)
          break
        }
        case 'counter': {
          const counterCond = convertCounterCondition(condition, target, value)
          counterCond && listConditions.push(`if (${counterCond}) return ${convertId(next)};`)
          break
        }
        case 'passage': {
          const psgCond = convertPassageCondition(condition, target)
          psgCond && listConditions.push(`if (${psgCond}) return ${convertId(next)};`)
          break
        }
        case 'multiple': {
          const multiCond = convertMultipleCondition(params)
          const joiner = operator === 'and' ? ' && ' : ' || '
          multiCond && listConditions.push(`if (${multiCond.join(joiner)}) return ${convertId(next)};`)
          break
        }
        default: {
          console.warn('This kind of condition is unknown:', kind)
        }
      }
    }
    return listConditions
  }

  const convertActions = (actions) => {
    const listActions = []
    for (let act of actions) {
      const {kind, params: {target, modifier, value}} = act
      switch (kind) {
        // modifier = toggle, add, sub
        case 'object': listActions.push(`${modifier}Item(${objectVariables[target].identifier});`); break
        // modifier = set, add, sub
        case 'counter': listActions.push(`${modifier}Counter(${counterVariables[target].identifier}, ${value});`); break
        default: {
          console.warn('This kind of action is unknown:', kind)
        }
      }
    }
    return listActions
  }

  const getChoiceLinkValue = (choice) => {
    if (choice.actions && choice.actions.length > 0) {
      return [
        ...convertActions(choice.actions),
        `return ${convertId(choice.next)};`
      ]
    } else if (choice.conditions && choice.conditions.length > 0) {
      return [
        ...convertConditions(choice.conditions),
        `return ${convertId(choice.next)};`
      ]
    } else {
      return [ 
        `return ${convertId(choice.next)};`
      ]
    }
  }

  const getNodeDescription = (sequence) => {
    let statements = null
    const listVars = []
    const text = cleanContent(sequence.content)
    if (sequence.next && (!sequence.choices || sequence.choices.length === 0)) {
      // simple sequence
      if (sequence.actions && sequence.actions.length > 0) {
        statements = [
          `print "${text}^^";`,
          ...convertActions(sequence.actions),
          `return ${convertId(sequence.next)};`
        ]
      } else if (sequence.conditions && sequence.conditions.length > 0) {
        statements = [
          `print "${text}";`,
          !settings.disablePauseOnSimpleSequence && `wait();`,
          ...convertConditions(sequence.conditions),
          `return ${convertId(sequence.next)};`
        ]
      } else {
        statements = [
          `print "${text}";`,
          !settings.disablePauseOnSimpleSequence && `wait();`,
          `return ${convertId(sequence.next)};`
        ]
      }
    } else if (sequence.choices && sequence.choices.length > 0) {
      // choice sequence
      const choicesDescription = []
      const choicesLinks = []
      let mapLinks = []
      let choiceIndex = 0
      const hasShowConditions = sequence.choices.filter(c => c.showCondition && c.showCondition.kind).length > 0
      if (hasShowConditions) {
        listVars.push('choice', 'numVisibleChoices')
        for (let choice of sequence.choices) {
          const choiceContent = cleanContent(choice.content)
          const showCond = choice.showCondition && choice.showCondition.kind ? convertShowCondition(choice.showCondition) : false
          if (showCond) {
            choicesDescription.push(
              `if (${showCond}) {`,
              `  numVisibleChoices = numVisibleChoices + 1;`,
              `  userChoices-->${(choiceIndex + 1)} = numVisibleChoices;`,
              `  print "- (", numVisibleChoices, "). ${choiceContent}^";`,
              `}`
            )
          } else {
            choicesDescription.push(
              `numVisibleChoices = numVisibleChoices + 1;`,
              `userChoices-->${(choiceIndex + 1)} = numVisibleChoices;`,
              `print "- (", numVisibleChoices, "). ${choiceContent}^";`
            )
          } 
          choicesLinks.push(getChoiceLinkValue(choice))
          ++choiceIndex
        }
        mapLinks = choicesLinks.map((link, i) => `if (choice == userChoices-->${(i + 1)}) {\n    ${link.join('\n    ')}\n  }`)
        statements = [
          `numVisibleChoices = 0;`,
          `print "${text}^^";`,
          ...choicesDescription,
          `choice = getInputChoice(numVisibleChoices);`,
          ...mapLinks
        ]
      } else {
        listVars.push('choice')
        for (let choice of sequence.choices) {
          const choiceContent = cleanContent(choice.content)
          choicesDescription.push(`print "- ${(choiceIndex + 1)}. ${choiceContent}^";`)
          choicesLinks.push(getChoiceLinkValue(choice))
          ++choiceIndex
        }
        mapLinks = choicesLinks.map((link, i) => `if (choice == ${ i + 1 }) {\n    ${link.join('\n    ')}\n  }`)
        statements = [
          `print "${text}^^";`,
          ...choicesDescription,
          `choice = getInputChoice(${choicesLinks.length});`,
          ...mapLinks
        ]
      }
    } else {
      // final sequence
      statements = [
        `print "${text}^";`,
        !settings.disablePauseOnGameOver && `wait();`,
        `gameOver = ${ sequence.isHappyEnd ? '1' : '2'};`,
        `return nothing;`
      ]
    }
    const seqId = convertId(sequence.id)
    if (passageVarsAsArray.includes(seqId)) {
      statements = [`userPassages-->PSG_${seqId} = 1;`, ...statements]
    }
    
    return {
      statements: statements.filter(s => !!s).join('\n  '),
      vars: listVars
    }
  }

  const onAfterChoice = settings.preferSeparatorThanCls ? 'print (string) CLS_PATTERN, "^";' : 'cls();'

  const moikiInformLibrary = `! This file contains the necessary core for the Moiki export to Inform6
! kaelhem (c) 2021
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

#IfV3;
  Constant ARRAY_LEN_OFFSET = 2;
#IfNot;
  Constant ARRAY_LEN_OFFSET = 3;
#EndIf;

! Choices management (used for visibility conditions of choices)
! -------------------------------------------

Constant MAX_CHOICES = 6;
Array userChoices --> (ARRAY_LEN_OFFSET + MAX_CHOICES);

[ clearChoices i;
  for (i=1: i<=MAX_CHOICES: i++) {
    userChoices-->i = 0;
  }
  return;
];

${ objectVarsAsArray.length > 0 ? (
`! Items management
! -------------------------------------------

Array userItems --> (ARRAY_LEN_OFFSET + COUNT_TOTAL_ITEMS);

[ clearItems i;
  for (i=1: i<=COUNT_TOTAL_ITEMS: i++) {
    userItems-->i = 0;
  }
  return;
];

[ addItem index;
  if (userItems-->index == 0) {
    toggleItem(index);
  }
  return;
];

[ subItem index;
  if (userItems-->index == 1) {
    toggleItem(index);
  }
  return;
];

[ hasItem index;
  return userItems-->index == 1;
];

[ toggleItem index;
  ${ bold() }if (userItems-->index == 0) {
    userItems-->index = 1;
    ++status_field_1;
    print (string) STR_OBJECT_WON;
  } else {
    userItems-->index = 0;
    --status_field_1;
    print (string) STR_OBJECT_LOST;
  }
  print (string) getItemDescription(index);
  ${ roman() }${ !settings.disablePauseOnActions ? 'wait();\n  ' : '' }return;
];

[ countItems i count;
  count = 0;
  for (i=1: i<=COUNT_TOTAL_ITEMS: i++) {
    if (userItems-->i == 1) ++count;
  }
  return count;
];
`) : ''}

${ counterVarsAsArray.length > 0 ? (
`! Counters management
! -------------------------------------------

Array userCounters --> (ARRAY_LEN_OFFSET + COUNT_TOTAL_COUNTERS);

[ clearCounters i;
  for (i=1: i<=COUNT_TOTAL_COUNTERS: i++) {
    userCounters-->i = defaultCounterValue(i);
  }
  return;
];

[ setCounter index value;
  userCounters-->index = value;
  if (isCounterGauge(index)) {
    ${ bold() }print (string) getCounterName(index), (string) STR_COUNTER_SET, value;
    ${ roman() }${ !settings.disablePauseOnActions ? 'wait();\n  ' : '' }
  }
  return;
];

[ addCounter index value;
  userCounters-->index = userCounters-->index + value;
  if (isCounterGauge(index)) {
    ${ bold() }print (string) getCounterName(index), (string) STR_COUNTER_ADD, value, " ", (string) STR_AND, (string) STR_COUNTER_SET, userCounters-->index;
    ${ roman() }${ !settings.disablePauseOnActions ? 'wait();\n  ' : '' }
  }
  return;
];

[ subCounter index value;
  userCounters-->index = userCounters-->index - value;
  if (isCounterGauge(index)) {
    ${ bold() }print (string) getCounterName(index), (string) STR_COUNTER_SUB, value, " ", (string) STR_AND, (string) STR_COUNTER_SET, userCounters-->index;
    ${ roman() }${ !settings.disablePauseOnActions ? 'wait();\n  ' : '' }
  }
  return;
];
`) : ''}

${ passageVarsAsArray.length > 0 ? (
`! Passages management (for conditions only)
! -------------------------------------------

Array userPassages --> (ARRAY_LEN_OFFSET + COUNT_TOTAL_PASSAGES);

[ clearPassages i;
  for (i=1: i<=COUNT_TOTAL_PASSAGES: i++) {
    userPassages-->i = 0;
  }
  return;
];
`) : ''}

! Manage user inputs
! -------------------------------------------

! fix: in z-code v3, input buffers are not formatted the same way...
#IfV3;
  Constant arrayStartIndex 1;
  [ length arr len;
    len = 0;
    while (arr->(len+1) ~= 0) ++len;
    return len;
  ];
#Ifnot;
  Constant arrayStartIndex 2;
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
      if (key->(arrayStartIndex+i) ~= toLowerCase(aCmd->(2+i))) rfalse;
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
      chNum = key->arrayStartIndex - 48;
      if (chNum > 0 && chNum <= numChoices) {
        ${ !settings.disableClearScreenOnChoice ? '' + onAfterChoice + '\n        ' : '' }done = true;
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
    } else if (isCommand(STR_CMD_SHOW)) {
      markForShow = 1;
      return 0;${ objectVarsAsArray.length > 0 ? '\n    } else if (isCommand(STR_CMD_LIST)) {\n      inventory();\n    ' : '' }
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
      print (string) STR_PLEASE_ANSWER, (string) STR_CMD_YES, " ", (string) STR_OR, " ", (string) STR_CMD_NO,".^";
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
  print "  - ", (string) STR_CMD_SHOW, (string) STR_COLON, " ", (string) STR_RESHOW_TEXT, "^";
  print "  - ", (string) STR_CMD_EXIT, (string) STR_COLON, " ", (string) STR_QUIT, "^";
  ${ objectVarsAsArray.length > 0 ? 'print "  - ", (string) STR_CMD_LIST, (string) STR_COLON, " ", (string) STR_LIST_OBJECTS, "^";\n  ' : '' }rtrue;
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
${ objectVarsAsArray.length > 0 ? (`
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
`) : '' }

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

[ startGame firstSequence replay;
  startScreen();
  wait();
  do {
    cls();
    replay = false;
    location = DefaultRoomForStatusBar; ! reset location (avoid compiler warning)
    status_field_1 = 0; ! reset score
    status_field_2 = 0; ! reset turns
    ${ objectVarsAsArray.length > 0 ? `clearItems();` : '' }
    ${ counterVarsAsArray.length > 0 ? `clearCounters();` : '' }
    ${ passageVarsAsArray.length > 0 ? `clearPassages();` : '' }
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
  const encoding = settings.encoding === 'utf8' ? '!% -Cu\n' : ''
  let moikiInformStory = `${encoding}!% -~S
!% $OMIT_UNUSED_ROUTINES=1
%%SPECIAL_CHARS%%
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
${Object.entries(STRINGS).filter(([key, value]) => {
  return !(informUtils.stringsForItems.find(s => s === key) && objectVarsAsArray.length === 0)
}).map(([key, value]) => `Constant STR_${key} = "${value}";`).join('\n')}
! Config
Constant CLS_PATTERN = "${settings.clsPattern.slice(0, 40).repeat(40).slice(0, 40)}";

${ objectVarsAsArray.length > 0 ? (`
! Defines objects / heroes
!-------------------------------------------
Constant COUNT_TOTAL_ITEMS = ${objectVarsAsArray.length};

${true && objectVarsAsArray.map((v, i) => 'Constant ' + v.identifier + ' = ' + (i + 1) + ';').join('\n')}

[ getItemDescription index;
  switch (index) {
    ${true && objectVarsAsArray.map(v => v.identifier + ': return "' + cleanContent(v.label) + ' - ~' + cleanContent(v.desc) + '~";').join('\n    ')}
    default: return "";
  }
];

`) : ''}

${ counterVarsAsArray.length > 0 ? (`
! Defines counters
!-------------------------------------------
Constant COUNT_TOTAL_COUNTERS = ${counterVarsAsArray.length};

${true && counterVarsAsArray.map((v, i) => 'Constant ' + v.identifier + ' = ' + (i + 1) + ';').join('\n')}

[ getCounterName index;
  switch (index) {
    ${true && counterVarsAsArray.map(v => v.identifier + ': return "' + v.name + '";').join('\n    ')}
    default: return "Undefined counter";
  }
];

[ defaultCounterValue index;
  switch (index) {
    ${true && counterVarsAsArray.map(v => v.identifier + ': return ' + (v.defaultValue || 0) + ';').join('\n    ')}
    default: return 0;
  }
];

[ isCounterGauge index;
  switch (index) {
    ${true && counterVarsAsArray.filter(v => v.gauge).map(v => v.identifier + ': rtrue;').join('\n    ')}
    default: return false;
  }
];

`) : ''}

${ passageVarsAsArray.length > 0 ? (`
! Defines passages (used only for conditions)
!-------------------------------------------
Constant COUNT_TOTAL_PASSAGES = ${passageVarsAsArray.length};

${true && passageVarsAsArray.map((v, i) => 'Constant PSG_' + v + ' = ' + (i + 1) + ';').join('\n')}

`) : ''}

! Include MoikInform library
! ------------------------------------------
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
    const { statements, vars } = getNodeDescription(sequence)
    moikiInformStory += `[ ${convertId(sequence.id)}${vars && vars.length > 0 ? ' ' + vars.join(' ') : ''};\n  ${statements}\n];\n\n`
  }
  return [
    { filename: 'story.inf', data: moikiInformStory.replace('%%SPECIAL_CHARS%%', writeSpecialCharsRoutine()) },
    { filename: 'moikinform.h', data: moikiInformLibrary }
  ]
}