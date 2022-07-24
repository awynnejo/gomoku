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
    game_size: number
    game: Game
    canvas: HTMLCanvasElement
    canvas_width: number
    tile_size: number
    ctx: CanvasRenderingContext2D

    constructor(){
        this.game_size = 10
        this.game = new Game(this.game_size)
        this.canvas_width = 500
        this.tile_size = this.canvas_width / 10
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas')
        this.ctx = this.canvas.getContext("2d")!
    }
    getGridCoordinates(){
       return null
    }

    drawBoard(){
        for(let i = 0; i < this.canvas_width; i++){
            this.ctx.beginPath()
            this.ctx.moveTo(i * this.tile_size, 0)
            this.ctx.lineTo(i * this.tile_size, this.canvas_width)
            this.ctx.stroke()
            this.ctx.moveTo(0, i * this.tile_size)
            this.ctx.lineTo(this.canvas_width, i * this.tile_size)
            this.ctx.stroke()

        }
    }
}

let gc = new GameCanvas()
gc.drawBoard()
