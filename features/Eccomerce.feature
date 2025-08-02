Feature: Buy a product from Rahul Shetty's e-commerce site

  # The first example has two steps
  Scenario: User adds a product to the cart
    Given the user logs in with his credentials username "Ichigoshadow@newmail.com" and password "Qwerty@1234"
    When the user adds product "ADIDAS ORIGINAL" to the cart
    Then the cart should contain the product "ADIDAS ORIGINAL"
    When the user checks out the product
    Then the user should see a confirmation message