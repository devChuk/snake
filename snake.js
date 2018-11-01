'use strict';


class Snake {
    /**
     * Represents a snake
     * @property {array} body An array of points the snake's body occupies
     * @property {number} x_vel The horizontal velocity of the head
     * @property {number} y_vel The vertical velocity of the head
     * @property {boolean} growing Used to grow the snake by one body unit
     * @property {boolean} dead True if the snake has collided with itself or a wall
     * @property {boolean} full True if there is nothing else to eat. The snake is done eating.
     */
    constructor(x, y) {
        this.body = [{x, y}];
        this.x_vel = 0;
        this.y_vel = 0;
        this.growing = false;
        this.dead = false;
        this.full = false;
    }

    drawOn(grid) {
        this.body.forEach(pt => {
            if (pt.x < grid.length && pt.y < grid[0].length) {
                grid[pt.x][pt.y] = SNAKE_BLOCK;
            }
        });
        if (this.dead) {
            const snakeHead = this.body[0];
            if (snakeHead.x < grid.length && snakeHead.y < grid[0].length) {
                grid[snakeHead.x][snakeHead.y] = DEAD_SNAKE_BLOCK;
            }
        }
    }

    turn(x_vel, y_vel) {
        /**
         * Prepares the snake to turn in a certain direction. Prevents the snake from turning
         * backwards if its body is longer than one unit.
         * @param {number} x_vel 1,0, or -1
         * @param {number} y_vel 1,0, or -1
         * @return {boolean} true=turning successful. false=turning unsuccessful
         */
        if (this.body.length > 1 &&
            this.body[0].x + x_vel === this.body[1].x &&
            this.body[0].y + y_vel === this.body[1].y) {
            return false;
        }
        if (!([1,0,-1].indexOf(x_vel) !== -1 && [1,0,-1].indexOf(y_vel) !== -1 &&
            Math.abs(x_vel) + Math.abs(y_vel) === 1)) {
            return false;
        }

        this.x_vel = x_vel;
        this.y_vel = y_vel;
        return true;
    }

    grow() {
        this.growing = true;
    }

    die() {
        this.dead = true;
    }

    satisfy() {
        this.full = true;
    }

    move() {
        // Moves the snake forward in the direction it has turned in
        this.body.unshift({
            x: this.body[0].x + this.x_vel,
            y: this.body[0].y + this.y_vel
        });
        let snakeHead = this.body[0];
        if (!this.growing) {
            this.body.pop();
        }
        this.growing = false;

        // check if the snake has collided with itself
        let selfBite = this.body.slice(1).some(
            point => point.x === snakeHead.x && point.y === snakeHead.y
        );
        if (selfBite) {
            this.die();
        }
    }
}
