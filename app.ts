type STATUS = "VACANT" | "BLACK" | "WHITE"
type TURN = "BLACK" | "WHITE"


var turn:TURN = "BLACK"


class Space {
    x: number
    y: number
    status: STATUS
    element: HTMLDivElement

    constructor(x: number,y: number, status: "VACANT"){
        this.x = x
        this.y = y
        this.status = status
        this.element = document.createElement('div')
        this.element.classList.add('square')
        this.element.classList.add(this.status.toLowerCase())
        this.element.addEventListener('click', () => {
            this.handleClick()
        })
    }

    handleClick() {
        if (this.status === "VACANT") return
        this.element.classList.remove(this.status.toLowerCase())
        this.status = turn
        this.element.classList.add(this.status.toLowerCase())
    }

}


class Board {
    spaces: Space[][]
    element: HTMLDivElement

    constructor(size: number){
        this.spaces = [];
        for(var i: number = 0; i < size; i++){
            this.spaces[i] = []
            for(var j: number=0; j < size; j++){
                this.spaces[i][j] = new Space(i,j,"VACANT");
            }
        }
    }

}
