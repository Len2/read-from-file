<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NestJS App README</title>
</head>

<body>

  <h1>NestJS App README</h1>

  <h2>Description</h2>

  <p>This repository serves as a TypeScript starter for building applications with the <a href="https://github.com/nestjs/nest">Nest</a> framework.</p>

  <h2>Getting Started</h2>

  <p>Before running the app, make sure to install dependencies:</p>

  <pre><code>npm install --legacy-peer-deps</code></pre>

  <p>To add a default user as an admin, run the following command to seed the database:</p>

  <pre><code>npm run seed</code></pre>

  <h2>Running the App</h2>

  <p>To run the app in different modes, use the following commands:</p>

  <pre><code>
  # Development mode
  npm run start

  # Watch mode
  npm run start:dev

  # Production mode
  npm run start:prod
  
  
  # user and password 
  user: gjendreqica@gmail.com
  password: Admin123! 

  </code></pre>


  <h2>Dockerization App</h2>

  <p>To run the app in docker use the following commands:</p>

  <pre><code>
  # cmd 1
  docker compose up --build

  # show ip address of posgres server 
  docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' b295d(continier_ID - put here)ffe703d
</code></pre>


  

  <h2>Author</h2>

  <p>This app was created by Lendrit.</p>

  <h2>License</h2>

  <p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>

</html>
