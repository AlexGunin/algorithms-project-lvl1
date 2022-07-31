const buildSearchEngine = require("../index.js");

const { test, expect } = require("@jest/globals");

test("fill docs", () => {
  const doc1 = {
    id: "doc1",
    text: "I can't shoot straight unless I've had a pint!",
  };
  const doc2 = {
    id: "doc2",
    text: "Don't shoot shoot shoot that thing at me.",
  };
  const doc3 = { id: "doc3", text: "I'm your shooter." };
  const docs = [doc1, doc2, doc3];
  const searchEngine = buildSearchEngine(docs);
  expect(searchEngine.search("shoot", true)).toEqual(["doc1", "doc2"]);
});

test("empty docs", () => {
  const searchEngine2 = buildSearchEngine([]);
  expect(searchEngine2.search("")).toHaveLength(0);
});

test("without punctuation", () => {
  const docs = [
    { id: "doc1", text: "I can't shoot straight unless I've had a pint!" },
  ];

  const searchEngine = buildSearchEngine(docs);
  expect(searchEngine.search("pint")).toEqual(["doc1"]);
});

test("with punctuation", () => {
  const docs = [
    { id: "doc1", text: "I can't shoot straight unless I've had a pint!" },
  ];

  const searchEngine = buildSearchEngine(docs);
  expect(searchEngine.search("pint!")).toEqual(["doc1"]);
});

test("with relevate sort", () => {
  const doc1 = {
    id: "doc1",
    text: "I can't shoot straight unless I've had a pint!",
  };
  const doc2 = {
    id: "doc2",
    text: "Don't shoot shoot shoot that thing at me.",
  };
  const doc3 = { id: "doc3", text: "I'm your shooter." };
  const docs = [doc1, doc2, doc3];

  const searchEngine = buildSearchEngine(docs);
  expect(searchEngine.search("shoot")).toEqual(["doc2", "doc1"]);
});

test("search for multiple words", () => {
  const doc1 = {
    id: "doc1",
    text: "I can't shoot straight unless I've had a pint!",
  };
  const doc2 = {
    id: "doc2",
    text: "Don't shoot shoot shoot that thing at me.",
  };
  const doc3 = { id: "doc3", text: "I'm your shooter." };
  const docs = [doc1, doc2, doc3];

  const searchEngine = buildSearchEngine(docs);
  expect(searchEngine.search("shoot at me")).toEqual(["doc2", "doc1"]);
});

test("count reverse index", () => {
  const doc1 = { id: "doc1", text: "some text" };
  const doc2 = { id: "doc2", text: "some text too" };
  const docs = [doc1, doc2];

  const index = {
    some: ["doc1", "doc2"],
    text: ["doc1", "doc2"],
    too: ["doc2"],
  };

  const searchEngine = buildSearchEngine(docs);
  expect(searchEngine.indexer.reverseIndex).toEqual(index);
});
