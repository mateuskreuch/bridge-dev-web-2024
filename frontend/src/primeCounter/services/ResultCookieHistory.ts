import Cookies from "js-cookie";

//----------------------------------------------------------------------------//

class ResultCookieHistory {
  static MAX_ENTRIES = 50;
  static COOKIE_NAME = "resultHistory";

  static get(): [string, string][] {
    return JSON.parse(Cookies.get(ResultCookieHistory.COOKIE_NAME) ?? "[]");
  }

  static addAndSave(
    history: [string, string][],
    input: string,
    count: string
  ): [string, string][] {
    const sliced = history.slice(0, ResultCookieHistory.MAX_ENTRIES - 1);

    sliced.unshift([input, count]);

    Cookies.set(ResultCookieHistory.COOKIE_NAME, JSON.stringify(sliced)); 

    return sliced;
  }

  static clear() {
    Cookies.remove(ResultCookieHistory.COOKIE_NAME);
  }
}

//----------------------------------------------------------------------------//

export default ResultCookieHistory;
