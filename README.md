# Decorative Webshop 

_A home decor webshop that offer beautiful and practical objects_

Examples of functionality of the Webshop is:

- Register new user/admin
- Login authentication/authorisation
- Reset password possibility
- Only admin roles can create, edit and delete products
- Offer a product page
- Pagination on the productpage
- Sort the products by price 
- User can place products in their wishlist
- User can place products to the shopping cart
- Payment service integration with Stripe
- Products, user/admin, wishlist and cartlist is reflected in MongoDB.

<img width="521" alt="Picture of Decorative Webshop Landingpage" src="https://user-images.githubusercontent.com/69104443/116054210-bc94f900-a67b-11eb-969d-0f6e38a8f007.png" />
<img width="521" alt="Picture of Decorative products" src="https://user-images.githubusercontent.com/69104443/116054247-c4549d80-a67b-11eb-82ba-43264dd12df9.png" />

---

## Demo
To see the Decorative Webshop live go to:

https://decorative-webshop.herokuapp.com/

---

## Installation
Use following command to install:

```
npm i

```
## Dependencies
- mongoose
- express
- ejs
- dotenv
- jsonwebtoken
- cookie-parser
- bcrypt
- nodemailer 
- nodemailer-sendgrid-transport
- @sendgrid/mail
- connect-flash
- multer
- node-sass
- stripe

## How to run
- Clone the repo and install all neccessary dependencies
- Run `npm start` and `npm run watch-css` in seperate terminals

## Usage .env
Create a .env file in the root directory of your project. Then add environment-specific variables on new lines in the form of `NAME=VALUE`. Replace {value} with your own data. For example:

```
DATABASE_URL= {value}
PORT= {value}
SECRET_JWT_KEY= {value}
USER= {value}
SENDGRID_API_KEY= {value}
STRIPE_SECRET_KEY= {value}

```
**This app use the database MongoDB, to be able to setup your own database, please go to MongoDB Atlas to create an account.**

## Naming conventions

### Variables

- Use let or const instead of var
- When naming variables use **camelCase**

* Eg ` let data = await Product.find({ _id: adminProducts });`

### Functions

- Function names should use _camelCase_

## Project structure

```
Project root
├── controller
├    └── business logic/js-files
├── middleware
├    └── authentication logic/js-files
├── models
├    └── database models/js-files
├── public/images/scss/style
├    └── images locally/scss-styling/css-styling
├── uploads
├    └── images externally
├── routes
├    └── routing-related logic/js-files
├── views
├    └── HTML/ejs-files
├── node_modules
│    └── modules
```
