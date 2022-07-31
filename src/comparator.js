class Comparator {
  static directions = {
    desc: "DESCENDING",
    asc: "ASCENDING",
  };

  static compareByFields = (a, b, fields, dir = this.directions.desc) => {
    if (!fields.length) return 0;
    const mostValueField = fields[0];

    if (a[mostValueField] === b[mostValueField])
      return this.compareByFields(a, b, fields.slice(1), dir);

    const value = dir === this.directions.desc ? 1 : -1;

    return b[mostValueField] > a[mostValueField] ? value : -value;
  };

  static compareByCallbacks = (a, b, callbacks, dir = this.directions.desc) => {
    if (!callbacks.length) return 0;
    const firstCb = callbacks[0];

    if (firstCb(a) === firstCb(b))
      return this.compareByFields(a, b, callbacks.slice(1), dir);

    const value = dir === this.directions.desc ? 1 : -1;

    return firstCb(b) > firstCb(a) ? value : -value;
  };

  static sortByFields = (array, fields, dir = this.directions.desc) => {
    return [...array].sort((a, b) => this.compareByFields(a, b, fields, dir));
  };

  static sortWithCallbacks = (array, callbacks, dir = this.directions.desc) => {
    return [...array].sort((a, b) =>
      this.compareByCallbacks(a, b, callbacks, dir)
    );
  };
}

module.exports = Comparator;
