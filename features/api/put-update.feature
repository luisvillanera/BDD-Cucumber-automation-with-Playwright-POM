Feature: API - PUT Update Employee

  Scenario: Positive - Updates employee 21 details
    When sending a PUT request to update employee 21 with new data
    Then the response should match the updated payload values

  Scenario: Negative - Update employee with empty payload
    When sending a PUT request to update employee 21 with empty payload
    Then the update response status should indicate request error or rate limit
