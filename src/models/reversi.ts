export class Board {

    public rows: Row[];
    public turn: CellState = CellState.Black;

    constructor() {
        this.rows = [...Array(8).keys()].map(i => new Row(i));
        this.rows[3].cells[3].state =CellState.White;
        this.rows[4].cells[4].state =CellState.White;
        this.rows[3].cells[4].state =CellState.Black;
        this.rows[4].cells[3].state =CellState.Black;
    }

    public put(p: Point) {
        if (!this.ref(p).isNone) { return }

        const reversedList = this.search(p);
        if (reversedList.length === 0) { return }

        reversedList.forEach(p => this.ref(p).state = this.turn);

        this.ref(p).state = this.turn;

        this.next();

        if(this.shouldPass()) { this.next() }
    }

    public ref(p: Point): Cell {
        return this.rows[p.y].cells[p.x];
    }

    public next() {
        if (this.turn === CellState.Black) {
            this.turn = CellState.White;
        } else {
            this.turn = CellState.Black;
        }
    }

    public search(p: Point): Point[] {
        if (!this.ref(p).isNone) return [];
        const self = this;
        const _search = ( _p: Point, next: (pre: Point) => Point, lst: Point[]): Point[] => {
            const _next = next(_p);
            if ( !_next.inBoard || self.ref(_next).isNone) {
                return [];
            }
            if (this.ref(_next).state !== self.turn) {
                lst.push(_next);
                return _search(_next, next, lst);
            }
            return lst;
        }
        let result: Point[] = [];
        result = result.concat(_search(p, p => new Point(p.x, p.y + 1), []));
        result = result.concat(_search(p, p => new Point(p.x, p.y - 1), []));
        result = result.concat(_search(p, p => new Point(p.x + 1, p.y), []));
        result = result.concat(_search(p, p => new Point(p.x - 1, p.y), []));
        result = result.concat(_search(p, p => new Point(p.x + 1, p.y + 1), []));
        result = result.concat(_search(p, p => new Point(p.x - 1, p.y + 1), []));
        result = result.concat(_search(p, p => new Point(p.x + 1, p.y - 1), []));
        result = result.concat(_search(p, p => new Point(p.x - 1, p.y - 1), []));
        return result;
    }

    public get blacks(): number {
        let count = 0;
        this.rows.forEach(r => {
            count += r.blacks;
        });
        return count;
    }

    public get whites(): number {
        let count = 0;
        this.rows.forEach(r => {
            count += r.whites;
        });
        return count;
    }

    public shouldPass(): boolean {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const reversedList = this.search(new Point(i, j));
                if (reversedList.length > 0) {
                    return false;
                }
            }
        }
        return true;
    }
}

export class Point {

    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public get inBoard(): boolean {
        return 0 <= this.x && this.x <= 7 && 0 <= this.y && this.y <= 7;
    }
}

export class Row {

    public cells: Cell[];
    public num: number;

    constructor(rowNumber: number) {
        this.num = rowNumber;
        this.cells = [...Array(8).keys()].map(i => new Cell(i, rowNumber));
    }


    public get blacks(): number {
        let count = 0;
        this.cells.forEach(c => {
            if (c.isBlack) count++;
        });
        return count;
    }

    public get whites(): number {
        let count = 0;
        this.cells.forEach(c => {
            if (c.isWhite) count++;
        });
        return count;
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

    public get isBlack(): boolean {
        return this.state === CellState.Black;
    }

    public get isWhite(): boolean {
        return this.state === CellState.White;
    }

    public get isNone(): boolean {
        return this.state === CellState.None;
    }
}

export enum CellState {
    White = 'white',
    Black = 'black',
    None = 'none',
}
