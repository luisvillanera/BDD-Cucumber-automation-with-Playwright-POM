Feature: Demo Web Shop - Search

  Scenario: Positive - Search returns matching products
    Given the user is on the home page for search
    When the user searches for matching product term "laptop"
    Then the search results page should be displayed
    And product items should be listed on the search page
    And a product matching "laptop" should be visible

  Scenario: Negative - Search with non-matching term shows empty message
    Given the user is on the home page for search
    When the user searches for non-matching term "xyz999unmatched"
    Then the search results page should be displayed
    And no results message should be displayed

  Scenario: Search box accessibility and attributes
    Given the user is on the home page for search
    Then search input should be visible
    And search input should have type attribute "text"
    And search button should be enabled
