let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub");
  }, 20000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 20000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-mktg.btn-large-mktg.btn-muted-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  }, 20000);
});


describe("Github other page tests", () => {
  test("Checking title on Marketplace page", async () => {
    const firstLink = await page.goto("https://github.com/enterprise");
    const title1 = await page.title();
    expect(title1).toEqual("The AI Powered Developer Platform. · GitHub");
  }, 20000);

  test("Checking title on Explore page", async () => {
    const firstLink = await page.goto("https://github.com/features/copilot");
    const title1 = await page.title();
    expect(title1).toEqual("GitHub Copilot · Your AI pair programmer · GitHub");
  }, 20000);

  test("Checking title on Codespaces page", async () => {
    const firstLink = await page.goto("https://github.com/features/security");
    const title1 = await page.title();
    expect(title1).toEqual("Features · Security · GitHub");
  }, 20000);
});
