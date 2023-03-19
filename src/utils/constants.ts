import { RowOrColumnValueType, TileStateType } from "..";

export const actionConfig = {
    down: {
        sort: (a: TileStateType, b: TileStateType) => b.y - a.y,
        orderAxis: "y",
        hasOffset: true
    },
    up: {
        sort: (a: TileStateType, b: TileStateType) => a.y - b.y,
        orderAxis: "y",
        hasOffset: false,
    },
    left: {
        sort: (a: TileStateType, b: TileStateType) => a.x - b.x,
        orderAxis: "x",
        hasOffset: false
    },
    right: {
        sort: (a: TileStateType, b: TileStateType) => b.x - a.x,
        orderAxis: "x",
        hasOffset: true
    }
}