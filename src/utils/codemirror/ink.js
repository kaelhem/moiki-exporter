import CodeMirror from 'codemirror'
import 'codemirror/addon/mode/simple'

CodeMirror.defineSimpleMode("ink", {
  start: [
    // The regex matches the token, the token property contains the type
    {
      regex: /"(?:[^\\]|\\.)*?(?:"|$)/,
      token: "string"
    },
    {
      regex: /(INCLUDE)(.+)/,
      sol: true,
      token: ["keyword", "def"]
    },
    {
      regex: /(~.+)/,
      sol: false,
      token: ["attribute"]
    },
    {
      regex: /(->)(.*)/,
      sol: false,
      token: ["keyword", "property"]
    },
    {
      regex: /(<-)(.+)/,
      sol: false,
      token: ["keyword", "property"]
    },
    {
      regex: /(\*\s*)(\{.*\})(.*)/,

      token: ["keyword", "property", "keyword"]
    },
    {
      regex: /(\+\s*)(\{.*\})(.*)/,

      token: ["keyword", "property", "keyword"]
    },
    {
      regex: /(VAR)(.+)/,
      sol: true,
      token: ["keyword", "attribute"]
    },
    {
      regex: /(\{)([^:}]*)(\})/,
      token: ["keyword", "string", "keyword"]
    },
    {
      regex: /(\{)([^:]+)(:)([^|]*)(\|)(.*)(\})/,
      sol: false,
      token: ["keyword", "attribute", "keyword", null, "keyword", null, "keyword"]
    },
    {
      regex: /(\{)([^:]+)(:)([^|]*)(\})/,
      sol: false,
      token: ["keyword", "attribute", "keyword", null, "keyword"]
    },
    {
      regex: /(<>)/,
      sol: false,
      token: ["number"]
    },
    {
      regex: /(\[.*\])/,
      sol: false,
      token: ["number"]
    },
    {
      regex: /(===)(.+)/,
      sol: true,
      token: ["header", "property"]
    },
    {
      regex: /(=+)(.+)/,
      sol: true,
      token: ["header", "property"]
    },

    {
      regex: /(\*+)/,

      token: ["keyword"]
    },
    {
      regex: /(\++)/,

      token: ["keyword"]
    },
    {
      regex: /(-+\s*\(.*\))/,
      sol: false,
      token: ["property"]
    },
    {
      regex: /(-+)/,
      sol: false,
      token: ["property"]
    }
  ],
  // The multi-line comment state.
  comment: [
  {
    regex: /.*?\*\//,
    token: "comment",
    next: "start"
  },
  {
    regex: /.*/,
    token: "comment"
  }
  ],
  meta: {
    dontIndentStates: ["comment"],
    lineComment: "//"
  }
});

CodeMirror.defineMIME("text/x-ink", "ink")