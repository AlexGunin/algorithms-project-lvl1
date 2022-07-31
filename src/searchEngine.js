const Comparator = require("./comparator.js");
const Matcher = require("./matcher.js");
const Indexer = require("./indexer");

class SearchEngine {
  constructor(docs, matcher, indexer, comparator = Comparator) {
    this.docs = docs;
    this.comparator = comparator;
    this.matcher = matcher ?? new Matcher();
    this.indexer = indexer ?? new Indexer(this.docs, this.matcher);
  }

  searchSort = (a, b) =>
    this.comparator.compareByCallbacks(a, b, [
      this.matcher.countMatches,
      this.matcher.amountWordMatches,
    ]);

  search = (string, wthRelevant = false) => {
    this.matcher.setString(string);

    if (wthRelevant)
      return this.docs.filter(this.matcher.countMatches).map((doc) => doc.id);

    return this.docs
      .filter(this.matcher.countMatches)
      .sort(this.searchSort)
      .map((doc) => doc.id);
  };
}

const buildSearchEngine = (docs) => {
  return new SearchEngine(docs);
};

module.exports = buildSearchEngine;
