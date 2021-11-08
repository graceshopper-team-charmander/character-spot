# Character Spot

![Character Spot Logo](/public/images/logo.png)

## Table of Contents

- [Introduction](#introduction)
- [Creators](#creators)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Next Steps](#next-steps)

# Introduction

Character Spot is your one stop shop for characters that will love you lots! In other words, a full stack e-commerce site where shoppers can browse and purchase their favorite characters.

All shoppers can view all our products, filter products, search, add to cart, checkout, and more. Registered users have the option to add products to a wish list, and admins have the power to edit inventory.

Visit the site: [Character Spot Site](https://character-spot.herokuapp.com)

Watch our in class presentation: [Character Spot Presentation](https://youtu.be/Si6PQvqs2yw)

# Creators

|                     Amaya Agha                      |                     Alexandra Marks                     |                      Nicole Pan                      |
| :-------------------------------------------------: | :-----------------------------------------------------: | :--------------------------------------------------: |
|      ![Amaya](/public/images/Amaya-circle.png)      |      ![Alexandra](/public/images/Alex-circle.png)       |     ![Nicole](/public/images/Nicole-circle.png)      |
|      [GitHub](https://github.com/AmayaWinter)       |          [GitHub](https://github.com/amarks93)          |        [GitHub](https://github.com/pannicole)        |
| [LinkedIn](https://www.linkedin.com/in/amaya-agha/) | [LinkedIn](https://www.linkedin.com/in/alexandravmarks) | [LinkedIn](https://www.linkedin.com/in/nicole-pan1/) |

# Tech Stack

- React
- Redux
- PostgreSQL
- Sequelize
- Express
- Node.js
- Heroku

# Features

**Account**

- Users can sign up for an account, login, and logout
- Registered users can view and edit their account profile
- Registered users can change their password
- Registered users can view all past orders, with prices reflecting price at checkout

**Products**

- Displays an all products
- Displays a single product view with more detailed information
- Displays featured products on home page
- Products can be filtered by category
- Products can be sorted by price and name
- Products can be searched for
- Users can add products to cart from home page, all products, and single product pages
- Users can post products to their Facebook account from single product view

**Cart and Checkout**

- Users can add items to their cart, register or log in, and view their persisted cart
- Users can review all items in cart
- Users can change quantity of items in cart
- Users can delete items in cart
- Users can checkout and pay for their products using Stripe
- Users will receive an email from Character Spot detailing their order

**Wishlist**

- Registered users can add items to their wishlist
- Registered users can add items from their wishlist to their cart

**Administration**

- Administrators can add, delete, and edit product inventory
- Administrators can edit registered user details, change their admin status, and delete registered users

**Home Page**

- Users can view a carousel showcasing products
- Users can add featured products to their cart
- Users can view the Character Spot creators, and click to learn more about them

# Getting Started Locally

Fork and clone this repo. Then, `npm install`

Create your database with `createdb team-charmander`

Sync and seed your database with `npm run seed`

Create a `.env` file.

Generate OAuth2 credentials for email order after checkout capability.

Add the following to your `.env` file:

```
JWT=insert-your-JWT
cookieSecret=insert-your-cookie-secret
clientSecret=insert-your-OAuth-client-secret
clientId=insert-your-OAuth-client-id
refreshToken=insert-your-OAuth-refresh-token
accessToken=insert-your-OAuth-access-token
```

Run the appliation with `npm run start:dev`.

# Next Steps

1. Adding promotional codes for discounts at checkout
2. Adding a section for personalized product recommendations based on previously purchased products
3. Allow for multi tenancy so that users can create their own "shops"
4. Implement greater responsive design for easier viewing on mobile devices
