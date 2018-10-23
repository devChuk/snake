'use strict';


class Board {
    /**
     * Represents the game's coordinate grid
     * @property {number} blockSize The size of a pixel in the grid
     * @property {array} grid A two-dimensional array that represents the grid
     */
    constructor(canvasWidth, canvasHeight, blockSize) {
        // Calculate the unit width and height of the grid to fill the canvas
        let gridWidth = Math.floor(canvasWidth / blockSize);
        let gridHeight = Math.floor(canvasHeight / blockSize);
        this.blockSize = blockSize;
        this.grid = new Array(gridWidth).fill(null);
        this.grid = this.grid.map(() => new Array(gridHeight).fill(null));
        this.buildBoardWalls();
    }

    render(canvas) {
        /**
         * Renders the board grid onto a canvas. Note that non-wall blocks are removed
         * @param {HTML5 Canvas} canvas The <canvas> element
         */
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // fill the bottom and right black gaps of grid
        ctx.fillStyle = 'white';
        ctx.fillRect(0, canvas.height - this.blockSize, canvas.width, this.blockSize);
        ctx.fillRect(canvas.width - this.blockSize, 0, this.blockSize, canvas.height);

        // draw grid with appropriate color
        this.grid.forEach((arr, i) => {
            arr.forEach((block, j) => {
                switch(block) {
                    case FOOD_BLOCK:
                        ctx.fillStyle = '#7AEE56';
                        break;
                    case DEAD_SNAKE_BLOCK:
                        ctx.fillStyle = 'red';
                        break;
                    default:
                        ctx.fillStyle = 'white';
                        break;
                }
                if (block) {
                    ctx.fillRect(i * this.blockSize, j * this.blockSize, this.blockSize,
                        this.blockSize);

                    if (block !== WALL_BLOCK) {
                        this.grid[i][j] = null;
                    }
                }
            });
        });
    }

    resize(canvas) {
        /**
         * Resize the game board to the new canvas size and rerenders it. The grid extends with
         * empty grid space if the canvas is larger, and shortens if the canvas is smaller.
         * @param {HTML5 Canvas} canvas The <canvas> element
         */
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

        this.buildBoardWalls();
        this.render(canvas);
    }

    buildBoardWalls() {
        // Builds the four walls on the edges of the board grid.
        this.grid[0].fill(WALL_BLOCK);
        this.grid[this.grid.length - 1].fill(WALL_BLOCK);
        this.grid.forEach(arr => {
            arr[0] = WALL_BLOCK;
            arr[arr.length - 1] = WALL_BLOCK;
        });
    }
}
