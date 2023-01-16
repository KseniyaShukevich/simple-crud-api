## Install the application

  1. git clone https://github.com/KseniyaShukevich/simple-crud-api.git

  2. git checkout develop

  3. npm i

  4. create .env file with environment PORT (see file .env.example in the project root)



## Run the application in development mode

  1. npm run start:dev

     By default, it will run on `http://localhost:4000/users`.

     This command will build the application using `webpack` to the `dist/index.cjs` file and run it.



## Run the application in production mode

  1. npm run start:prod

     By default, it will run on `http://localhost:4000/users`.
     
     This command uses `nodemon` and `ts-node`.



## Test the application

  1. npm run test

     This command will run the application tests using `jest`.