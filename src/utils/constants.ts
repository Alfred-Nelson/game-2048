import { RowOrColumnValueType, TileStateType } from "..";

export const actionConfig = {
    down: {
        sort: (a: TileStateType, b: TileStateType) => b.y - a.y,
        orderAxis: "y",
        hasEndOffset: true
    },
    up: {
        sort: (a: TileStateType, b: TileStateType) => a.y - b.y,
        orderAxis: "y",
        hasEndOffset: false,
    },
    left: {
        sort: (a: TileStateType, b: TileStateType) => a.x - b.x,
        orderAxis: "x",
        hasEndOffset: false
    },
    right: {
        sort: (a: TileStateType, b: TileStateType) => b.x - a.x,
        orderAxis: "x",
        hasEndOffset: true
    }
}


export const getColorStyle = ( value : number ) => {
    switch(value) {
        case 2: return "bg-two";
        case 4: return "bg-four";
        case 8: return "bg-eight";
        case 16: return "bg-one6";
        case 32: return "bg-three2";
        case 64: return "bg-six4";
        case 128: return "bg-one28";
        case 256: return "bg-two56";
        case 512: return "bg-five12";
        case 1024: return "bg-one024";
        case 2048: return "bg-two048";
        default: return("bg-black")
    }
}