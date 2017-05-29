import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

var PLAYERS = [
  {
    name: "Demo Player #1",
    score: 10,
    id: 1,
  },
  /*
  {
    name: "Demo Player #2",
    score: 3,
    id: 2,
  },
  */
]

function Header(props) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

function Counter(props) {
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={function() {props.onChange(-1);}} > - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={function() {props.onChange(1);}} > + </button>
    </div>
  );
}

Counter.propTypes = {
  score: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

function Player(props) {
  return (
    <div className="players">
      <div className="player">
        <div className="player-name">
          {props.name}
        </div>
        <div className="player-score">
          <Counter score={props.score} onChange={props.onScoreChange} />
        </div>
      </div>
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onScoreChange: PropTypes.func.isRequired,
};

var Application = React.createClass({
  propTypes: {
    title: PropTypes.string,
    initialPlayers: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    })).isRequired,
  },

  getDefaultProps: function() {
    return {
      title: "Scoreboard",
    }
  },

  getInitialState: function() {
    return {
      players: this.props.initialPlayers,
    };
  },

  onScoreChange: function(index, delta) {
    console.log('onScoreChange', index, delta);
    this.state.players[index].score += delta;
    this.setState(this.state);
  },

  render: function() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} />

        <div className="players">
          {this.state.players.map(function(player, index) {
            return (
              <Player
              onScoreChange={function(delta) {this.onScoreChange(index, delta)}.bind(this)}
              name={player.name}
              score={player.score}
              key={player.id} />
            );
          }.bind(this))}
        </div>
      </div>
    );
  }
});

ReactDOM.render(<Application initialPlayers={PLAYERS} />, document.getElementById('container'));
