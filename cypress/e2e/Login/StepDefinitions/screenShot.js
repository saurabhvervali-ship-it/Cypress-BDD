import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ScreenshotPage from "../../Pages/screenShotPage";

Given("I open the practice forms", () => {
  ScreenshotPage.openPracticeForm();
});

When("I take a screenshot", () => {
  ScreenshotPage.captureScreenshot();
});

Then("I verify form visibility", () => {
  ScreenshotPage.verifyFormVisible();
});
