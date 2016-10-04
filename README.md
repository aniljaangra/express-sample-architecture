Sample Express Architecture to be used as base for other Apps.

############################################## Directory Structure ############################################

├── config
│   └── env
├── controller
│   ├── helper
│   └── base-controller
├── dao
├── lib
│   └── middleware
├── model
├── route
├── service
├── test
├── util
└── views

########################## config

This Directory Contains all Config Related to App

####### env
Environment based configurations

########################## controller

Contains All API Endpoint Controllers

####### helper
Controller Helpers for common Tasks

####### base-controller
Contains Base Models which can be extended by Controllers according to their requirement

########################## dao

layer to interact with DB

########################## lib

Contains Clients for any 3rd party Modules included in app

####### middleware
Contains Middlewares for routes including login/auth

########################## model

Model Class Definitions for various Modules in app

########################## route

Contains Definitions of all API Endpoints and their configurations

########################## service

This Layer interacts with DAO Layer and responsible for performing any Business Logic on fetched Data

########################## test

Test Cases for various Modules

########################## util

Contains Utility functions to be used throughout the app to increase usability

########################## view

All Other html/view engine related files goes here












