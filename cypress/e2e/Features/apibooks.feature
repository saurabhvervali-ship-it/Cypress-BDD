Feature: Validate Products API using cy.request

  Scenario: Verify products API response
    Given I call the products API
    Then I should get a valid list of products
