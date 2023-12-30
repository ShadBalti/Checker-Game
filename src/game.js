class CheckersGame {
  constructor() {
    this.stage = new Konva.Stage({
      container: 'board-container',
      width: 400,
      height: 400,
    });

    this.layer = new Konva.Layer();
    this.board = [];
    this.selectedPiece = null;
    this.currentPlayer = 'red';

    this.boardModule = new BoardModule(this);
    this.piecesModule = new PiecesModule(this);
    this.uiModule = new UIModule(this);

    this.stage.add(this.layer);
  }

  handleTurnEnd() {
    this.selectedPiece = null;
    this.boardModule.clearHighlights();
    this.currentPlayer = this.currentPlayer === 'red' ? 'blue' : 'red';
  }
}

const checkersGame = new CheckersGame();
