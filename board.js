/**
 *
 */
'use strict';


class Board {
    /**
     * magic class
     * @property {number} type Contains the resource record type
     */
    constructor(canvasWidth, canvasHeight, blockSize) {
        // figure out width and height of our grid
        let gridWidth = Math.floor(canvasWidth / blockSize);
        let gridHeight = Math.floor(canvasHeight / blockSize);
        this.blockSize = blockSize;

        this.grid = new Array(gridWidth).fill(null);
        this.grid = this.grid.map(() => new Array(gridHeight).fill(null));
        this.buildBoardWalls()
    }

    render(canvas) {
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // fill the bottom and right black gaps of grid
        ctx.fillStyle = "white";
        ctx.fillRect(0, canvas.height - this.blockSize, canvas.width, this.blockSize);
        ctx.fillRect(canvas.width - this.blockSize, 0, this.blockSize, canvas.height);

        this.grid.forEach((arr, i) => {
            arr.forEach((block, j) => {
                switch(block) {
                    case 3:
                        ctx.fillStyle = "#7AEE56";
                        break;
                    case 4:
                        ctx.fillStyle = "red";
                        break;
                    default:
                        ctx.fillStyle = "white";
                        break;
                }
                if (block) {
                    ctx.fillRect(i * this.blockSize, j * this.blockSize, this.blockSize, this.blockSize);
                    if (block !== 1) {
                        this.grid[i][j] = null;
                    }
                }
            });
        });
    }

    resize(canvas) {
        let gridWidth = Math.floor(canvas.width / this.blockSize);
        let gridHeight = Math.floor(canvas.height / this.blockSize);
        // clear bottom & right walls
        this.grid[this.grid.length - 1].fill(null);
        this.grid.forEach(arr => arr[arr.length - 1] = null);

        if (this.grid.length > gridWidth) {
            // shorten grid width if it is too long
            this.grid.length = gridWidth;
        } else {
            // extend grid width if it is too short
            while (this.grid.length < gridWidth) {
                this.grid.push(new Array(gridHeight).fill(null));
            }
        }

        this.grid = this.grid.map(arr => {
            if (arr.length > gridHeight) {
                // shorten grid height if it is too long
                arr.length = gridHeight;
            } else {
                // extend grid height if it is too short
                arr.push(...new Array(gridHeight - arr.length).fill(null));
            }
            return arr;
        });

        this.buildBoardWalls()
        this.render(canvas);
    }

    buildBoardWalls() {
        this.grid[0].fill(1);
        this.grid[this.grid.length - 1].fill(1);
        this.grid.forEach(arr => {
            arr[0] = 1;
            arr[arr.length - 1] = 1;
        });
    }
}
