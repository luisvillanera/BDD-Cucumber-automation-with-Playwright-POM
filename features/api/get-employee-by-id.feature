Feature: API - GET Employee By ID

  Scenario: Positive - Fetch employee by ID 1
    When sending a GET request for employee ID 1
    Then the response should indicate employee record was fetched
    And the employee details should match ID 1 and name "Tiger Nixon"

  Scenario: Positive - Fetch employee by ID 2
    When sending a GET request for employee ID 2
    Then the employee details should contain ID 2 and valid name string

  Scenario: Negative - Fetch employee by non-existing ID 99999
    When sending a GET request for employee ID 99999
    Then the response status should be handling non-existing employee ID
