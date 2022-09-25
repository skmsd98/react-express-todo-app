# react-express-todo-app

### About the project
This is a todo application built using react.js and express.js<br><br>
The frontend is built with react and uses localstorage for storing values so that users can access their data after logging out and logging in again. <br>
Material UI library is used for the UI<br> 
Express.js is only used for authentication<br>
JWT tokens are created, stored and deleted but not used for authorization because the data is all in localstorage

### Features
This app has the following features
<ul>
  <li>user authentication</li>
  <li>add, update, delete todos</li>
  <li>add groups</li>
  <li>add priorities and due dates to todos</li>
  <li>active and completed todos</li>
  <li>filtering todos bsaed on due date, priority and group</li>
</ul>

### How to run the project

The project has 2 folders: client and server <br>
client folder contains the frontend which is built with <b>create-react-app</b> <br>
server folder contains some backend code written in <b>express.js</b> <br>

install all the packages for client folder by moving to the folder and running <code>npm install</code> <br>
install all the packages for server folder by moving to the folder and running <code>npm install</code> <br>

<i>** you must run servers for frontend and backend separately to ensure app works</i><br>
in the client folder, run the command <code>npm start</code> to start the dev server <br>
in the server folder, run the command <code>npm run dev</code> to start the server <br>

and the app is running!
