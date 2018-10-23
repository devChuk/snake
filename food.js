'use strict';


class Food {
    /**
     * Represents a snake food pellet
     * @property {number} x An integer x-coordinate for the food's location on the board grid
     * @property {number} y An integer y-coordinate for the food's location on the board grid
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static constructWithRandomLocationOnGrid(width, height) {
        /**
         * Creates a Food object and places it randomly on a board grid within the walls
         * @param {number} width The width in units of the board grid
         * @param {number} height The height in units of the board grid
         * @return {Food} The created Food object
         */
        let x = 2;
        let y = 2;
        while (x === 2 && y === 2) {
            x = getRandomArbitrary(1, width - 1);
            y = getRandomArbitrary(1, height - 1);
        }
        return new this(x, y);
    }

    respawn(grid) {
        /**
         * Moves the food object to a random unoccupied point on the game board grid.
         * @param {array} grid The game board grid. A two-dimensional array
         * @return {boolean} true=respawn successful. false=there are no available points
         */
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
        if (possiblePoints.length === 0) {
            return false;
        }
        this.x = possiblePoints[randIndex].x;
        this.y = possiblePoints[randIndex].y;
        return true;
    }

    drawOn(grid) {
        grid[this.x][this.y] = FOOD_BLOCK;
    }
}
