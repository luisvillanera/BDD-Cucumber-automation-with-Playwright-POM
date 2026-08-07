Feature: Demo Web Shop - Locators Best Practices

  Scenario: Role-based locators for navigation elements
    Given the user is on the home page for locator tests
    Then the Register link should be accessible by role
    And the Log in link should be accessible by role
    And the Welcome heading should be accessible by role

  Scenario: ID locators for stable form fields on login page
    Given the user is on the login page for locator tests
    Then Email input locator by id should be editable
    And Password input locator by id should be editable
    And Log in button locator by role should be enabled

  Scenario: Filter and hasText to scope product cards in catalog
    Given the user is on the Books catalog page
    Then the product card for "Computing and Internet" should be visible with a valid link

  Scenario: CSS vs role locators for cart quantity badge
    Given the user is on the home page for locator tests
    Then the cart quantity badge by CSS should contain "(0)"
    And the cart link by role should contain "Shopping cart"

  Scenario: Locator chaining for featured products inside grid
    Given the user is on the home page for locator tests
    Then the chained laptop product card should be visible and display a price
