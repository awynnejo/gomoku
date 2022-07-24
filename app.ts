type TILE = "VACANT" | "BLACK" | "WHITE"
type TURN = "BLACK" | "WHITE"
type COORDINATES = {
    x: number
    y: number
}

class Game {
    board: TILE[][]
    turn: TURN
    size: number

    constructor(size: number){
        this.board = new Array(size)
            .fill("VACANT")
            .map(() => new Array(size).fill("VACANT"))
        this.turn = "BLACK"
        this.size = size
    }
    checkWin(){
        return null
    }
    placeTile(x: number, y: number){
        this.board[x][y] = this.turn
    }

}

class GameCanvas {
    game: Game
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    canvas_width: number
    canvas_height: number

    constructor(){
        this.game = new Game(10)
        this.canvas_width = 500
        this.canvas_height = 500
        this.canvas = <HTMLCanvasElement>document.createElement('canvas')
        this.ctx = this.canvas.getContext("2d")!
    }
    getGridCoordinates(){
       return null
    }

    drawBoard(){
        let canvas = this.canvas

    }
}
