Feature: End to End E-commerce Validation

    Scenario: E-commerce product Delivery
        Given I am on E-commerce Page
        When I login to the application
            | username           | password |
            | rahulshettyacademy | learning |
        Then I add items to cart and checkout
        Then Validate the total price limit
        Then Select the country submit and verify Thank you

# Scenario Outline: Scenario Outline name: E-commerce product Delivery
# Given I am on E-commerce Page
# When I login to the application portal
# | username           | password  |
# | rahulshettyacademy | learning  |
# Then I add items to cart and checkout
# Then Validate the total price limit
# Then Select the country submit and verify Thank you