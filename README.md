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

### Users

### Authentication
