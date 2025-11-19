import PracticePage from "../../Pages/dropandcheckboxesPage";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const page = PracticePage;

Given("I open the practice page for checks", () => {
  page.visit();
});

When("I select Option2 in dropdown", () => {
  page.selectDropdown("Option2");
});

Then("Option2 should be selected in dropdown", () => {
  page.verifyDropdownSelected("Option2");
});

Given("I open the practice page for checkss", () => {
  page.visit();
});

When("I check Option1 checkbox", () => {
  page.checkOption1();
});

When("I check Option3 checkbox", () => {
  page.checkOption3();
});

Then("Option1 checkbox should be checked", () => {
  page.verifyOption1Checked();
});

Then("Option3 checkbox should be checked", () => {
  page.verifyOption3Checked();
});

When("I uncheck Option1 checkbox", () => {
  page.uncheckOption1();
});

Then("Option1 checkbox should be unchecked", () => {
  page.verifyOption1Unchecked();
});
