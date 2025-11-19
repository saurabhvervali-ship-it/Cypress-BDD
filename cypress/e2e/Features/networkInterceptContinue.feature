Feature: API Interception and URL Modification

  Scenario: Modify request URL and validate 403 response
    Given I open the Angular application
    When I intercept the request and modify the author name
    And I click on Get Books button
    Then I should get a 403 response
