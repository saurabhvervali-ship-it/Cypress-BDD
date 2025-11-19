Feature: Network Interception and Modification

  Scenario: Intercept and modify a network request
    Given I open the Angular app
    When I intercept the book API response
    And I click on the Get Books button
    Then I should receive the mocked book response
