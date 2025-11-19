Feature: Customer Table

  Background:
    Given I am on the customer table page

  Scenario: Row and column count
    When I check rows
    Then it should have 7 rows
    When I check columns
    Then it should have 10 columns

  Scenario: Read table
    When I read all table data

  Scenario: Total pages
    When I get total pages
    Then pages should be shown
