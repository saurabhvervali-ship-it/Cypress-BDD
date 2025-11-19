Feature: Pagination testing on the dynamic table
    

  Scenario: Validate moving onto different pages
   Given I open the dynamic pagination table page
    When I capture first row text on page 1
    And I go to page 2
    And I capture first row text on page 2
    Then the first row text on page 1 should not equal the first row text on page 2
