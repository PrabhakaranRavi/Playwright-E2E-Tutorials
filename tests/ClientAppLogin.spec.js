const { test, expect } = require("@playwright/test");

test("E2E Scenario_Order", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title())

    const email = `anshika@gmail.com`;
    await page.locator(`#userEmail`).fill(email);
    await page.locator(`#userPassword`).fill("Iamking@000");
    await page.locator(`[value='Login']`).click();

    await page.locator(`.card-body b`).first().waitFor();
    console.log(await page.locator(`.card-body b`).allTextContents())

    //Selecting IPHONE 13 PRO

    const products = page.locator(`.card-body`);
    const count = await products.count();

    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === "IPHONE 13 PRO") {
            await products.nth(i).locator(`text=" Add To Cart"`).click();
            break;
        }
    }

    await page.locator(`[routerlink*=cart]`).click();
    await page.locator(`div li`).first().waitFor();
    const res = await page.locator(`h3:has-text("IPHONE 13 PRO")`).isVisible();
    await expect(res).toBeTruthy();

    //Handling auto suggestive dropdown options with playwright

    await page.locator("text=Checkout").click();
    await page.locator(`[placeholder*="Country"]`).pressSequentially("Ind");
    const dropdown = page.locator(`.ta-results`);
    await dropdown.waitFor();

    const countryCount = await dropdown.locator(`button`).count();
    console.log(countryCount)
    for (let i = 0; i < countryCount; i++) {
        let countryVis = await dropdown.locator(`button`).nth(i).textContent();
        if (countryVis === " India") {
            await dropdown.locator(`button`).nth(i).click();
            break;
        }
    }

    //Complete E2E flow of Placing the order and grab the OrderID with Playwright
    await expect(page.locator(`.user__name label`)).toHaveText(email);
    await page.locator(`.action__submit`).click();
    await expect(page.locator(`.hero-primary`)).toHaveText(` Thankyou for the order. `);

    const orderID = await page.locator(`.em-spacer-1 label`).last().textContent();
    console.log(`orderID: ${orderID}`);

    //Dynamically find the order from OrderHistory page using Playwright Script logic

    await page.locator(`button[routerlink*="myorders"]`).click();
    await page.locator(`tbody`).waitFor();

    const orderDetailsCount = page.locator(`tbody tr`);
    for (let i = 0; i < await orderDetailsCount.count(); i++) {
        const orderDetailsID = await orderDetailsCount.nth(i).locator(`th`).textContent();

        if (orderID.includes(orderDetailsID)) {
            await orderDetailsCount.nth(i).locator(`button`).first().click();
            break;
        }
    }

    //textContent have default automatic wait
    const orderSummaryID = await page.locator(`.col-text`).first().textContent();
    console.log(`orderSummaryID: ${orderSummaryID}`)
    expect(orderID.includes(orderSummaryID)).toBeTruthy();
});