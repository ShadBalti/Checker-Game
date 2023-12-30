class BoardModule {
  constructor(game) {
    this.game = game;
    this.createBoard();
  }

  createBoard() {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = new Konva.Rect({
          x: col * 50,
          y: row * 50,
          width: 50,
          height: 50,
          fill: (row + col) % 2 === 1 ? '#d18b47' : '#ffce9e',
          draggable: false,
        });

        square.row = row;
        square.col = col;

        square.on('click', () => this.game.uiModule.handleSquareClick(square));

        this.game.board.push(square);
        this.game.layer.add(square);
      }
    }
  }

  getSquareAtPosition(row, col) {
    return this.game.board.find(square => square.row === row && square.col === col);
  }
}
          
