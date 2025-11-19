Feature: Form Validation on Angular Practice Website

  Scenario: Submit the form with valid data
    Given I open the angular practice form page
    When I enter valid user details
    And I submit the form
    Then I should see a success message

  Scenario: Validate required fields
    Given I open the angular practice form page
    When I submit the form without entering data
    Then I should see validation errors
