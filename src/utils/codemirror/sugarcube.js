const CodeMirror = require('codemirror');

const keywords = {
    'set': true,
    'unset': true,
    'remember': true,
    'forget': true,
    'run': true,
    'script': true,
    'display': true,
    'nobr': true,
    'print': true,
    'silently': true,
    'if': true,
    'for': true,
    'switch': true,
    'button': true,
    'checkbox': true,
    'link': true,
    'linkappend': true,
    'linkprepend': true,
    'linkreplace': true,
    'radiobutton': true,
    'textarea': true,
    'textbox': true,
    'actions': true,
    'back': true,
    'return': true,
    'choice': true,
    'addclass': true,
    'append': true,
    'copy': true,
    'prepend': true,
    'remove': true,
    'removeclass': true,
    'replace': true,
    'toggleclass': true,
    'audio': true,
    'cacheaudio': true,
    'createplaylist': true,
    'playlist': true,
    'masteraudio': true,
    'removeplaylist': true,
    'waitforaudio': true,
    'goto': true,
    'repeat': true,
    'timed': true,
    'widget': true,
};

const isSpaceName = /[\w_\-]/i;
const reHR = /^\-\-\-\-+$/;
const reWikiCommentStart = /^\/\*\*\*$/;
const reWikiCommentStop = /^\*\*\*\/$/;
const reBlockQuote = /^<<<$/;
const reJsCodeStart = /^\/\/\{\{\{$/;
const reJsCodeStop = /^\/\/\}\}\}$/;
const reXmlCodeStart = /^<!--\{\{\{-->$/;
const reXmlCodeStop = /^<!--\}\}\}-->$/;
const reCodeBlockStart = /^\{\{\{$/;
const reCodeBlockStop = /^\}\}\}$/;
const reUntilCodeStop = /.*?\}\}\}/;

CodeMirror.defineMode('sugarcube', () => {
    // Tokenizer
    const textwords = {};

    function chain(stream, state, f) {
        state.tokenize = f;
        return f(stream, state);
    }

    function tokenBase(stream, state) {
        const isStartOfLine = stream.sol();
        const nextChar = stream.peek();

        // indicates the start of a code block.
        state.block = false;

        // check start of blocks
        if (isStartOfLine && /[<\/\*{}\-]/.test(nextChar)) {
            if (stream.match(reCodeBlockStart)) {
                state.block = true;
                return chain(stream, state, twTokenCode);
            }
            if (stream.match(reBlockQuote)) {
                return 'quote';
            }
            if (stream.match(reWikiCommentStart) || stream.match(reWikiCommentStop)) {
                return 'comment';
            }
            if (
                stream.match(reJsCodeStart) ||
                stream.match(reJsCodeStop) ||
                stream.match(reXmlCodeStart) ||
                stream.match(reXmlCodeStop)) {
                return 'comment';
            }
            if (stream.match(reHR)) {
                return 'hr';
            }
        }

        stream.next();
        if (isStartOfLine && /[\/\*!#;:>|]/.test(nextChar)) {
            if (nextChar === '!') { // tw header
                stream.skipToEnd();
                return 'header';
            }
            if (nextChar === '*') { // tw list
                stream.eatWhile('*');
                return 'comment';
            }
            if (nextChar === '#') { // tw numbered list
                stream.eatWhile('#');
                return 'comment';
            }
            if (nextChar === ';') { // definition list, term
                stream.eatWhile(';');
                return 'comment';
            }
            if (nextChar === ':') { // definition list, description
                stream.eatWhile(':');
                return 'comment';
            }
            if (nextChar === '>') { // single line quote
                stream.eatWhile('>');
                return 'quote';
            }
            if (nextChar === '|') {
                return 'header';
            }
        }

        if (nextChar === '{' && stream.match(/\{\{/)) {
            return chain(stream, state, twTokenCode);
        }

        // rudimentary html:// file:// link matching. TW knows much more ...
        if (/[hf]/i.test(nextChar) &&
            /[ti]/i.test(stream.peek()) &&
            stream.match(/\b(ttps?|tp|ile):\/\/[\-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/i)) {
            return 'link';
        }

        // just a little string indicator, don't want to have the whole string covered
        if (nextChar === '"') {
            return 'string';
        }

        if (nextChar === '~') {   // _no_ CamelCase indicator should be bold
            return 'brace';
        }

        if (/[\[\]]/.test(nextChar) && stream.match(nextChar)) {// check for [[..]]
            return 'link';
        }

        if (nextChar === '/') { // tw invisible comment
            if (stream.eat('%')) {
                return chain(stream, state, twTokenComment);
            } else if (stream.eat('/')) { //
                return chain(stream, state, twTokenEm);
            }
        }

        if (nextChar === '_' && stream.eat('_')) {// tw underline
            return chain(stream, state, twTokenUnderline);
        }

        // strikethrough and mdash handling
        if (nextChar === '-' && stream.eat('-')) {
            // if strikethrough looks ugly, change CSS.
            if (stream.peek() !== ' ') {
                return chain(stream, state, twTokenStrike);
            }

            // mdash
            if (stream.peek() === ' ') {
                return 'brace';
            }
        }

        if (nextChar === '\'' && stream.eat('\'')) { // tw bold
            return chain(stream, state, twTokenStrong);
        }

        if (nextChar === '<' && stream.eat('<')) {// tw macro
            return chain(stream, state, twTokenMacro);
        }

        // core macro handling
        stream.eatWhile(/[\w\$_]/);
        return textwords.propertyIsEnumerable(stream.current()) ? 'keyword' : null;
    }

    // tw invisible comment
    function twTokenComment(stream, state) {
        let maybeEnd = false;
        let ch;

        while (ch = stream.next()) { // eslint-disable-line no-cond-assign
            if (ch === '/' && maybeEnd) {
                state.tokenize = tokenBase;
                break;
            }
            maybeEnd = (ch === '%');
        }
        return 'comment';
    }

    // tw strong / bold
    function twTokenStrong(stream, state) {
        let maybeEnd = false;
        let ch;

        while (ch = stream.next()) { // eslint-disable-line no-cond-assign
            if (ch === '\'' && maybeEnd) {
                state.tokenize = tokenBase;
                break;
            }
            maybeEnd = (ch === '\'');
        }
        return 'strong';
    }

    // tw code
    function twTokenCode(stream, state) {
        const sb = state.block;

        if (sb && stream.current()) {
            return 'comment';
        }

        if (!sb && stream.match(reUntilCodeStop)) {
            state.tokenize = tokenBase;
            return 'comment';
        }

        if (sb && stream.sol() && stream.match(reCodeBlockStop)) {
            state.tokenize = tokenBase;
            return 'comment';
        }

        stream.next();
        return 'comment';
    }

    // tw em / italic
    function twTokenEm(stream, state) {
        let maybeEnd = false;
        let ch;

        while (ch = stream.next()) { // eslint-disable-line no-cond-assign
            if (ch === '/' && maybeEnd) {
                state.tokenize = tokenBase;
                break;
            }
            maybeEnd = (ch === '/');
        }
        return 'em';
    }

    // tw underlined text
    function twTokenUnderline(stream, state) {
        let maybeEnd = false;
        let ch;

        while (ch = stream.next()) { // eslint-disable-line no-cond-assign
            if (ch === '_' && maybeEnd) {
                state.tokenize = tokenBase;
                break;
            }
            maybeEnd = (ch === '_');
        }
        return 'underlined';
    }

    // tw strike through text looks ugly
    // change CSS if needed
    function twTokenStrike(stream, state) {
        let maybeEnd = false;
        let ch;

        while (ch = stream.next()) { // eslint-disable-line no-cond-assign
            if (ch === '-' && maybeEnd) {
                state.tokenize = tokenBase;
                break;
            }
            maybeEnd = (ch === '-');
        }
        return 'strikethrough';
    }

    // macro
    function twTokenMacro(stream, state) {
        if (stream.current() === '<<') {
            return 'macro';
        }

        const ch = stream.next();
        if (!ch) {
            state.tokenize = tokenBase;
            return null;
        }
        if (ch === '>') {
            if (stream.peek() === '>') {
                stream.next();
                state.tokenize = tokenBase;
                return 'macro';
            }
        }

        stream.eatWhile(/[\w\$_]/);
        return keywords.propertyIsEnumerable(stream.current()) ? 'keyword' : null;
    }

    // Interface
    return {
        startState() {
            return {tokenize: tokenBase,};
        },

        token(stream, state) {
            if (stream.eatSpace()) {
                return null;
            }
            const style = state.tokenize(stream, state);
            return style;
        },
    };
});

CodeMirror.defineMIME("text/x-sugarcube", "sugarcube")