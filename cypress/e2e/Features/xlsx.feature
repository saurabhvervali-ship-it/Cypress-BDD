Feature: Modify XLSX file

  Scenario: Replace Apple with BIG APPLE
    Given I have the Excel file downloaded
    When I update the Excel value Apple to BIG APPLE
    Then the Excel file should be modified
