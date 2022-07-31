class Indexer {
  constructor(docs, matcher) {
    this.docs = docs;
    this.matcher = matcher;
    this.reverseIndex = this.makeReverseIndex();
  }

  makeReverseIndex = (docs = this.docs) =>
    docs.reduce((acc, cur) => {
      const words = this.matcher.matchOnlyLetters(cur.text);
      return words.reduce((wordAcc, word) => {
        if (wordAcc[word]) {
          const array = wordAcc[word];
          wordAcc[word] = array.includes(cur.id) ? array : array.concat(cur.id);
        } else {
          wordAcc[word] = [cur.id];
        }
        return wordAcc;
      }, acc);
    }, {});

  getFreqWordInDoc = (word, reverseIndex = this.reverseIndex) =>
    reverseIndex[word] ? reverseIndex[word].length : 0;

  countTF = (word, doc) =>
    (
      this.matcher.countMatchesIsolate(doc, word) /
      this.matcher.matchOnlyLetters(doc.text ?? "")
    ).toFixed(5);

  countIDF = (word, docs) => {
    return docs
      ? this.getFreqWordInDoc(word, this.makeReverseIndex(docs))
      : this.getFreqWordInDoc(word);
  };

  countTfIdf = (word, doc, docs) =>
    this.countTF(word, doc) * this.countIDF(word, docs);
}

module.exports = Indexer;
