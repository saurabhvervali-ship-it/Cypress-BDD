Feature: Validate cart totals

  Scenario: Add two items and verify total
    Given I open the demo cart page
    When I add two items and read all item amounts from the UI
    Then the total amount displayed should match the calculated total
