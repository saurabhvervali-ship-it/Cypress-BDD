const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const getCompareSnapshotsPlugin = require("cypress-image-diff-js/plugin");
const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");
const readXlsx = require("read-excel-file/node");
const reporter = require("cucumber-html-reporter");

// ⭐ ADD THIS
const nodemailer = require("nodemailer");

module.exports = defineConfig({
  e2e: {
    retries: {
      runMode: 2,
      openMode: 1,
    },

    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 10000,
    video: false,

    env: {
      stepDefinitions: [
        "cypress/e2e/**/StepDefinitions/*.js",
        "cypress/e2e/**/*.{js,ts}",
      ],
      cucumber: {
        stepDefinitions: [
          "cypress/e2e/**/StepDefinitions/*.js",
          "cypress/e2e/**/*.{js,ts}",
        ],
      },

      url: "https://practicetestautomation.com/practice-test-login/",
      username: "student",
      password: "Password123",
    },

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      config.specPattern = "cypress/e2e/**/*.feature";

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      getCompareSnapshotsPlugin(on, config);

      const jsonDir = "cypress/reports/json";
      const htmlDir = "cypress/reports/html";

      if (!fs.existsSync(jsonDir)) fs.mkdirSync(jsonDir, { recursive: true });
      if (!fs.existsSync(htmlDir)) fs.mkdirSync(htmlDir, { recursive: true });

      on("after:spec", (spec, results) => {
        try {
          if (results?.tests?.length > 0) {
            const featureName = path.basename(spec.relative, ".feature");
            const jsonFile = path.join(jsonDir, `${featureName}.json`);

            const featureResult = [
              {
                uri: spec.relative,
                id: featureName,
                keyword: "Feature",
                name: featureName,
                elements: results.tests.map((test) => ({
                  id: test.title.join("-").toLowerCase(),
                  keyword: "Scenario",
                  name: test.title.join(" "),
                  steps: test.attempts.map((attempt) => ({
                    keyword: "Step",
                    name: attempt.state || "unknown",
                    result: { status: attempt.state || "unknown" },
                  })),
                })),
              },
            ];

            fs.writeFileSync(jsonFile, JSON.stringify(featureResult, null, 2));
            console.log(`✅ Created JSON report: ${jsonFile}`);
          }
        } catch (err) {
          console.error(`⚠️ Failed to create JSON for ${spec.relative}:`, err.message);
        }
      });

      on("after:run", async () => {
        try {
          await reporter.generate({
            theme: "bootstrap",
            jsonDir,
            output: path.join(htmlDir, "cucumber-report.html"),
            reportSuiteAsScenarios: true,
            launchReport: true,
            storeScreenshots: true,
            metadata: {
              "App Version": "1.0.0",
              "Test Environment": "STAGING",
              Browser: "Chrome",
              Platform: "Windows 10",
            },
          });
          console.log("✅ HTML report successfully created!");
        } catch (err) {
          console.error("❌ Failed to generate HTML report:", err.message);
        }
      });

      // -------------------------------------------------------
             //MAILHOG SMTP TASK
      // -------------------------------------------------------
      on("task", {
        sendMail({ to, subject, text }) {
          return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport({
              host: "localhost",
              port: 1025,   // MailHog SMTP
              secure: false,
              tls: { rejectUnauthorized: false }
            });

            transporter.sendMail(
              {
                from: "no-reply@example.com",
                to,
                subject,
                text,
              },
              (err, info) => {
                if (err) reject(err);
                else resolve(info);
              }
            );
          });
        },

        // EXISTING TASKS (KEEP THESE!)
        async parsePdf(filePath) {
          const pdfLib = require("pdf-parse");
          const pdf = pdfLib.default || pdfLib;
          const buffer = fs.readFileSync(filePath);
          const data = await pdf(buffer);
          return data.text;
        },

        updateExcel({ filePath, oldVal, newVal }) {
          const workbook = new ExcelJS.Workbook();
          return workbook.xlsx.readFile(filePath).then(() => {
            const sheet = workbook.getWorksheet(1);

            sheet.eachRow((row) =>
              row.eachCell((cell) => {
                if (cell.value === oldVal) cell.value = newVal;
              })
            );

            return workbook.xlsx.writeFile(filePath).then(() => true);
          });
        },

        readXlsx({ file, sheet }) {
          return readXlsx(file, { sheet });
        },
      });

      return config;
    },
  },
});
