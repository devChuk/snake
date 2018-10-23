/**
 *
 */
'use strict';


// const UP = 1;
// const LEFT = 2;
// const DOWN = 3;
// const RIGHT = 4;

class Snake {
    /**
     * magic class
     * @property {number} type Contains the resource record type
     */
    constructor(x, y) {
        this.body = [{x, y}];
        this.x_vel = 0;
        this.y_vel = 0;
        this.growing = false;
        this.dead = false;
    }

    drawOn(grid) {
        this.body.forEach(pt => {
            grid[pt.x][pt.y] = 2;
        });
        if (this.dead) {
            grid[this.body[0].x][this.body[0].y] = 4;
        }
    }

    face(x_vel, y_vel) {
        if (this.body.length > 1 &&
            this.body[0].x + x_vel === this.body[1].x &&
            this.body[0].y + y_vel === this.body[1].y) {
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

    move() {
        this.body.unshift({
            x: this.body[0].x + this.x_vel,
            y: this.body[0].y + this.y_vel
        });
        let snakeHead = this.body[0];
        if (!this.growing) {
            this.body.pop();
        }
        this.growing = false;

        // check if self bite.
        let selfBite = this.body.slice(1).some(
            point => point.x === snakeHead.x && point.y === snakeHead.y
        );
        if (selfBite) {
            this.die();
        }
    }
}
