export interface Tile {
    color:string;
    cols: number;
    rows: number;
    text: string;
}

export interface NewsTile extends Tile {
    style: {};
}

export interface MapTile {
    cols: number;
    rows: number;
    text: string;
}
