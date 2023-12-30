class PiecesModule {
  constructor(game) {
    this.game = game;
    this.createAndPlaceInitialPieces();
  }

  createAndPlaceInitialPieces() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 1) {
          const piece = this.game.piecesModule.createPiece(row, col, '#cc0000', 'red');
          this.game.piecesModule.placePieceOnSquare(piece, row, col);
        }
      }
    }

    for (let row = 5; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 1) {
          const piece = this.game.piecesModule.createPiece(row, col, '#0000cc', 'blue');
          this.game.piecesModule.placePieceOnSquare(piece, row, col);
        }
      }
    }
  }

  createPiece(row, col, color, player) {
    const piece = new Konva.Circle({
      x: col * 50 + 25,
      y: row * 50 + 25,
      radius: 20,
      fill: color,
      draggable: false,
    });

    piece.row = row;
    piece.col = col;
    piece.player = player;

    piece.on('click', () => this.game.uiModule.handlePieceClick(piece));

    this.game.layer.add(piece);
    return piece;
  }

  placePieceOnSquare(piece, row, col) {
    piece.position({ x: col * 50 + 25, y: row * 50 + 25 });
  }
}
