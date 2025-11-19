Feature: Login Demo with Environment Variables

  Scenario: Successful login using ENV data
    Given I opened the practice login page
    When I entered valid credentials
    Then I should be logged in successfully!
