/**
 * The main script is involved with game setup, game state, updating, rendering, & user input.
 */
'use strict';


function update(board, snake, food) {
    /**
     * Moves the game entities and checks whether the game should continue
     * @param {Board} board
     * @param {Snake} snake
     * @param {Food} food
     * @return {boolean} true=game continues. false=game ends.
     */
    snake.move();
    const snakeHead = snake.body[0];
    if (snakeHead.x === food.x && snakeHead.y === food.y) {
        snake.grow();
        // The snake is drawn onto the board to mark blocks where the food shouldn't respawn
        snake.drawOn(board.grid);
        if (!food.respawn(board.grid)) {
            notifyPlayer(true);
            snake.satisfy();
            return false;
        }
    }
    if (snakeHead.x > board.grid.length || snakeHead.x < 0 || snakeHead.y > board.grid[0].length ||
        snakeHead.y < 0 || board.grid[snakeHead.x][snakeHead.y] === 1 || snake.dead){
        notifyPlayer();
        snake.die();
        return false;
    }
    return true;
}

function render(board, snake, food) {
    /**
     * Draws the game entities into the board's grid and renders them
     * @param {Board} board
     * @param {Snake} snake
     * @param {Food} food
     */
    const canvas = el('game-area');
    food.drawOn(board.grid);
    snake.drawOn(board.grid);
    board.render(canvas);
}

function resizeCanvasAndCreateEntities() {
    /**
     * @return {array} The game entities
     */
    const canvas = el('game-area');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let board = new Board(canvas.width, canvas.height, BLOCK_SIZE);
    let snake = new Snake(2, 2);
    let food = Food.constructWithRandomLocationOnGrid(board.grid.length, board.grid[0].length);
    return [board, snake, food];
}

function play(board, snake, food) {
    /**
     * Runs the game loop. Displays the menu upon ending.
     * @param {Board} board
     * @param {Snake} snake
     * @param {Food} food
     */
    let continuePlaying = update(board, snake, food);
    render(board, snake, food);
    if (continuePlaying) {
        setTimeout(() => {
            play(board, snake, food);
        }, FRAME_DURATION);
    } else {
        showMenu();
    }
}

function setUpGameAndEventListeners() {
    let board;
    let snake;
    let food;
    [board, snake, food] = resizeCanvasAndCreateEntities();
    render(board, snake, food);

    window.addEventListener('resize',
        debounce(() => {
            const canvas = el('game-area');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            board.resize(canvas);
            food.respawn(board.grid);
            render(board, snake, food);
        }, 150)
    );

    el('button').addEventListener('click',
        () => {
            hideMenu();
            if (snake.dead || snake.full) {
                [board, snake, food] = resizeCanvasAndCreateEntities();
            }
            play(board, snake, food);
        }
    );

    document.addEventListener('keydown', (event) => {
        switch (event.keyCode) {
            case 37:
                snake.turn(-1, 0);
                break;
            case 38:
                snake.turn(0, -1);
                break;
            case 39:
                snake.turn(1, 0);
                break;
            case 40:
                snake.turn(0, 1);
                break;
        }
    });
}

setUpGameAndEventListeners();
