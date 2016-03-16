import React, { Component } from 'react';
import '../styles/help.scss';

export default class Help extends Component {
  render() {    
    return (
      <div className="help">
        <p>
          FitQuest gamifies exercise by motivating players to compete, in teams, with each other to complete fitness challenges. Players are placed on random teams at the beginning of each day. Players earn "Carrots" which can be spent to join challenges or purchase powerups to help them perform better. But players need to be careful about how they spend their Carrots, because their Carrot count also determines their team's score. The winning team earns a free powerup, which their members can use to perform better the next day.
        </p>
        <p>
        At midnight each day, Carrot counts are reset and players are shuffled into a new random team. Only powerups are persisted between days. This helps keep the game fresh and interesting by preventing sole players from dominating the leaderboards. At the same time, players are incentivized to do well so that they can start the next day with powerups to boost their performance.
        </p>
        <p>
          To get started, sync your Fitbit device. Join a challenge, then complete the requirements. Sync your Fitbit device again before the challenge ends in order to receive credit for completing it.
        </p>
      </div>
    );
  }
}
