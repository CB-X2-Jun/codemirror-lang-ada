import assert from "assert"
import { adaLanguage } from "../dist/index.js"
import { ensureSyntaxTree } from "@codemirror/language"
import { EditorState } from "@codemirror/state"

function tokenNames(state) {
  const tree = ensureSyntaxTree(state, state.doc.length, 1000)
  const names = []
  tree.iterate({
    enter: (node) => {
      names.push(node.name)
    }
  })
  return names
}

function tokensFor(doc) {
  const state = EditorState.create({
    doc,
    extensions: [adaLanguage]
  })
  return tokenNames(state)
}

describe("codemirror-lang-ada", () => {
  it("tokenizes keywords case-insensitively", () => {
    const names = tokensFor("IF X > 0 THEN NULL; END IF;")
    const keywords = names.filter(n => n === "Keyword")
    assert(keywords.length >= 3, `expected at least 3 keywords, got ${keywords.length}`)
  })

  it("tokenizes identifiers", () => {
    const names = tokensFor("procedure Hello is begin null; end Hello;")
    assert(names.includes("Identifier"))
  })

  it("tokenizes numbers", () => {
    const names = tokensFor("X := 1_000 + 3.14;")
    assert(names.includes("Number"))
  })

  it("tokenizes strings", () => {
    const names = tokensFor('S := "Hello, Ada!";')
    assert(names.includes("String"))
  })

  it("tokenizes characters", () => {
    const names = tokensFor("C := 'A';")
    assert(names.includes("Char"))
  })

  it("tokenizes attributes", () => {
    const names = tokensFor("X := Integer'First;")
    assert(names.includes("Attribute"))
  })

  it("tokenizes line comments", () => {
    const names = tokensFor("-- this is a comment\nX := 1;")
    assert(names.includes("LineComment"))
  })

  it("tokenizes operators", () => {
    const names = tokensFor("A := B + C * D;")
    assert(names.includes("Operator"))
  })
})
