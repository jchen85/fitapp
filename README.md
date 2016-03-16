# FitQuest

![FitQuest](http://i.imgur.com/ZgR3k5m.png)

A team-based multiplayer game that provides fitness challenges. Uses the Fitbit API to collect user data and determine whether challenges have been completed. Users are awarded Carrots and powerups to incentivize play.

[View demo](http://107.170.214.235/)
Login: jaylum@gmail.com
Password: salesforce

Author: [Jay Chen](https://github.com/jchen85/) | [jchen85.github.io](https://jchen85.github.io)

***

### Overview

#### Description
FitQuest gamifies exercise by motivating players to compete, in teams, with each other to complete fitness challenges. Players are placed on random teams at the beginning of each day. Players earn "Carrots" which can be spent to join challenges or purchase powerups to help them perform better. But players need to be careful about how they spend their Carrots, because their Carrot count also determines their team's score. The winning team earns a free powerup, which their members can use to perform better the next day.

At midnight each day, Carrot counts are reset and players are shuffled into a new random team. Only powerups are persisted between days. This helps keep the game fresh and interesting by preventing sole players from dominating the leaderboards. At the same time, players are incentivized to do well so that they can start the next day with powerups to boost their performance.

#### Features
  - Multiplayer play
  - Integration with Fitbit API
  - Real-time single page application

#### User Flow
Like many games, FitQuest provides a short set of instructions on the home page in order to get players to start playing quickly. The interface is designed to reflect game industry standards in order to ease players into the learning curve. More detailed help instructions are provided for players who want more guidance (work in progress). 

![User Flow](http://i.imgur.com/4nyrrec.png)

#### Technologies used for development and production:
  - React + Redux
  - RethinkDB
  - Socket.IO
  - Node.js
  - Sass
  - Redux DevTools
  - Babel 6
  - Webpack
  - Express
  - Eslint

***

### Instructions for repo use
1. Clone this repo. 
2. Obtain a Fitbit developer account and API keys. Create a file called `server/credentials.js`. Edit the contents of `server/credentials.js` to:  
  ````  
  export default {
    CLIENT_ID: 'CLIENT_ID',
    CLIENT_SECRET: 'CLIENT_SECRET'
  };
  ````
3. Provision a RethinkDB database and edit the database config file in `db/config.js`. 
4. Run `node server/server.js` to start the production server, or `node devServer.js` for the development server.
