

# Introduction
![Screenshot 2023-07-15 125034](https://github.com/BEGDAR8ZOUHAIR/atlas-web-solutions/assets/93929557/bfb33d01-2f29-45e8-b740-85f6d949786e)
![Screenshot 2023-07-15 124943](https://github.com/BEGDAR8ZOUHAIR/atlas-web-solutions/assets/93929557/9aea2779-2443-429a-b943-1b608267e92e)
![Screenshot 2023-07-15 125108](https://github.com/BEGDAR8ZOUHAIR/atlas-web-solutions/assets/93929557/fa62b76a-7ed2-4197-98a4-f54fd61987bf)
![Screenshot 2023-07-15 125200](https://github.com/BEGDAR8ZOUHAIR/atlas-web-solutions/assets/93929557/3fbbade9-e76f-4bd4-b54c-6cf6a3ee1cf2)


```
backend
└── entities
    └── controllers
        ├── userController.js
    └── models
        ├── userModel.js 
    └── routes
         └── userRouter.js
```

Thanks to this structure, it is easier to maintain and evolve multiple entities (you will rarely have to switch from one folder to another to manage an entity).

The project comes with many built-in features, such as:

- Authentication with [JWT](https://www.npmjs.com/package/jsonwebtoken): providing both an access token and a refresh token (sent as a secure http cookie only and stored in the database).


### Commande line 
```sh
npm init
```

# Setup

## Usage

*By default, it uses `npm` to install dependencies.

- If you prefer another package manager you can pass it as an argument `yarn`

Then open the project folder and install the required dependencies:

```bash
npm init
```
```bash
npm install express
```

## Configuration

Setup your environment variables. In your root directory, you will find a `.env`:

```
 .env
```

Then:

```bash
npm  start
```

The database must be connected and your server must be running. You can start testing and querying the API.

```bash
npm run start
```

[Back to top](#table-of-contents)

# Directory Structure

```
backend/
├──controllers/                 # Contains mostly global and reusable logic (such as auth and crud)
├── db/                         # Database, routes and server configurations
├── middlewares/                # Express middlewares
├── routes                      # Contains entity templates (default and user type)
├── models/                     # Custom/global type definitions
└── index.ts                    # App entry point (initializes database connection and express server)
```

[Back to table of Contents](#table-of-contents)


# Features

## API Endpoints

List of available routes:

**Auth routes** (public):\
`POST /api/` - register\
`POST /api/login` - login\
`GET /api/me` - getMe\

**User routes** (private):\
`GET /api/users` - get all users\
`GET /api/users/:id` - get user by id\
`PATCH /api/users/:id` - update user\
`DELETE /api/users/:id` - delete user\

 ZOUHAIR BEGDAR









 
