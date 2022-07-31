const REGEXP_ONLYLETTERS = new RegExp(/\w+/g);

class Matcher {
  constructor(string = "", filterRegExp = REGEXP_ONLYLETTERS) {
    this.string = string;
    this.regexp = filterRegExp;
  }

  setString = (str) => (this.string = str);

  matchOnlyLetters = (str = this.string) => str.match(this.regexp);

  amountWordMatches = (doc) =>
    this.matchOnlyLetters().filter((word) =>
      this.countMatchesIsolate(doc, word)
    ).length;

  countMatches = (doc, index, array, word = this.matchOnlyLetters()) =>
    doc.text.match(this.regexp).filter((item) => word.includes(item)).length;

  countMatchesIsolate = (doc, word) => this.countMatches(doc, null, null, word);
}

module.exports = Matcher;
