<script>
    const LOCATION = {
        LEFT: 0,
        RIGHT: 1,
        TOP: 2,
        BOTTOM: 3,
        TOP_LEFT: 4,
        TOP_RIGHT: 5,
        BOTTOM_LEFT: 6,
        BOTTOM_RIGHT: 7,

    };
    const COLLISION_TYPE = {
        EDGE: 0,
        CORNER: 1
    };
    let fieldWidth = 0;
    let fieldHeight = 0;
    let gameField = null;
    let lifePanel = null;
    let paddle = null;
    // let hitWallSoundFile = null;
    // let hitWallSound = null;
    // let hitBrickSoundFile = null;
    // let hitBrickSound = null;
    // (async () => {
    //     hitWallSoundFile = await import('../../assets/hit-wall.wav');
    //     hitWallSound = new Audio(hitWallSoundFile);
    //     hitBrickSoundFile = await import('../../assets/hit-brick.wav');
    //     hitBrickSound = new Audio(hitBrickSoundFile);
    // })();
    export default {
        name: 'Ball',
        data() {
            return {
                style: {
                    left: 0,
                    top: 0
                },
                speed: {
                    x: 0,
                    y: 0
                },
                originalSpeed: {
                    x: 150,//150
                    y: -250 //-250
                },
                fps: 200, //frameDuration: 5,
                timeoutPointer: null,
                attached: true,
                radius: 8,
                dead: false
            }
        },
        methods: {
            move() {
                clearTimeout(this.timeoutPointer);
                let moveDistanceX = this.speed.x / this.fps;
                let moveDistanceY = this.speed.y / this.fps;
                let newPX = this.style.left + moveDistanceX;
                let newPY = this.style.top + moveDistanceY;
                let paddleCollided = this.detectCollisionWithPaddle(newPX, newPY, paddle);
                if (paddleCollided.rebound) {
                    let paddleSpeed = paddle.getSpeed();
                    this.speed.x += paddleSpeed;
                    if (paddleCollided.type === COLLISION_TYPE.EDGE) {
                        switch (paddleCollided.location) {
                            case LOCATION.TOP:
                                newPY = paddle.paddleY - this.width - (newPY + this.width - paddle.paddleY);
                                this.speed.y = - this.speed.y;
                                break;
                            case LOCATION.LEFT:
                                newPX -= 2 * (newPX + this.width - paddle.style.left);
                                this.speed.x = -this.speed.x;
                                break;
                            case LOCATION.RIGHT:
                                newPX += 2 * (paddle.style.left + paddle.style.width - newPX);
                                this.speed.x = -this.speed.x;
                                break;
                        }
                    } else {
                        // logMsg('speed before colision');
                        // logMsg(this.speed);
                        let t = 0;
                        if (paddleCollided.collisionTime > 0) {
                            newPX = this.style.left + this.speed.x * paddleCollided.collisionTime;
                            newPY = this.style.top + this.speed.y * paddleCollided.collisionTime;
                            t = 1 / this.fps - paddleCollided.collisionTime;
                            // logMsg('new x,y: (' + newPX +', ' + newPY + ')');
                        }
                        if (paddleCollided.location === LOCATION.TOP_LEFT) {
                            this.cornerCollision(this.style.left + this.radius - paddle.style.left, this.style.top + this.radius - paddle.paddleY);
                        }
                        else {
                            this.cornerCollision(this.style.left + this.radius - paddle.style.left - paddle.style.width, this.style.top + this.radius - paddle.paddleY);
                        }
                        
                        // logMsg('speed after colision');
                        // logMsg(this.speed);
                        if (t > 0) {
                            newPX += this.speed.x * t;
                            newPY += this.speed.y * t;
                        }
                    }
                    gameField.playSound('paddle');
                }
                else {
                    let ball = this;
                    let brickHp = 99;
                    let hit = gameField.wordsArranged.some(function(row, rowId, arr){
                        let rowTop = row.prop.top;
                        if (newPY + ball.width >= rowTop && newPY <= rowTop + row.prop.height) {
                            return row.children.some(function(word, wordId){
                                if (word.hp > 0) {
                                    let brickCollided = ball.detectCollisionWithBrick(newPX, newPY, rowTop, word);
                                    if (brickCollided.rebound) {
                                        if (brickCollided.type === COLLISION_TYPE.EDGE) {
                                            switch (brickCollided.location) {
                                                case LOCATION.TOP:
                                                    newPY -= 2 * (rowTop - newPY - ball.width);
                                                    ball.speed.y = - ball.speed.y;
                                                    break;
                                                case LOCATION.BOTTOM:
                                                    newPY += 2 * (rowTop + word.height - newPY);
                                                    ball.speed.y = - ball.speed.y;
                                                    break;
                                                case LOCATION.LEFT:
                                                    newPX -= 2 * (newPX + ball.width - word.style.left);
                                                    ball.speed.x = -ball.speed.x;
                                                    break;
                                                case LOCATION.RIGHT:
                                                    newPX += 2 * (word.style.left + word.width - newPX);
                                                    ball.speed.x = -ball.speed.x;
                                                    break;
                                            }
                                        }
                                        else {
                                            let t = 0;
                                            if (brickCollided.collisionTime > 0) {
                                                newPX = ball.style.left + ball.speed.x * brickCollided.collisionTime;
                                                newPY = ball.style.top + ball.speed.y * brickCollided.collisionTime;
                                                t = 1 / ball.fps - brickCollided.collisionTime;
                                            }
                                            switch (brickCollided.location) {
                                                case LOCATION.TOP_LEFT:
                                                    ball.cornerCollision(ball.style.left + ball.radius - word.style.left, ball.style.top + ball.radius - rowTop);
                                                    break;
                                                case LOCATION.TOP_RIGHT:
                                                    ball.cornerCollision(ball.style.left + ball.radius - word.style.left - word.width, ball.style.top + ball.radius - rowTop);
                                                    break;
                                                case LOCATION.BOTTOM_LEFT:
                                                    ball.cornerCollision(ball.style.left + ball.radius - word.style.left, ball.style.top + ball.radius - rowTop - word.height);
                                                    break;
                                                case LOCATION.BOTTOM_RIGHT:
                                                    ball.cornerCollision(ball.style.left + ball.radius - word.style.left - word.width, ball.style.top + ball.radius - rowTop - word.height);
                                                    break;
                                            }
                                            if (t > 0) {
                                                newPX += ball.speed.x * t;
                                                newPY += ball.speed.y * t;
                                            }
                                        }
                                        // logMsg('speed after colision');
                                        // logMsg(ball.speed);
                                        // logMsg('updated x,y: (' + newPX +', ' + newPY + ')');
                                        // logMsg('-----------------------------------');
                                        brickHp = --arr[rowId].children[wordId].hp;
                                        return true;
                                    }
                                }
                            });
                        }
                    });
                    if (hit) {
                        this.$root.$refs.scoreBoard.addScore(10);
                        if (brickHp < 1) {
                            gameField.playSound('brick2');
                            let allCleard = gameField.clearOneBrick();
                            if (allCleard) {
                                gameField.gameFinished(true);
                                return;
                            }
                        } else {
                            gameField.playSound('brick1');
                        }
                    }
                }
                if (newPX < 0) {
                    //bounce back
                    newPX = Math.abs(newPX);
                    this.speed.x = -this.speed.x;
                    gameField.playSound('wall');
                } else if (newPX > fieldWidth - this.width) {
                    //bounce back
                    newPX -= newPX + this.width - fieldWidth;
                    this.speed.x = -this.speed.x;
                    gameField.playSound('wall');
                }
                if (newPY < 0) {
                    //bounce back
                    newPY = Math.abs(newPY);
                    this.speed.y = -this.speed.y;
                    gameField.playSound('wall');
                } else if (newPY > fieldHeight - this.width) {
                    //game over
                    this.dead = true;
                    clearTimeout(this.timeoutPointer);
                    gameField.playSound('lose');
                    if (lifePanel.decrease()) {
                        this.relocate();
                    } else {
                        gameField.gameFinished();
                    }
                    return;
                }
                this.style.left = newPX;
                this.style.top = newPY;
                // logMsg('m updated position: (' + newPX.toFixed(2) +', ' + newPY.toFixed(2) +')');
                // logMsg('------****--------');
                this.timeoutPointer = setTimeout(this.move, this.frameDuration);
            },
            stop() {
                clearTimeout(this.timeoutPointer);
            },
            shot() {
                if (this.attached) {
                    this.attached = false;
                    let paddleSpeed = paddle.getSpeed();
                    this.speed.x = this.originalSpeed.x + paddleSpeed;
                    let position = paddle.getCenterPosition();
                    if (position.left < fieldWidth / 2) {
                        this.speed.x = -this.originalSpeed.x + paddleSpeed;
                    }
                    this.speed.y = this.originalSpeed.y;
                    this.move();
                }
            },
            updateAttachedPosition (x, y) {
                if (this.attached) {
                    this.style.left = (x - 16 /2);
                    this.style.top = (y - 16 - 1);
                }
            },
            detectCollisionWithPaddle(x, y, paddle){
                let paddleSty = paddle.getStyle();
                let withinXRange = ((x + this.width >= paddleSty.left) && (x <= paddleSty.left + paddleSty.width));
                let rebound = false;
                let type = COLLISION_TYPE.EDGE;//edge, corner
                let collisionTime = 0;
                let location = -1;
                if (y + this.width >= paddle.paddleY && withinXRange) {
                    rebound = true;
                    if (x + this.radius > paddleSty.left && x + this.radius < paddleSty.left + paddleSty.width) {
                        location = LOCATION.TOP;
                    }
                    else if (y + this.radius > paddle.paddleY  && y + this.radius <  fieldHeight) {
                        if (x < paddleSty.left) {
                            location = LOCATION.LEFT;
                        } else {
                            location = LOCATION.RIGHT;
                        }
                    }
                    else {
                        type = COLLISION_TYPE.CORNER;
                        let dYSqr = (paddle.paddleY - (y + this.radius)) ** 2;
                        let oriDYSqr = (paddle.paddleY - (this.style.top + this.radius)) ** 2;
                        let d = ((x + this.radius) - (paddleSty.left + paddleSty.width)) ** 2 + dYSqr;
                        let originalD = ((this.style.left + this.radius) - (paddleSty.left + paddleSty.width)) ** 2 + oriDYSqr;
                        location = LOCATION.TOP_RIGHT;
                        if (x < paddleSty.left) {
                            //top left corner
                            location = LOCATION.TOP_LEFT;
                            d = (paddleSty.left - (x + this.radius)) ** 2 + dYSqr;
                            originalD = ((this.style.left + this.radius) - paddleSty.left) ** 2 + oriDYSqr;
                        }
                        if (d < this.radius ** 2) {
                            // logMsg('originalD: ' + originalD);
                            collisionTime = (Math.sqrt(originalD) - this.radius) / Math.sqrt(this.speed.x ** 2 + this.speed.y ** 2);
                            // logMsg('collisionT: ' + collisionTime);
                        }
                    }
                }
                let result = {
                    rebound: rebound,
                    type: type,
                    location: location
                }
                if (collisionTime > 0) {
                    result.collisionTime = collisionTime;
                }
                return result;
            },
            detectCollisionWithBrick(x, y, rowTop, brick) {
                let brickSty = brick.style;
                let withinXRange = ((x + this.width >= brickSty.left) && (x <= brickSty.left + brick.width));
                let withinYRange = (y >= rowTop - this.width && y <= rowTop + brick.height);
                let rebound = false;
                // logMsg('withinXRange: ' + withinXRange + ', withinYRange: ' + withinYRange);
                let type = "";//edge, corner
                let collisionTime = 0;
                let location = "";
                if (withinYRange && withinXRange) {
                    rebound = true;
                    let topOrBottom = (x + this.radius > brickSty.left && x + this.radius < brickSty.left + brick.width);
                    let leftOrRight = (y + this.radius > rowTop && y + this.radius < rowTop + brick.height);
                    if (topOrBottom || leftOrRight) {
                        type = COLLISION_TYPE.EDGE;
                        if (topOrBottom) {
                            if (y < rowTop) {
                                location = LOCATION.TOP;
                                // logMsg('at TOP')
                            } else {
                                location = LOCATION.BOTTOM;
                                // logMsg('updated position: (' + x.toFixed(2) +', ' + y.toFixed(2) +')');
                                // logMsg('origin position: (' + this.style.left.toFixed(2) +', ' + this.style.top.toFixed(2) +')');
                                // logMsg('brick position: (' + brickSty.left +', ' + rowTop +'), ' 
                                // + '(' + brickSty.left +', ' + (rowTop + brick.height).toFixed(2) +'), '
                                // + '(' + (brickSty.left + brick.width).toFixed(2) +', ' + rowTop +'), ' 
                                // + '(' + (brickSty.left + brick.width).toFixed(2) +', ' + (rowTop + brick.height).toFixed(2) +'), ');
                                // logMsg('at BOTTOM')
                            }
                        }
                        else if (leftOrRight) {
                            if (x < brickSty.left) {
                                location = LOCATION.LEFT;
                                // logMsg('at LEFT')
                            } else {
                                location = LOCATION.RIGHT;
                                // logMsg('at RIGHT')
                            }
                        }
                    } else {
                        type = COLLISION_TYPE.CORNER;
                        let topDYSqr = (rowTop - (y + this.radius)) ** 2;
                        let bottomDYSqr = (rowTop + brick.height - (y + this.radius)) ** 2;
                        let leftDXSqr = (brickSty.left - (x + this.radius)) ** 2;
                        let rightDXSqr = ((x + this.radius) - (brickSty.left + brick.width)) ** 2;
                        let oriTopDYSqr = (rowTop - (this.style.top + this.radius)) ** 2;
                        let oriBottomDYSqr = (rowTop + brick.height - (this.style.top + this.radius)) ** 2;
                        let oriLeftDXSqr = (brickSty.left - (this.style.left + this.radius)) ** 2;
                        let oriRightDXSqr = ((this.style.left + this.radius) - (brickSty.left + brick.width)) ** 2;
                        let d = 0;
                        let originalD = 0;
                        if (x < brickSty.left) {
                            if (y < rowTop) {
                                //top left corner
                                location = LOCATION.TOP_LEFT;
                                d = leftDXSqr + topDYSqr;
                                originalD = oriLeftDXSqr + oriTopDYSqr;
                            } else {
                                //bottom left corner
                                location = LOCATION.BOTTOM_LEFT;
                                d = leftDXSqr + bottomDYSqr;
                                originalD = oriLeftDXSqr + oriBottomDYSqr;
                            }
                        }
                        else {
                            if (y < rowTop) {
                                //top right corner
                                location = LOCATION.TOP_RIGHT;
                                d = rightDXSqr + topDYSqr;
                                originalD = oriRightDXSqr + oriTopDYSqr;
                            } else {
                                //bottom right corner
                                location = LOCATION.BOTTOM_RIGHT;
                                d = rightDXSqr + bottomDYSqr;
                                originalD = oriRightDXSqr + oriBottomDYSqr;
                            }
                        }
                        if (d < this.radius ** 2) {
                            collisionTime = (Math.sqrt(originalD) - this.radius) / Math.sqrt(this.speed.x ** 2 + this.speed.y ** 2);
                        }
                    }
                }
                let result = {
                    rebound: rebound,
                    type: type,
                    location: location
                }
                if (collisionTime > 0) {
                    result.collisionTime = collisionTime;
                }
                return result;
            },
            cornerCollision(dx, dy) {
                let c = - (2 * this.speed.x * dx + 2 * this.speed.y * dy) / (dx**2 + dy**2);
                this.speed.x += c * dx;
                this.speed.y += c * dy;
                //https://gamedev.stackexchange.com/questions/10911/a-ball-hits-the-corner-where-will-it-deflect
                // c = -(2 * oDx * x + 2 * oDy * y) / (x^2 + y^2)
                // nDx = oDx + c * x
                // nDy = oDy + c * y
            },
            init(x, y){
                this.attached = true;
                this.updateAttachedPosition(x, y);
                this.dead = false;
            },
            
            relocate() {
                clearTimeout(this.timeoutPointer);
                let position = paddle.getCenterPosition();
                // this.init(position.left, position.top);
                this.attached = true;
                this.updateAttachedPosition(position.left, position.top);
                this.dead = false;
            }
        },
        created() {
            this.frameDuration = 1000 / this.fps;
            this.width = this.radius * 2;
        },
        mounted() {
            gameField = this.$parent;
            fieldWidth = gameField.width;
            fieldHeight = gameField.height;
            lifePanel = this.$root.$refs.lifePanel;
            paddle = gameField.$refs.paddle;
        }
    }
</script>

<template>
    <span v-show="!dead" class="ball" :style="{left: style.left + 'px', top: style.top + 'px'}"></span>
</template>

<style lang="scss">
    .ball {
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 8px;
        left: 50px;
        top: 30px;
        background-color:white;
        border: solid 1px #0b0b0b
    }
</style>