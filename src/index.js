import React, { Component } from "react";
import './app.css';
import ReactDOM from 'react-dom';

class Player extends Component{

    handleForm(e){
        e.preventDefault();
        this.props.player(e.target.player.value)
    }
    render(){
        return(
            <form onSubmit={(e) => this.handleForm(e)}>
                <label>
                    Player X
                <input type="radio" name="player" value="X"/> 
                </label>
                 <label>
                    Player O
                <input type="radio" name="player" value="O"/> 
                </label>
                <input type="submit" value="start"/>
            </form>
        )

    }
}

class Status extends Component {
    handleSetPlayer(e) {
        this.props.setPlayer(e)
    }
    renderHtml() {
        if (this.props.winner) {
            return (<h2>Winner is {this.props.winner}</h2>)
        } else {
            return this.props.player ?
                <h2>Next player is {this.props.player}</h2> :
                <Player player={(e) => this.handleSetPlayer(e)} />
        }
    }
    render() {
        return (<span>{this.renderHtml()}</span>)
    }
}

class Game extends Component {
    constructor(props) {
      super(props)
      this.state = {
        board: Array(9).fill(null),
        player: null,
        winner: null
      }
    }
  
    checkWinner() {
      let winLines =
        [
          ["0", "1", '2'],
          ["3", "4", '5'],
          ["6", "7", '8'],
          ["0", "3", '6'],
          ["1", "4", '7'],
          ["2", "5", '8'],
          ["0", "4", '8'],
          ["2", "4", '6'],
        ]
      this.checkMatch(winLines)
    }
  
    checkMatch(winLines) {
      for (let index = 0; index < winLines.length; index++) {
        const [a, b, c] = winLines[index];
        let board = this.state.board
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          alert('You won');
          this.setState({
            winner: this.state.player
          })
        }
      }
    }
  
    handleClick(index) {
      if (this.state.player && !this.state.winner) {
        let newBoard = this.state.board
        if (this.state.board[index] === null) {
          newBoard[index] = this.state.player
          this.setState({
            board: newBoard,
            player: this.state.player === "X" ? "O" : "X"
          })
          this.checkWinner()
        }
      }
    }
    setPlayer(player) {
      this.setState({ player })
    }
    renderBoxes() {
      return this.state.board.map(
        (box, index) =>
          <div className="box" key={index}
            onClick={() => this.handleClick(index)}>
            {box} </div>
      )
    }
    reset() {
      this.setState({
        player: null,
        winner: null,
        board: Array(9).fill(null)
      })
    }
    render() {
      return (
        <div className="container">
          <h1>Tic Tac Toe App</h1>
          <Status
            player={this.state.player}
            setPlayer={(e) => { this.setPlayer(e) }}
            winner={this.state.winner}
          />
          <div className="board">
            {this.renderBoxes()}
          </div>
          <button disabled={!this.state.winner} onClick={() => this.reset()}> Reset</button >
        </div>
      );
    }
  }

class Learn extends Component {
    render() {
      return (
        <div>
           <div>what' new</div>
           <div><button onClick="0">hello</button></div>
        </div>
       
      );
    }
  }

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
  );