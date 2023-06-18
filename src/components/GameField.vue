<script>
import Brick from './Brick.vue';
import Paddle from './Paddle.vue';
import Ball from './Ball.vue';
import Paragraph from './Paragraph.vue';
import { useSound } from '@vueuse/sound'
import gameSfx from '../../assets/sounds/gameSfx.wav';
// Sound Effect from mixkit: https://mixkit.co/free-sound-effects/

let lifePanel = null;
export default {
    setup() {
        const { play } = useSound(gameSfx, {
            sprite: {
                wall: [0, 362],
                paddle: [363, 154],
                brick1: [518, 281],
                brick2: [800, 360],
                lose: [1161, 655],
            },
        });
        return {
            play,
        }
    },
    components: {
        Brick,
        Paddle,
        Ball
    },
    props: ['width', 'height'],
    data() {
        return {
            words: [],
            offsetX: 0,
            wordMargin: 3,
            colorScheme: '0',
            reArranged: false,
            wordsArranged: [],
            balls: {
                index: 1,
                children: {
                    'ball0': 1
                }
            },
            paragraph: {
                content: Paragraph.default.content,
                src: Paragraph.default.src
            },
            hideBrickContent: false,
            mute: false
        };
    },
    methods: {
        getWords() {
            this.words = this.paragraph.content.trim().replace(/\n+/g, ' ').replace(/\s+/g, ' ').split(' ');
            if (this.paragraph.src) {
                this.words.push('Source: ' + this.paragraph.src.trim().replace(/(\n+|\s+)/g, '_'));
            }
        },

        reArrangeBricks() {
            let rowInfo = {
                prop: {
                    itemOffsetX: 0,
                    style: {},
                    top: 2
                },
                children: []
            };
            let lastPY = -1;
            let field = this;
            let childIndex = 0;
            let totalWidth = 0;
            let wordsArranged = [];
            let tmpTop = 2;
            Array.from(this.$refs.tmpGameField.children).forEach(function (word) {
                let brickInfo = word.getBoundingClientRect();
                //{"x":0,"y":0,"width":0,"height":0,"top":0,"right":0,"bottom":0,"left":0}
                if (brickInfo.top > field.height * 0.8) {
                    return;
                }
                if (lastPY < 0 || lastPY !== brickInfo.top) {
                    let newRow = false;
                    if (lastPY > 0 && lastPY !== brickInfo.top) {
                        rowInfo.prop.totalWidth = totalWidth;
                        rowInfo.prop.itemOffsetX = parseFloat(((field.width - totalWidth - field.wordMargin * 2) / (rowInfo.children.length - 1)).toFixed(2));
                        wordsArranged.push(rowInfo);
                        rowInfo = {
                            prop: {},
                            children: []
                        };
                        newRow = true;
                    }
                    lastPY = brickInfo.top;
                    rowInfo.prop.height = parseFloat((brickInfo.height + field.wordMargin * 2).toFixed(2));
                    if (newRow) {
                        tmpTop += 2 + rowInfo.prop.height;
                        rowInfo.prop.top = tmpTop;
                    }
                    totalWidth = parseFloat(brickInfo.width.toFixed(2));
                }
                else {
                    totalWidth += parseFloat(brickInfo.width.toFixed(2));
                }
                let tmpWord = {
                    content: word.innerText,
                    hp: parseInt(Math.random() * 100) % 4 + 1,
                    width: brickInfo.width,
                    index: childIndex++,
                    height: brickInfo.height
                };
                rowInfo.children.push(tmpWord);
            });
            rowInfo.prop.itemOffsetX = parseFloat(((field.width - totalWidth - field.wordMargin * 2) / (rowInfo.children.length - 1)).toFixed(2));
            rowInfo.prop.totalWidth = totalWidth;
            wordsArranged.push(rowInfo);
            wordsArranged.forEach(function (row, rIndex) {
                let rowRef = wordsArranged[rIndex];
                let nextPX = field.wordMargin;
                row.children.forEach(function (word, wIndex) {
                    let wordRef = rowRef.children[wIndex];
                    wordRef.style = {
                        left: nextPX
                    };
                    nextPX += word.width + row.prop.itemOffsetX;
                });
            });
            // logMsg(wordsArranged);
            this.wordsArranged = wordsArranged;
        },

        updateParagraph(paragraph) {
            if (paragraph.content && paragraph.content.trim().replace(/\n+/g, ' ').replace(/\s+/g, ' ').length > 0) {
                this.paragraph.content = paragraph.content;
                this.paragraph.src = paragraph.src;
            }
            this.reArranged = false;
            this.getWords();
            this.restart();
        },

        resotreParagraph() {
            this.paragraph.content = Paragraph.default.content;
            this.paragraph.src = Paragraph.default.src;
            this.reArranged = false;
            this.getWords();
            this.restart();
        },

        useParagraphPattern(val) {
            this.paragraph.content = Paragraph['pattern' + val].content;
            this.paragraph.src = Paragraph['pattern' + val].src;
            this.reArranged = false;
            this.getWords();
            this.restart();
        },

        addBall() {
            let id = this.balls.index++;
            this.balls.children['ball' + id] = 1;
        },

        shotBalls() {
            this.$refs.balls.forEach(function (ball) {
                if (ball.attached) {
                    ball.shot();
                }
            });
        },

        stopBalls() {
            this.$refs.balls.forEach(function (ball) {
                ball.stop();
            });
        },

        gameFinished(win=false) {
            if (win) {
                this.$root.showWinPopup();
                this.$root.gameClear();
            } else {
                this.$root.showLosePopup();
            }
        },

        restart() {
            this.$refs.balls.forEach(function (ball) {
                ball.relocate();
            });
            lifePanel.restore();
            this.$root.$refs.scoreBoard.clear();
        },

        clearOneBrick() {
            this.brickCleared++;
            return (this.brickCleared == this.words.length);
        },

        updateTheme(val) {
            this.colorScheme = val;
        },

        updatePaddlePhyCoef(val) {
            this.$refs.paddle.updatePhysicalCoefficient(val);
        },

        updateBrickContentVisibility(val) {
            this.hideBrickContent = val;
        },
            
        playSound(id) {
            if (!this.$root.mute) {
                this.play({id: id});
            }
        }
    },
    mounted() {
        this.getWords();
        let fieldBox = this.$refs.gameField.getBoundingClientRect();
        this.offsetX = fieldBox.x;
        this.offsetY = fieldBox.y;
        lifePanel = this.$root.$refs.lifePanel;
    },
    updated() {
        this.$nextTick(() => {
            if (this.reArranged) {
                return;
            }
            this.reArrangeBricks();
            this.reArranged = true;
            this.brickCleared = 0;
        })
    }
}
</script>

<template>
    <div v-show="!reArranged" ref="tmpGameField" class="gameField">
        <span class="tmpBrick" v-for="(word, index) in words" :key="index">{{ word }}</span>
    </div>
    <div v-show="reArranged" ref="gameField" :class="{gameField:true, hideContent:hideBrickContent}" :color-scheme="colorScheme" @mousemove="this.$refs.paddle.move($event)"
        @click="shotBalls($event)">
        <div class="brickRow" v-for="(row, index) in wordsArranged" :key="index" :row-number="index"
            :style="{ height: row.prop.height + 'px' }">
            <Brick ref="brick" v-for="word in row.children" :key="word.index" :healthPoint="word.hp" :content="word.content"
                :wStyle="word.style"></Brick>
        </div>
        <Ball v-for="(ball, ballId) in balls.children" :key="ballId" ref="balls"></Ball>
        <Paddle ref="paddle" :fieldWidth="width"></Paddle>
    </div>
</template>

<style lang="scss" scoped>
%brick-shared {
    font-size: small;
    font-family: 'Times New Roman', Times, serif;
    padding: 5px;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: v-bind("width * 0.6 + 'px'");
}

.gameField {
    border: solid 1px brown;
    position: absolute;
    width: v-bind("width + 'px'");
    height: v-bind("height + 'px'");

    span {
        &.tmpBrick {
            margin: 2px;
            border: solid 1px black;
        }
        &.tmpBrick, &.blick {
            @extend %brick-shared;
        }
    }

    .brickRow {
        margin-top: 2px;
    }
}
</style>