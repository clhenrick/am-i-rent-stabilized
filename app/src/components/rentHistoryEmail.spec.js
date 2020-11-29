import { RentHistoryEmail } from "./rentHistoryEmail";

describe("RentHistoryEmail", () => {
  let element;
  let rentHistoryEmail;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.getElementById("mail-to");
  });

  beforeEach(() => {
    rentHistoryEmail = new RentHistoryEmail({ element });
  });

  test("The component's HTML exists", () => {
    expect(element).not.toBeNull();
  });

  test("The consumer should be able to call new() on SearchResultMap", () => {
    expect(rentHistoryEmail).toBeTruthy();
  });

  test("setMailTo", () => {
    const result = rentHistoryEmail.element.getAttribute("href");
    const expected =
      "mailto:rentinfo%40nyshcr.org?subject=Request%20for%20rent%20history&body=DHCR%20administrator%2C%20%20%20%20I%2C%20YOUR%20NAME%20HERE%2C%20am%20currently%20renting%C2%A0%20YOUR%20ADDRESS%2C%20APARTMENT%20NUMBER%2C%20BOROUGH%2C%20ZIPCODE%C2%A0%20and%20would%20like%20to%20request%20the%20complete%20rent%20history%20for%20this%20apartment%C2%A0%20back%20to%20the%20year%201984.%20%20%20thank%20you%2C%20%20%20-%20YOUR%20NAME%20HERE";
    expect(result).toEqual(expected);
  });
});
