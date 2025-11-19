Feature: Handling new tabs on Practice Page

  Scenario: Open new tab using removeAttr method
    Given I open the windows page
    When I click the link after removing target
    Then I should be on the QA Click Academy page
    Then I go back to the practice page

  Scenario: Open new tab using href method
    Given I open the windows page
    When I click the link using the href value
    Then I should land on the new tab page
