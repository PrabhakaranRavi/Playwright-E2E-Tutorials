const { test, expect } = require("@playwright/test");

test("Entering wrong username and password", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title())

    const userName = page.locator(`#username`)
    const passWord = page.locator(`[type="password"]`)
    const signInBtn = page.locator(`#username`)
    const selectOption = page.locator(`select.form-control`)
    await selectOption.selectOption(`consult`);
    await page.locator(`.radiotextsty`).nth(2).check()
    await page.locator(`#okayBtn`).click()

});