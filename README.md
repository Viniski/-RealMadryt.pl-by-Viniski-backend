# RealMadryt.pl by Viniski

# BACK-END

Fullstack application inspired by realmadryt.pl. The application front was written using React.js. While the back end was written using Node.js, Express.js and the data was stored in the MongoDB database.

This repository contains the back end part of the my application. You can find the front end here: https://github.com/Viniski/RealMadryt.pl-by-Viniski-frontend

## :wrench: Descriptions and Technical

- The back end of the application was built, the API connecting to the front end was designed in accordance with the REST standard.
- The API allows you to save new articles in the database, download them, increment or decrement their number (which takes place in the application view after refreshing the entire application), add, delete, edit comments.
- Thanks to the use of nodemailer, it allows you to send welcome emails to new users registering through the portal.
- The API also allows registration, logging in, changing the password or logging out, all with validation also placed on the backend.
- Json Web Token is created, which are used for authentication using acessTokens (expiring after 15 minutes) and erfreshToken (expiring after 24 hours).
- Unfortunately, after logging in and refreshing the page, you will not be logged in, because the free site I use for deployment is on the public suffix list, which prevents cookies from working properly.
- To take advantage of this facility, run the site locally on your computer.
- JWT is stored in cookies on the front end with the httpOnly flag set so that you can read the JWT from the browser on the front end.
- Passport.js was used to log in via external portals (google, github).
- The login status is stored in the session, which expires after 15 minutes, after which you must log in again. Postman was used to test the API.
- The database used is mongoDB, initially I used it locally on my computer, now the database is located on a remote cloud MongoDB atlas.

<<<<<<< HEAD
## :computer: Built With
=======
The API allows you to save new articles in the database, download them, increment or decrement their number (which takes place in the application view after refreshing the entire application), add, delete, edit comments. Thanks to the use of nodemailer, it allows you to send welcome emails to new users registering through the portal. The API also allows registration, logging in, changing the password or logging out, all with validation also placed on the backend.

Json Web Token is created, which are used for authentication using acessTokens (expiring after 15 minutes) and erfreshToken (expiring after 24 hours). Unfortunately, after logging in and refreshing the page, you will not be logged in, because the free site I use for deployment is on the public suffix list, which prevents cookies from working properly. Also login via social media does not work for this reason. To take advantage of this facility, run the site locally on your computer. JWT is stored in cookies on the front end with the httpOnly flag set so that you can read the JWT from the browser on the front end. Passport.js was used to log in via external portals (google, github). The login status is stored in the session, which expires after 15 minutes, after which you must log in again. Postman was used to test the API.

The database used is mongoDB, initially I used it locally on my computer, now the database is located on a remote cloud MongoDB atlas.

## Built With
>>>>>>> 68e1ac81936efb5f27995eaf07cace4a893b54e5

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API
- Bcrypt
- Body-parser
- Cookie-parser
- Cookie-session
- Jsonwebtoken
- Passport
- Nodemailer
- Dotenv
- Randomstring

## Demo

You can find a demo of the application in the frontend repository.

#### If you want running on your computer:

The frontend and backend are separate projects -- first start the backend

```zsh
npm install
node index.js
```

Start the frontend (which is in another repository) in a new terminal

```zsh
npm install
npm run start
```

## License

This project is licensed under the MIT License.
