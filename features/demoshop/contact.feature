Feature: Demo Web Shop - Contact Us

  Scenario: Positive - Submit contact enquiry successfully
    Given the user opens the contact us page
    When the user submits an enquiry with name, email and message
    Then a success message should confirm enquiry submission

  Scenario: Negative - Submitting empty contact form stays on page
    Given the user opens the contact us page
    When the user clicks the contact submit button without filling fields
    Then the user should remain on the contact us page
    And no success message should be shown
