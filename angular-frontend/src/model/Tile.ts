export interface Tile {
    color:string;
    cols: number;
    rows: number;
    text: string;
}

export interface NewsTile extends Tile {
        
}

export interface MapTile extends Tile {
    style: {};
}
