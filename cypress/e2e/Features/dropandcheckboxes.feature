Feature: Dropdown and Checkbox Testing

  Scenario: Single dropdown
  Given I open the practice page for checks
    When I select Option2 in dropdown
    Then Option2 should be selected in dropdown

  Scenario: Checkbox test
    Given I open the practice page for checkss
    When I check Option1 checkbox
    And I check Option3 checkbox
    Then Option1 checkbox should be checked
    And Option3 checkbox should be checked
    When I uncheck Option1 checkbox
    Then Option1 checkbox should be unchecked
