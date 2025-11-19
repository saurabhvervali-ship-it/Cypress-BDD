const report = require("multiple-cucumber-html-reporter");
const path = require("path");
const fs = require("fs");

// Ensure JSON directory exists
const jsonDir = path.join(__dirname, "cypress", "cucumber-json");
if (!fs.existsSync(jsonDir)) {
  console.error(" JSON directory not found. Run tests before generating report.");
  process.exit(1);
}

report.generate({
  jsonDir,
  reportPath: path.join(__dirname, "cypress", "reports", "html"),
  reportName: "E-commerce Test Report",
  pageTitle: "Cypress Cucumber BDD Report",
  displayDuration: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "latest",
    },
    device: "Local Test Machine",
    platform: {
      name: "Windows",
      version: "10",
    },
  },
  customData: {
    title: "Cypress Cucumber BDD Report",
    data: [
      { label: "Project", value: "E-commerce Automation" },
      { label: "Release", value: "1.0.0" },
      { label: "Execution Date", value: new Date().toLocaleString() },
    ],
  },
  automaticallyCreateMissingFolders: true,
  disableLog: false,
  displayReportTime: true,
});
