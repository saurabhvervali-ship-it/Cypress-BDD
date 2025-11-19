Feature: Download and verify tour PDF

  Scenario: User downloads the Kashmir tour itinerary PDF
    Given I open the Kashmir tour page
    When I download the tour PDF
    Then the PDF should be downloaded
