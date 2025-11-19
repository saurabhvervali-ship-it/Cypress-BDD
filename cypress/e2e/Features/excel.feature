Feature: Fill form using Excel data

  Scenario: Fill the practice form with Excel data
    Given I open the practice form
    When I read data from Excel and fill the form
    Then I should see an success message
