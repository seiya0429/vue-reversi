export class Board {

    public rows: Row[];

    constructor() {
        this.rows = [...Array(8).keys()].map(i => new Row(i));
    }
}

export class Row {

    public cells: Cell[];

    constructor(rowNumber: number) {
        this.cells = [...Array(8).keys()].map(i => new Cell(i, rowNumber));
    }

}

export class Cell {

    public x: number;
    public y: number;
    public state: CellState = CellState.None;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export enum CellState {
    White = 'white',
    Black = 'black',
    None = 'none',
}