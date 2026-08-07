Feature: Demo Web Shop - Home Page

  Scenario: Home page loads title and featured products
    Given the user opens the home page
    Then the page title should contain "Demo Web Shop"
    And featured products should be displayed

  Scenario: Navigate to Books category from top menu
    Given the user opens the home page
    When the user selects category "Books" from top menu
    Then the page title heading should be "Books"
    And product items should be visible in the catalog

  Scenario: Header exposes main navigation links
    Given the user opens the home page
    Then Register link should be visible in the header
    And Log in link should be visible in the header
    And Shopping cart link should be visible in the header
