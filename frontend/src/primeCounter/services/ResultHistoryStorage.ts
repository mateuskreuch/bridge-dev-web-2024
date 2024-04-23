class ResultHistoryStorage {
  static MAX_ENTRIES = 50;
  static COOKIE_NAME = "resultHistory";

  static get(): [string, string][] {
    return JSON.parse(
      localStorage.getItem(ResultHistoryStorage.COOKIE_NAME) ?? "[]"
    );
  }

  static addAndSave(
    history: [string, string][],
    input: string,
    count: string
  ): [string, string][] {
    const sliced = history.slice(0, ResultHistoryStorage.MAX_ENTRIES - 1);

    sliced.unshift([input, count]);

    localStorage.setItem(
      ResultHistoryStorage.COOKIE_NAME,
      JSON.stringify(sliced)
    );

    return sliced;
  }

  static clear() {
    localStorage.removeItem(ResultHistoryStorage.COOKIE_NAME);
  }
}

//----------------------------------------------------------------------------//

export default ResultHistoryStorage;
