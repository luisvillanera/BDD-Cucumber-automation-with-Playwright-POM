Feature: Demo Web Shop - User Registration

  Scenario: Positive - Register a new unique user
    Given the user is on the registration page
    When the user submits valid details for a new unique user
    Then registration should be completed successfully
    And the user should see the logout link in the header

  Scenario: Negative - Register with empty form shows validation errors
    Given the user is on the registration page
    When the user submits the registration form without filling required fields
    Then the user should remain on the registration page
    And field validation errors should be displayed

  Scenario: Negative - Register with mismatched passwords shows validation
    Given the user is on the registration page
    When the user fills the registration form with mismatched passwords
    And the user submits the registration form
    Then the user should remain on the registration page
    And a password mismatch validation error should be displayed
