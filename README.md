## book_store_api
Book Store API - project with Express JS framework.


## Environment Variables
Create `.env` file in the root of your project and add the following

```
MONGO_URI= your mongodb uri
PORT= 5000
NODE_ENV= development
JWT_SECRET_KEY= your jwt secret key
USER_EMAIL= your email service for sending email
USER_PASS= your email service password
```

## Install Dependencies
```
npm install
```

## Run
```
npm start
```

## Routes (Endpoints)
### Books
- Get All Books: `/api/books`
- Get Specific Books: `/api/books?minPrice=10&maxPrice=12`
- Get Book By Id: `/api/books:id`

- Create Book (POST): `/api/books`

- Update Book By Id (PUT): `/api/books:id`
  
- Delete Book By Id (DELETE): `/api/books:id`

### Authors
- Get All Authors: `/api/authors`
- Get Author By Id: `/api/authors:id`

- Create Author (POST): `/api/authors`

- Update Author By Id (PUT): `/api/authors:id`
  
- Delete Author By Id (DELETE): `/api/authors:id`

### Users
- Get All Users: `/api/users`
- Get User By Id: `/api/users:id`

- Update User By Id (PUT): `/api/users:id`

- Delete User By Id (DELETE): `/api/users:id`
  
### Authentication
- Register User (POST): `/api/auth/register`
- Login User (POST): `/api/auth/login`


## The project uses the following packages:

- `bcrypt`: A package that provides secure password hashing.

- `cors`: A package that provides Cross-Origin Resource Sharing (CORS) middleware for Express.
  
- `dotenv`: A package that loads environment variables from a `.env` file.

- `jsonwebtoken`: A package that provides JSON Web Token (JWT) authentication and authorization.
  
- `mongoose`: A package that provides a way to interact with MongoDB databases using Object-Document Mapping (ODM).
  
- `multer`: A package that provides middleware for handling `multipart/form-data`, which is primarily used for uploading files.

- `nodemailer` : A package that sent email to an email to reset Password.

- `ejs`: A package that provides a way to render HTML pages.
  
- `express-async-handler`: A package that provides a way to handle errors.
  
- `joi`: A package that provides a way to check the data before insert it in DB.
  
- `helmet`: A package that helps secure Express apps by setting HTTP response headers.
