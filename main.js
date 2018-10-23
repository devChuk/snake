/**
 * The main script contains the game setup, game state, constants, rendering, updating, & user input.
 */
'use strict';


const BLOCK_SIZE = 20;

function debounce(func, delay) {
    let inDebounce;
    return function() {
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func(), delay);
    };
}

function update(board, snake, food) {
    /**
     * magic
     */
    snake.move();
    const snakeHead = snake.body[0]
    if (snakeHead.x === food.x && snakeHead.y === food.y) {
        snake.grow();
        food.respawn(board.grid);
    }
    if (snakeHead.x > board.grid.length || snakeHead.x < 0 || snakeHead.y > board.grid[0].length ||
        snakeHead.y < 0 || board.grid[snakeHead.x][snakeHead.y] === 1 || snake.dead){
        snake.die()
        return false;
    }
    return true;
}

function render(board, snake, food) {
    /**
     * magic
     */
    const canvas = el('game-area');
    food.drawOn(board.grid);
    snake.drawOn(board.grid);
    board.render(canvas);
}

function createEntities() {
    const canvas = el('game-area');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // initialize game instances
    const board = new Board(
        canvas.width,
        canvas.height,
        BLOCK_SIZE
    );

    let snake = new Snake(
        2,
        2
    );

    let food = Food.constructWithRandomLocationOnGrid(board.grid.length, board.grid[0].length);

    return [board, snake, food];
}

function setUpBoard() {
    /**
     * magic
     */
    let board;
    let snake;
    let food;
    [board, snake, food] = createEntities();

    render(board, snake, food);

    window.addEventListener('resize',
        debounce(() => {
            const canvas = el('game-area');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            board.resize(canvas)
            food.respawn(board.grid);
            render(board, snake, food);
        }, 150)
    );

    el('button').addEventListener('click',
        () => {
            hideMenu();
            if (snake.dead) {
                [board, snake, food] = createEntities();
            }
            play(board, snake, food);
        }
    );

    document.addEventListener('keydown', (event) => {
        switch (event.keyCode) {
            case 37:
                snake.face(-1, 0);
                break;
            case 38:
                snake.face(0, -1);
                break;
            case 39:
                snake.face(1, 0);
                break;
            case 40:
                snake.face(0, 1);
                break;
        }
    });
}

function play(board, snake, food) {
    let continuePlaying = update(board, snake, food);
    render(board, snake, food);

    if (continuePlaying) {
        setTimeout(() => {
            play(board, snake, food);
        }, 80);
    } else {
        showMenu();
    }
}

setUpBoard();
