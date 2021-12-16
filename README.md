# Course Library Application with Backend

## Contents
[Introduction](https://github.com/coonsat/project-10-techdegree#introduction)

[Getting Started](https://github.com/coonsat/project-10-techdegree#getting-started)

[Starting the Application](https://github.com/coonsat/project-10-techdegree#starting-the-application)


## Introduction
The application encompasses a full stack application for the purpose of courses administrators being able to manager their own content. 

Users can interact with the website without having to log in and Administrators can view other courses. Editing of course content is enabled for course owners only. If an administrator attempts to change a course not belonging to him/her then they will see a forbidden page. This functionality is enabled only when a user has signed into the application. 

An administrator has the possibility of signing up via the sign up page and is directed to the home page upon successful sign up. 

This project is the final assignment of the javascript full-stack degree offered by Team Treehouse and is the culmination of all hithero content learned in the degree. 

## Getting Started
1. Clone (https://github.com/schmay33/techdegree-project-10.git) or download the zip file
2. Extract zip files if necessary
3. Navigate to the api folder via terminal and enter `npm install` to install all dependencies
4. Then populate the database by entering `npm run seed` into the terminal
5. Navigate to the client folder and enter `npm install` to insall all dependencies

## Starting the Application
To run the server you will need to enter the api folder and enter npm start into the command line.

To start the server go into api and, via the terminal, enter `npm start`. The server will begin listening to the port `5000`.

To start the client go into client and, via the terminal, enter `npm start`. A new browser should open automatically. If it doesn't enter [localhost:5000](localhost:5000) into your browser.
