Feature: File Upload

  Scenario Outline: Upload different file types
    Given I open the file upload page
    When I upload a "<fileType>" file
    Then I should see the file uploaded successfully

    Examples:
      | fileType |
      | jpg      |
      | pdf      |
