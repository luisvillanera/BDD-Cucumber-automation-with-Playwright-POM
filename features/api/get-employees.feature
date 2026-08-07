Feature: API - GET All Employees

  Scenario: Positive - Returns all employee records successfully
    When sending a GET request to fetching all employees
    Then the response should indicate all records have been fetched successfully
    And the response body should contain a non-empty array of employee objects

  Scenario: Positive - First employee record matches Tiger Nixon
    When sending a GET request to fetching all employees
    Then the first employee in the response should have ID 1 and name "Tiger Nixon"
