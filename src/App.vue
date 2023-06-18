<script>
import GameField from './components/GameField.vue';
import ScoreBoard from './components/ScoreBoard.vue';
// import LogArea from './components/LogArea.vue';
import LifePanel from './components/LifePanel.vue';
import Popup from './components/Popup.vue';
// import PopupConfig from './components/PopupConfig.vue';

let popupLayer1 = null;
let popupLayer2 = null;

export default {
    components: {
        GameField,
        ScoreBoard,
        // LogArea,
        LifePanel,
        Popup
    },
    data() {
        return {
            fieldWidth: 600,
            fieldHeight: 750,
            gameCleared: false,
            mute: false
        };
    },
    mounted() {
        //this.$refs.scoreBoard.addScore(10);
        // this.$refs.logArea.logMsg("Test log.");
        // let THIS = this;
        // window.logMsg = function(msg) {
        //     THIS.$refs.logArea.logMsg(msg);
        // }
        popupLayer1 = this.$refs.popupLayer1;
        popupLayer2 = this.$refs.popupLayer2;
    },
    methods: {
        showLosePopup() {
            popupLayer1.updateType("lose").show();
        },

        restartBtnCallback() {
            this.$refs.GameField.updateParagraph({});
            popupLayer1.hide();
            this.$refs.GameField.restart();
        },

        showWinPopup() {
            popupLayer1.updateType("win").show();
        },

        showConfigPopup() {
            popupLayer2.updateType("paragraphConfig").show();
        },

        updateParagrapConfigCallback() {
            this.$refs.GameField.updateParagraph(popupLayer2.getNewParagraph());
            popupLayer2.hide();
        },

        restoreParagrapConfigCallback() {
            this.$refs.GameField.resotreParagraph();
            popupLayer2.hide();
        },

        useParaPatCallback(val) {
            if (this.gameCleared) {
                this.$refs.GameField.useParagraphPattern(val);
            }
        },

        updateThemeCallback(val) {
            this.$refs.GameField.updateTheme(val);
        },

        updatePaddlePhyCoefCallback(val) {
            this.$refs.GameField.updatePaddlePhyCoef(val);
        },

        showGameSettingPopup() {
            popupLayer1.updateType('gameSetting').show();
        },

        gameClear() {
            this.gameCleared = true;
            popupLayer1.unlockExtraSetting();
            popupLayer2.unlockExtraSetting();
        },

        toggleBrickContCallback(val) {
            if (this.gameCleared) {
                this.$refs.GameField.updateBrickContentVisibility(!!val);
            }
        },

        toggleSound() {
            this.mute = !this.mute;
        }
    },
    created() {
        this.popupCallbacks = {
            "lose": [
                this.restartBtnCallback
            ],
            "win": [
                this.restartBtnCallback
            ],
            "paragraphConfig": [
                this.updateParagrapConfigCallback
            ]
        };
        this.popupCloseCallback = {
            "paragraphConfig": null
        };
        this.popupOtherCallback = {
            "gameSetting": {
                'openParaConfig': this.showConfigPopup,
                'updateTheme': this.updateThemeCallback,
                'restoreParaConfig': this.restoreParagrapConfigCallback,
                'updatePaddlePhyCoef': this.updatePaddlePhyCoefCallback,
                'useParaPat': this.useParaPatCallback,
                'toggleBrickCont': this.toggleBrickContCallback,
            }
        }
    }
}
</script>

<template>
    <div class="main">
        <div class="topArea">
            <div class="left">
                <LifePanel ref="lifePanel"></LifePanel>
                <ScoreBoard ref="scoreBoard"></ScoreBoard>
            </div>
            <div class="right">
                <div :class="{sound: true, mute: mute}" title="Sound setting" @click="toggleSound"></div>
                <div class="gameConfig" title="Game settings" @click="showGameSettingPopup">⚙️</div>
            </div>
        </div>
        <div class="bottomArea">
            <GameField ref="GameField" :width="fieldWidth" :height="fieldHeight"></GameField>
        </div>
        <!-- <LogArea ref="logArea"></LogArea> -->
    </div>
    <Popup ref="popupLayer1" :callbacks="popupCallbacks" :closeCallback="popupCloseCallback" :otherCallback="popupOtherCallback"></Popup>
    <Popup ref="popupLayer2" :callbacks="popupCallbacks" :closeCallback="popupCloseCallback" :otherCallback="null"></Popup>
</template>

<style lang="scss">
$max-win-width: v-bind("fieldWidth + 10 + 'px'");

.main {
    width: $max-win-width;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    user-select: none;

    .topArea {
        padding: 5px;

        .left {
            display: inline-block;
        }

        .right {
            display: inline-block;
            float: right;
            padding: 5px;

            >* {
                display: inline-block;
                font-size: 26px;
                cursor: pointer;
            }

            >:not(:first-child) {
                padding-left: 5px;
            }

            .sound {
                &::before {
                    content: "🔊";
                }

                &.mute::before {
                    content: "🔇";
                }
            }

            .gameConfig {
                &:hover{
                    animation:spin 2s linear infinite;
                    transform-origin: 56% 54%;//50% 55%;
                }

                @keyframes spin {
                    25% { transform:rotate(90deg); } 
                    75% { transform:rotate(270deg); }
                    100% { transform:rotate(360deg); } 
                }
            }
        }
    }
}

@media screen and (max-width: 620px) {
    .main {
        left: 5px;
        transform: translateX(0%);
    }
}
</style>