import { AddToCalendar } from "./addToCalendar";

describe("AddToCalendar", () => {
  let element;
  let addToCalendar;
  const atcFactory = () => new AddToCalendar({ element });

  window.addeventatc = {
    refresh: jest.fn(),
  };

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.querySelector(".atc-container");
  });

  beforeEach(() => {
    addToCalendar = atcFactory();
  });

  afterAll(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("The component's HTML exists", () => {
    expect(element).toBeDefined();
    expect(element.querySelector("svg")).toBeDefined();
  });

  test("The consumer should be able to call new() on SearchResultMap", () => {
    expect(addToCalendar).toBeTruthy();
  });

  test("setStartEndText", () => {
    window.addeventatc.refresh.mockClear();
    const spy1 = jest.spyOn(AddToCalendar.prototype, "setStartDateTime");
    const spy2 = jest.spyOn(AddToCalendar.prototype, "setEndDateTime");
    atcFactory();
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(window.addeventatc.refresh).toHaveBeenCalledTimes(1);
  });

  test("setStartDateTime", () => {
    const now = new Date();
    const expected = new Date(now.setDate(now.getDate() + 7)).toLocaleString(
      "en-US",
      {
        year: "numeric",
        day: "2-digit",
        month: "2-digit",
      }
    );
    addToCalendar.start.innerText = "";
    addToCalendar.setStartDateTime();
    expect(addToCalendar.start.innerText).toEqual(expected);
  });

  test("setEndDateTime", () => {
    const now = new Date();
    const expected = new Date(now.setDate(now.getDate() + 8)).toLocaleString(
      "en-US",
      {
        year: "numeric",
        day: "2-digit",
        month: "2-digit",
      }
    );
    addToCalendar.end.innerText = "";
    addToCalendar.setEndDateTime();
    expect(addToCalendar.end.innerText).toEqual(expected);
  });

  test("daysFromNow", () => {
    const days = 3;
    const now = new Date();
    const expected = new Date(now.setDate(now.getDate() + days));
    expect(addToCalendar.daysFromNow(days)).toEqual(expected);
  });

  test("daysFromNow throws", () => {
    expect(() => addToCalendar.daysFromNow(NaN)).toThrow(
      "daysFromNow's argument should be an integer"
    );
  });

  test("formatDate", () => {
    const date = new Date(2020, 10, 3);
    const expected = "11/03/2020";
    expect(addToCalendar.formatDate(date)).toEqual(expected);
  });

  test("formatDate throws", () => {
    expect(() => addToCalendar.formatDate(+new Date())).toThrow(
      "formatDate's argument should be a Date object"
    );
  });
});
