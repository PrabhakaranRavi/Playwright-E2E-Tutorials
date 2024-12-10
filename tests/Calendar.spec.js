const { test, expect } = require("@playwright/test");

test("Validating Calender", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    const month = `6`;
    const date = `15`;
    const year = `2027`;

    await page.locator(`.react-date-picker__inputGroup__day`).click();
    await page.locator(`.react-calendar__navigation__label`).click();
    await page.locator(`.react-calendar__navigation__label`).click();

    await page.getByText(year).click();
    await page.locator(`react-calendar__year-view__months__month`).nth(Number(month) - 1).click();
    await page.locator(`//abbr[text()="${date}"]`).click();

    
})