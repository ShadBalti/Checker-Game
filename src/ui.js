class UIModule {
  constructor(game) {
    this.game = game;
  }

  handleSquareClick(clickedSquare) {
    const { row, col } = clickedSquare;
    const piece = this.game.piecesModule.getPieceAtSquare(row, col);

    if (this.game.selectedPiece) {
      const isValidMove = this.game.uiModule.isValidMoveToSquare(this.game.selectedPiece, row, col);
      if (isValidMove) {
        this.game.piecesModule.movePieceToSquare(this.game.selectedPiece, row, col);
        this.game.handleTurnEnd();
      }
    } else {
      if (piece && piece.player === this.game.currentPlayer) {
        this.game.selectedPiece = piece;
        this.game.uiModule.highlightValidMoves(this.game.selectedPiece);
      }
    }
  }

  handlePieceClick(clickedPiece) {
    if (clickedPiece.player === this.game.currentPlayer) {
      this.game.selectedPiece = clickedPiece;
      this.game.uiModule.highlightValidMoves(this.game.selectedPiece);
    }
  }

  highlightValidMoves(piece) {
    this.game.boardModule.clearHighlights();
    const { row, col } = piece;

    [-1, 1].forEach(i => {
      [-1, 1].forEach(j => {
        const newRow = row + i;
        const newCol = col + j;

        if (this.game.uiModule.isValidMoveToSquare(piece, newRow, newCol)) {
          const square = this.game.boardModule.getSquareAtPosition(newRow, newCol);
          square.fill('#8aff8a');
        }
      });
    });

    this.game.layer.batchDraw();
  }

  clearHighlights() {
    this.game.board.forEach(square => square.fill((square.row + square.col) % 2 === 1 ? '#d18b47' : '#ffce9e'));
    this.game.layer.batchDraw();
  }

  isValidMoveToSquare(piece, newRow, newCol) {
    const currentRow = piece.row;
    const currentCol = piece.col;

    const rowDiff = Math.abs(newRow - currentRow);
    const colDiff = Math.abs(newCol - currentCol);

    if (rowDiff === 1 && colDiff === 1) {
      return this.game.uiModule.isSquareEmpty(newRow, newCol);
    } else if (rowDiff === 2 && colDiff === 2) {
      const middleRow = (currentRow + newRow) / 2;
      const middleCol = (currentCol + newCol) / 2;

      const middlePiece = this.game.piecesModule.getPieceAtSquare(middleRow, middleCol);

      return middlePiece && middlePiece.player !== this.game.currentPlayer && this.game.uiModule.isSquareEmpty(newRow, newCol);
    }

    return false;
  }

  isSquareEmpty(row, col) {
    const piece = this.game.piecesModule.getPieceAtSquare(row, col);
    return !piece;
  }
}
