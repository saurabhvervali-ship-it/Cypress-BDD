Feature: Signup verification

  Scenario: User signs up and verifies email
    Given I am on the signup page
    When I sign up with email "user@example.com" and password "Test@123"
    Then I should receive a verification email at "user@example.com"
