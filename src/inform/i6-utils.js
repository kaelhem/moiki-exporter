export const convertId = (id, prefix= 'story') => {
  const pre =prefix ? prefix + '_' : ''
  return pre + id.replace(/-/gi, '_')
}

export const cleanContent = (content) => {
  return content
    .replace(/(<\/*(strong|b)>)/gi, '')
    .replace(/(<\/*(em)>)/gi, '')
    .replace(/(<\/*(h\d)>)/gi, '')
    .replace(/<span class="ql-cursor">/gi, '')
    .replace(/<\/p>/gi, '</p> ')
    .replace(/<\/*p>/gi, '')
    .replace(/(<\/*(span)>)/gi, '')
    .replace(/(\s)+/gi, ' ')
    .replace(/\@/gim, '@@64')
    .replace(/\^/gim, '@@94')
    .replace(/\\/gim, '@@92')
    .replace(/\~/gim, '@@126')
    .replace(/°/gim, ' ') // FIXME! the @@225 code seems to not work (even with the "Zcharacter table + '@{00B0}';" directive)
    .replace(/\s*<br\s*\/*>(\s|&nbsp;)*/gi, '^')
    .replace(/(\s)*&nbsp;(\s)*/gi, ' ') // maybe: [unicode 160] ?
    .replace(/(\"|“|”)/gim, '~')
    .replace(/’/gim, '\'')
    .trim()
}

export const informDefaultConfig = {
  CLS_PATTERN: '--', // used in v3 as separator (because the lack of clear screen function)
}

export const DEFAULT_STRINGS_FR = {
  HEADER: 'Cette histoire a été exportée avec Moiki Exporter.^La version originelle est accessible ici :',
  MOIKI_PRESENTS: 'Moiki présente :',
  A_STORY_BY: 'Une histoire de',
  COLON: ' :',
  CMD_HELP: 'AIDE',
  CMD_UNDO: 'RETOUR',
  CMD_REDO: 'REFAIRE',
  CMD_LIST: 'LISTE',
  CMD_SHOW: 'REVOIR',
  CMD_EXIT: 'QUITTER',
  CMD_YES: 'oui',
  CMD_YES_SHORT: 'o',
  CMD_NO: 'non',
  CMD_NO_SHORT: 'n',
  NOCHOICE_MATCH: 'Cette saisie ne correspond à aucun choix !',
  LIST_OF_COMMANDS: 'Liste des commandes',
  BACK_TO_PREVIOUS: 'Retourner au choix précédent',
  RESTART_GAME: 'Recommencer depuis le début',
  LIST_OBJECTS: 'Lister les objets récupérés',
  RESHOW_TEXT: 'Afficher le texte de la dernière séquence',
  QUIT: 'Quitter',
  BYE_BYE: 'Bye-bye !',
  CONFIRM_RESTART: 'Recommencer depuis le début ?',
  INVENTORY_LIST: `Liste des objets de l'inventaire :`,
  INVENTORY_EMPTY: 'Votre inventaire est vide !',
  OBJECT_WON: 'Objet récupéré : ',
  OBJECT_LOST: 'Objet perdu : ',
  WIN_GAME: 'Gagné !',
  LOSE_GAME: 'Perdu !',
  COMMAND_UNKNOWN_LEFT: 'Cette commande est inconnue ! Tapez ~',
  COMMAND_UNKNOWN_RIGHT: '~ pour une liste des commandes disponibles.',
  DEFAULT_CONFIRM_MSG: `Etes-vous sûr de vouloir faire cette action ?`,
  OR: ' ou ',
  PLEASE_ANSWER: `Veuillez répondre par `,
  ANOTHER_GAME: `Lancer une autre partie ?`
}

export const DEFAULT_STRINGS_EN = {
  HEADER: 'This story was exported with Moiki Exporter.^The original version is avalaible here:',
  MOIKI_PRESENTS: 'Moiki presents :',
  A_STORY_BY: 'A story by',
  COLON: ':',
  CMD_HELP: 'HELP',
  CMD_UNDO: 'UNDO',
  CMD_REDO: 'REDO',
  CMD_LIST: 'LIST',
  CMD_SHOW: 'SHOW',
  CMD_EXIT: 'EXIT',
  CMD_YES: 'yes',
  CMD_YES_SHORT: 'y',
  CMD_NO: 'no',
  CMD_NO_SHORT: 'n',
  NOCHOICE_MATCH: 'This entry does not correspond to any choice!',
  LIST_OF_COMMANDS: 'List of commands',
  BACK_TO_PREVIOUS: 'Back to previous choice',
  RESTART_GAME: 'Restart the game',
  LIST_OBJECTS: 'List of items won',
  RESHOW_TEXT: 'Show the text of the last sequence',
  QUIT: 'Quit the game',
  BYE_BYE: 'Bye bye!',
  CONFIRM_RESTART: 'Restart from the beginning?',
  INVENTORY_LIST: `List of items in inventory:`,
  INVENTORY_EMPTY: 'Inventory is empty!',
  OBJECT_WON: 'Item won : ',
  OBJECT_LOST: 'Item lost : ',
  WIN_GAME: 'Won !',
  LOSE_GAME: 'Lost !',
  COMMAND_UNKNOWN_LEFT: 'This command is unknown! Type ~',
  COMMAND_UNKNOWN_RIGHT: '~ for a list of available commands.',
  DEFAULT_CONFIRM_MSG: `Are you sure you want to take this action?`,
  OR: ' or ',
  PLEASE_ANSWER: `Please answer `,
  ANOTHER_GAME: `Start another game?`
}