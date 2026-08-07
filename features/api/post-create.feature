Feature: API - POST Create Employee

  Scenario: Positive - Creates a new employee with valid payload
    When sending a POST request to create employee with valid payload
    Then the response should contain created employee details and an ID

  Scenario: Negative - Create employee with empty body
    When sending a POST request to create employee with empty payload
    Then the API response status should indicate request error or rate limit

  Scenario: Negative - Create employee with incomplete payload
    When sending a POST request to create employee with only name field
    Then the API response status should indicate request error or rate limit
