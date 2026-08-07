Feature: API - DELETE Employee

  Scenario: Positive - Deletes employee record 2
    When sending a DELETE request for employee ID 2
    Then the delete response should indicate success message

  Scenario: Negative - Delete employee with invalid ID string
    When sending a DELETE request for employee with invalid ID string "invalid-id"
    Then the delete response status should indicate request error or rate limit
