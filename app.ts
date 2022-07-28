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
    gameover: boolean

    constructor(size: number){
        this.board = new Array(size)
            .fill("VACANT")
            .map(() => new Array(size).fill("VACANT"))
        this.turn = "BLACK"
        this.size = size
        this.gameover = false
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
    game_state: HTMLHeadingElement

    constructor(game_size: number = 10){
        this.game_size = game_size
        this.game = new Game(this.game_size)
        this.game_state = <HTMLHeadingElement>document.getElementById('game_state')
        this.updateGameState()
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas')
        this.canvas.width = 800
        this.canvas.height = 800
        this.tile_size = this.canvas.getBoundingClientRect().width / this.game_size
        this.ctx = this.canvas.getContext("2d")!
        this.canvas.addEventListener('click', event => {
            const coord = this.getTileXY(event)
            if (this.game.board[coord.x][coord.y] === 'VACANT'){
                this.game.placeTile(coord.x, coord.y)
                this.drawPiece(this.getTileCentre(coord), this.game.turn)
                this.game.toggleTurn()
                this.updateGameState()
            }
            console.log(this.game.board)
        }, false)
        window.addEventListener("resize", this.updateTileSize()!, false)
        this.drawBoard()
    }

    updateTileSize(){
        this.tile_size = (this.canvas.getBoundingClientRect().right - this.canvas.getBoundingClientRect().left) / this.game_size
    }

    updateGameState(){
        if (this.game.gameover === false){
            this.game_state.innerHTML = this.game.turn + "'S TURN"
        } else {
            this.game_state.innerHTML = "GAME OVER - " + this.game.turn + "WINS"
        }
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

    getTileXY(event: MouseEvent){
        const rect = this.canvas.getBoundingClientRect()
        const x = Math.floor((event.clientX - rect.left) / this.tile_size)
        const y = Math.floor((event.clientY - rect.top) / this.tile_size)
        const coord: COORDINATES = {x: x, y: y}
        return coord
    }

    drawPiece(coord: COORDINATES, turn: TURN){
        this.ctx.beginPath()
        this.ctx.arc(coord.x, coord.y, this.tile_size*0.45, 0, 2*Math.PI)
        this.ctx.fillStyle = turn.toLowerCase()
        this.ctx.fill()
        this.ctx.strokeStyle = 'black'
        this.ctx.stroke()
    }

    resetGame(){
        this.game = new Game(this.game_size)
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.updateTileSize()
        this.drawBoard()
        this.updateGameState()

    }
}
let newgame_button = <HTMLButtonElement>document.getElementById('btn_new_game')
let game_size_input = <HTMLInputElement>document.getElementById('inp_board_size')
let gc = new GameCanvas(parseInt(game_size_input.value))
newgame_button.addEventListener('click', function handleClick(){
    gc.game_size = parseInt(game_size_input.value)
    gc.resetGame()
})
