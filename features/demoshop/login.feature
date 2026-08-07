Feature: Demo Web Shop - Login

  Scenario: Positive - Register and login with valid credentials
    Given a new user navigates to the registration page
    When the user completes registration and logs out
    And the user logs in with the registered credentials
    Then the user should be logged in successfully as the registered email
    And the current URL should be the home page

  Scenario: Negative - Login with wrong credentials shows error
    Given the user is on the login page
    When the user attempts to log in with invalid credentials
    Then the user should stay on the login page
    And a login error message should be displayed

  Scenario: Negative - Empty credentials show validation error
    Given the user is on the login page
    When the user submits the login form with empty fields
    Then the user should stay on the login page
    And a login error message should be displayed
