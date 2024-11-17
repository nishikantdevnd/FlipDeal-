const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

// Endpoint 1: Calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);
  const total = newItemPrice + cartTotal;
  res.send(total.toString());
});

// Endpoint 2: Apply a discount based on membership status
app.get('/membership-discount', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember === 'true';
  const discountPercentage = 10; // 10% discount for members
  let finalPrice = cartTotal;

  if (isMember) {
    finalPrice -= (cartTotal * discountPercentage) / 100;
  }

  res.send(finalPrice.toString());
});

// Endpoint 3: Calculate tax on the cart total
app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const taxRate = 5; // Tax rate is 5%
  const tax = (cartTotal * taxRate) / 100;
  res.send(tax.toString());
});

// Endpoint 4: Estimate delivery time based on shipping method
app.get('/estimate-delivery', (req, res) => {
  const shippingMethod = req.query.shippingMethod.toLowerCase();
  const distance = parseFloat(req.query.distance);
  let deliveryDays = 0;

  if (shippingMethod === 'standard') {
    deliveryDays = Math.ceil(distance / 50);
  } else if (shippingMethod === 'express') {
    deliveryDays = Math.ceil(distance / 100);
  }

  res.send(deliveryDays.toString());
});

// Endpoint 5: Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);
  const shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

// Endpoint 6: Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);
  const loyaltyRate = 2; // 2 points per unit of currency spent
  const loyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoints.toString());
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
