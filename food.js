/**
 *
 */
'use strict';


function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

class Food {
    /**
     * magic class
     * @property {number} type Contains the resource record type
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static constructWithRandomLocationOnGrid(width, height) {
        // rand x and y
        let x = 2;
        let y = 2;
        while (x === 2 && y === 2) {
            x = getRandomArbitrary(1, width - 1);
            y = getRandomArbitrary(1, height - 1);
        }

        return new this(x, y);
    }

    respawn(grid, pointsToAvoid) {
        let possiblePoints = grid.reduce((points, arr, i) => {
            let result = arr.reduce((filtered, block, j) => {
                if (block === null) {
                    filtered.push({
                        x: i,
                        y: j
                    });
                }
                return filtered;
            }, []);
            points.push(...result);
            return points;
        }, []);
        let randIndex = getRandomArbitrary(0, possiblePoints.length);
        this.x = possiblePoints[randIndex].x;
        this.y = possiblePoints[randIndex].y;
    }

    drawOn(grid) {
        grid[this.x][this.y] = 3;
    }
}
