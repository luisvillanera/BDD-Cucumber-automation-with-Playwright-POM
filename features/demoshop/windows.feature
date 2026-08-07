Feature: Demo Web Shop - Windows and Tabs Handling

  Scenario: Opens Facebook social link in a new tab
    Given the user is on the home page for tab testing
    When the user clicks the Facebook link opening in a new tab
    Then a new tab should open pointing to Facebook
    And closing the tab returns to Demo Web Shop

  Scenario: Opens Twitter social link in a new tab
    Given the user is on the home page for tab testing
    When the user clicks the Twitter link opening in a new tab
    Then a new tab should open pointing to Twitter or X

  Scenario: Handles multiple pages and verifies original page state
    Given the user is on the home page for tab testing
    When the user clicks the YouTube link opening in a new tab
    Then a new tab should open pointing to YouTube
    And the original page should remain on Demo Web Shop with welcome heading

  Scenario: Popup event pattern for external social links
    Given the user is on the home page for tab testing
    When the user clicks the Facebook link listening for popup event
    Then the popup url should match Facebook domain
