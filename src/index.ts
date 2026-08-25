import { parser } from "./parser"
import {
  LRLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent,
  continuedIndent
} from "@codemirror/language"
import { styleTags, tags as t } from "@lezer/highlight"

export const adaLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        Keyword: t.keyword,
        Identifier: t.variableName,
        Number: t.number,
        String: t.string,
        Char: t.string,
        Attribute: t.propertyName,
        LineComment: t.lineComment,
        Operator: t.operator,
        Punctuation: t.punctuation,
        "(": t.paren,
        ")": t.paren,
        "[": t.squareBracket,
        "]": t.squareBracket
      }),
      indentNodeProp.add({
        Statement: continuedIndent({ except: /^(\s*(elsif|else|end|exception|when)\b)?\s*$/ }),
        Program: delimitedIndent({ closing: "end", align: false })
      }),
      foldNodeProp.add({
        Statement: foldInside,
        Program: foldInside
      })
    ]
  }),
  languageData: {
    commentTokens: { line: "--" },
    closeBrackets: { brackets: ["(", "[", "'", '"'] },
    indentOnInput: /(^|\s)(then|else|elsif|end|loop|begin|declare|exception|when)\b/i,
    wordChars: "_"
  }
})

export function ada() {
  return new LanguageSupport(adaLanguage)
}
