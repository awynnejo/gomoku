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
    tile_size: number
    ctx: CanvasRenderingContext2D

    constructor(game_size: number = 10){
        this.game_size = game_size
        this.game = new Game(this.game_size)
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas')
        this.tile_size = this.canvas.width / this.game_size
        this.ctx = this.canvas.getContext("2d")!
        this.canvas.addEventListener('click', event => {
            const x = (event.screenX - this.canvas.getBoundingClientRect().left) / this.tile_size
            const y = (event.screenY - this.canvas.getBoundingClientRect().top) / this.tile_size
            console.log(x + ':' + y)
            console.log(this.tile_size)
        }, false)
        window.addEventListener("resize", this.updateTileSize()!, false)
    }

    updateTileSize(){
        this.tile_size = (this.canvas.getBoundingClientRect().right - this.canvas.getBoundingClientRect().left) / this.game_size
    }

    drawBoard(){
        for(let i = 0; i < this.canvas.width; i++){
            this.ctx.beginPath()
            this.ctx.moveTo(i * this.tile_size, 0)
            this.ctx.lineTo(i * this.tile_size, this.canvas.width)
            this.ctx.stroke()
            this.ctx.moveTo(0, i * this.tile_size)
            this.ctx.lineTo(this.canvas.width, i * this.tile_size)
            this.ctx.stroke()

        }
    }

}

let gc = new GameCanvas(10)
gc.drawBoard()
