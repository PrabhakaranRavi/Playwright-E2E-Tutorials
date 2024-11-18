const { test, expect } = require("@playwright/test");
const exp = require("constants");

test("Entering wrong username and password", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title())

    const userName = page.locator(`#username`)
    const passWord = page.locator(`[type="password"]`)
    const signInBtn = page.locator(`#username`)
    const selectOption = page.locator(`select.form-control`)
    await selectOption.selectOption(`consult`);
    await page.locator(`.radiotextsty`).last().check()
    await page.locator(`#okayBtn`).click()

    console.log(await page.locator(`.radiotextsty`).last().isChecked())
    await expect(page.locator(`.radiotextsty`).last()).toBeChecked();

    await page.locator(`#terms`).click();
    await expect(page.locator(`#terms`)).toBeChecked();

    await page.locator(`#terms`).uncheck();
    expect(await page.locator(`#terms`).isChecked()).toBeFalsy();

    const pageLocator = page.locator(`[href*='documents-request']`);
    await expect(pageLocator).toHaveAttribute(`class`, `blinkingText`)

});