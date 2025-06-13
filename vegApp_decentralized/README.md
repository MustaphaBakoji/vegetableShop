# vegapp

A minimalist applicaton for easing the tasks of vegetable businesses.

# API Documentation

## Overview

This document provides an overview of the API endpoints available in the VegetableShop application. The API is organized into several routes, each handling different aspects of the application such as user management, admin operations, and order processing.

## API DOCS

## Routes

### User Management

- **POST /home/register**: Register a new user.
- **POST /home/login**: User login.
- **GET /user/dashboard**: Get user profile.
- **PUT /user/update**: Update user profile.
- **DELETE /user/delete**: Delete user account.
- **GET /user/logout**: User logout.

### Product Management

- **GET /products**: Get all products.
- **GET /products/:id**: Get product by ID.
- **POST /products?q=vegname**: Search products by name.
- **GET /test**: Test endpoint.


### Order Management

- **GET /orders**: Get all orders.
- **GET /orders/:id**: Get order by ID.
- **POST /orders/create**: Create new order.
- **PUT /orders/:id/pay**: Process order payment.
- **PUT /orders/:id/deliver**: Update order deliver status.
- **GET /orders/:id/cancel**: Cancel order.

### Cart Management

- **GET /cart**: Get cart contents.
- **POST /cart/:productId/add**: Add product to cart.
- **PUT /cart/update**: Update cart items.
- **DELETE /cart/:productId/remove**: Remove product from cart.

### Admin Operations

- **GET /dashboard**: Access admin dashboard.
- **GET /logout**: Admin logout.

### Admin Order Management

- **GET /orders**: Get all orders.
- **GET /orders/:id**: Get order by ID.
- **PUT /orders/:id/update**: Update order status.
- **DELETE /orders/:id/delete**: Delete order.
- **PUT /orders/:id/delivered**: Update order deliver status.

### Admin Product Management

- **GET /products**: Get all products.
- **GET /products/:id**: Get product by ID.
- **POST /products/create**: Create new product.
- **PUT /products/:id/update**: Update product.
- **DELETE /products/:id/delete**: Delete product.

For detailed API documentation, please visit [Postman Documentation](https://documenter.getpostman.com/view/36992061/2sB2qXmieH)

## Conclusion

This document provides a comprehensive overview of the API endpoints available in the VegetableShop application. Each endpoint is described with its URL, method, description, request body, and response details.
