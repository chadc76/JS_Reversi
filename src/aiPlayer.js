if (typeof window === 'undefined'){
    var Board = require("./board.js");
}

/**
 * Initializes the AI Player with its color and the board.
*/  
function AIPlayer (color, board) {
  this.color = color;
  this.board = board;
};

AIPlayer.prototype._getMoves = function () {
  return this.board.validMoves(this.color)
};

AIPlayer.prototype.bestMove = function () {
  const allMoves = this._getMoves();
  let highestTot = 0;
  let move;

  for (i = 0; i < allMoves.length; i++) {
    let tot = 0;
    let currentMove = allMoves[i];

    if ([[0, 0], [0, 7], [7, 0], [7, 7]].includes(currentMove)) {
      return currentMove;
    }

    for (j = 0; j < Board.DIRS.length; j++) {
      let numFlips = this.board._positionsToFlip(currentMove, this.color, Board.DIRS[j]).length;

      tot = tot + numFlips;
    }

    if (tot > highestTot) {
      move = currentMove;
      highestTot = tot;
    }
  }

  return move;
};

if (typeof window === 'undefined'){
    module.exports = AIPlayer;
  }