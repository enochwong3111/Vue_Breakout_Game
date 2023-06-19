<script>
    let gameField = null;
    export default {
        props: ['fieldWidth'],
        data(){
            return {
                style: {
                    left: 0,
                    width: 66
                },
                fps: 200, //frameDuration: 5,
                maxSpeed: 600, // px per second
                timeoutPointer: null,
                speed: 0,
                physicalCoefficient: 0.3
            }
        },
        methods: {
            move(event) {
                clearTimeout(this.timeoutPointer);
                let offsetX = gameField.getBoundingClientRect().x;
                let mouseX = event.clientX - offsetX;
                let dx = this.style.width / 2;
                let newPX = mouseX - dx;
                let maxPx = this.fieldWidth - dx;
                let moveDistance = this.maxSpeed / this.fps;
                if (newPX < 0) {
                    newPX = 0;
                } else if (mouseX > maxPx) {
                    newPX = maxPx - dx;
                }
                let oldPx = this.style.left;
                let paddle = this;
                if (Math.abs(newPX - this.style.left) < moveDistance) {
                    this.style.left = newPX;
                    let ballCenX = newPX + dx;
                    this.$parent.$refs.balls.forEach(function(ball){
                        ball.updateAttachedPosition(ballCenX, paddle.paddleY);
                    });
                    this.speed = (newPX - oldPx) / this.frameDuration;
                    this.timeoutPointer = setTimeout(function(){
                        paddle.speed = 0;
                    }, paddle.frameDuration);
                } else {
                    if (newPX < this.style.left) {
                        this.style.left -= moveDistance;
                        this.speed = -this.maxSpeed;
                    } else {
                        this.style.left += moveDistance;
                        this.speed = this.maxSpeed;
                    }
                    let ballCenX = this.style.left + dx;
                    this.$parent.$refs.balls.forEach(function(ball){
                        ball.updateAttachedPosition(ballCenX, paddle.paddleY);
                    });
                    this.timeoutPointer = setTimeout(function(){
                        paddle.move(event);
                    }, paddle.frameDuration);
                }
            },
            getStyle() {
                return {
                    left: this.style.left,
                    width: this.style.width
                }
            },
            getCenterPosition() {
                return {
                    left: this.style.left + this.style.width / 2,
                    top: this.paddleY
                }
            },
            getSpeed() {
                return this.physicalCoefficient * this.speed;
            },
            updatePhysicalCoefficient(val) {
                this.physicalCoefficient = val;
            }
        },
        created() {
            this.frameDuration = 1000 / this.fps;
            this.style.left = this.fieldWidth / 2 - this.style.width / 2;
            this.paddleY = this.$parent.height - 15;
        },
        mounted() {
            let paddle = this;
            let ballCenX = this.style.left + this.style.width / 2;
            this.$parent.$refs.balls.forEach(function(ball){
                ball.updateAttachedPosition(ballCenX, paddle.paddleY);
            });
            gameField = this.$parent.$refs.gameField;
        }
    }
</script>

<template>
    <span class="paddle" :style="{left: style.left +'px', width: style.width + 'px'}"></span>
</template>

<style lang="scss">
    .paddle {
        position: absolute;
        bottom: 0px;
        width: 65px;
        height: 15px;
        background-color: sienna;
    }
</style>