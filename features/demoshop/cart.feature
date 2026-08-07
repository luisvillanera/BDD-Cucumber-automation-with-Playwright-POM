Feature: Demo Web Shop - Shopping Cart

  Scenario: Positive - Add product from details page and view in cart
    Given the user navigates to the laptop details page
    When the user adds the product to the cart
    And the user opens the shopping cart page
    Then the laptop should be visible in the cart
    And the cart should contain 1 item

  Scenario: Positive - Add book from catalog list
    Given the user opens the Books category page
    When the user adds the first simple product to the cart from the catalog
    Then a notification bar should confirm item added to cart
    And the user opens the shopping cart page
    Then the shopping cart should display at least 1 item

  Scenario: Negative - View empty shopping cart
    Given the user opens the shopping cart page
    Then the shopping cart should be empty

  Scenario: Positive - Remove product from cart
    Given the user navigates to the laptop details page
    And the user adds the product to the cart
    When the user opens the shopping cart page
    And the user removes the product from the cart
    Then the shopping cart should be empty
