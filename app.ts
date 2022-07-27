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
    toggleTurn(){
        if (this.turn === "BLACK"){this.turn = "WHITE"}
        else{this.turn = "BLACK"}
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
        this.canvas.width = 800
        this.canvas.height = 800
        this.tile_size = this.canvas.getBoundingClientRect().width / this.game_size
        this.ctx = this.canvas.getContext("2d")!
        this.canvas.addEventListener('click', event => {
            const rect = this.canvas.getBoundingClientRect()
            const x = Math.floor((event.clientX - rect.left) / this.tile_size)
            const y = Math.floor((event.clientY - rect.top) / this.tile_size)
            const coord: COORDINATES = {x: x, y: y}
            this.game.placeTile(coord.x, coord.y)
            console.log(this.game.board)
            this.drawPiece(this.getTileCentre(coord), this.game.turn)
            this.game.toggleTurn()
        }, false)
        window.addEventListener("resize", this.updateTileSize()!, false)
        this.drawBoard()
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

    getTileCentre(coord: COORDINATES){
        const canvasX = (this.tile_size * coord.x) + (this.tile_size/2)
        const canvasY = (this.tile_size * coord.y) + (this.tile_size/2)
        const canvas_coord: COORDINATES = {x: canvasX, y: canvasY}
        return (canvas_coord)
    }

    drawPiece(coord: COORDINATES, turn: TURN){
        this.ctx.beginPath()
        this.ctx.arc(coord.x, coord.y, this.tile_size*0.45, 0, 2*Math.PI)
        this.ctx.fillStyle = turn.toLowerCase()
        this.ctx.fill()
        this.ctx.strokeStyle = 'black'
        this.ctx.stroke()
    }


}

let gc = new GameCanvas(10)
