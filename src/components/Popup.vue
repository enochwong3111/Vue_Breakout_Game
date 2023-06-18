<script>

import PopupConfig from './PopupConfig.vue';

export default {
    props: ['callbacks', 'closeCallback', 'otherCallback'],
    data() {
        return {
            lang: "en_GB",
            visible: false,
            type: "win",
            popupClasses: {
                "popup": true,
            },
            popupWidth: 800,
            gameSetting: {
                enableExtra: false,
                theme: '0',
                themes: [
                    {name: "1", val: '0'},
                    {name: "2", val: '1'},
                ],
                coef: 0.8,
                coefs: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
                blickContVisibility: '0',
                paragraphInput: '',
                srcInput: ''
            },
        };
    },
    created() {
        this.config = PopupConfig[this.type];
    },
    methods: {
        show() {
            this.visible = true;
        },

        hide(fromBgClick = false) {
            if (fromBgClick) {
                if (!this.config.setting.close) {
                    return;
                }
            }
            this.visible = false;
            if (this.popupCloseCallback && this.popupCloseCallback[this.type]) {
                this.popupCloseCallback[this.type]();
            }
        },

        updateType(val) {
            this.type = val;
            this.config = PopupConfig[this.type];
            if (this.config.setting.width) {
                this.popupWidth = this.config.setting.width;
            }
            return this;
        },

        getNewParagraph() {
            this.gameSetting.paragraphInput = this.gameSetting.paragraphInput.trim();
            this.gameSetting.srcInput = this.gameSetting.srcInput.trim();
            return {
                content: this.gameSetting.paragraphInput,
                src: this.gameSetting.srcInput
            };
        },

        unlockExtraSetting() {
            this.gameSetting.enableExtra = true;
        }
    },
    mount() {
    }
}
</script>

<template>
    <div v-show="visible" class="popupBackground" @click="hide(true)"></div>
    <div v-show="visible" :class="popupClasses">
        <div class="head">
            <div v-show="config.setting.title" class="title">{{ config.content.title[lang] }}</div>
            <div class="right">
                <span class="closeBtn" v-show="config.setting.close" @click="hide()">❌</span>
            </div>
        </div>
        <template v-if="type === 'paragraphConfig'">
            <div v-show="config.setting.body" class="body paragraphConfig">
                <div>Content: </div>
                <textarea class="paragraphInput" v-model="gameSetting.paragraphInput" v-if="type === 'paragraphConfig'"></textarea>
                <div>Source: </div>
                <input class="srcInput" type="text" v-model="gameSetting.srcInput">
            </div>
        </template>
        <template v-else-if="type === 'gameSetting'">
            <div v-show="config.setting.body" class="body gameSetting">
                <div class="toggle">
                    <span>{{ config.content.paddlePhyCoef[lang] }}</span>
                    <select v-model="gameSetting.coef" @change="otherCallback[type].updatePaddlePhyCoef(parseFloat($event.target.value))">
                        <option v-for="(value, index) in gameSetting.coefs" :key="index" :value="value">{{ value }}</option>
                    </select>
                </div>
                <div>
                    <span>{{ config.content.theme[lang] }}</span>
                    <select v-model="gameSetting.theme" @change="otherCallback[type].updateTheme(parseInt($event.target.value))">
                        <option v-for="{name, val} in gameSetting.themes" :key="val" :value="val">{{ name }}</option>
                    </select>
                </div>
                <div :class="{lock:!gameSetting.enableExtra}">
                    <span>{{ config.content.paraConfig[lang] }}</span>
                    <button class="configBtn" @click="otherCallback[type].openParaConfig">{{ config.content.paraConfigChange[lang] }}</button>
                    <button class="configBtn" @click="otherCallback[type].restoreParaConfig">{{ config.content.paraConfigRestore[lang] }}</button>
                    <button class="configBtn" :disabled="!gameSetting.enableExtra" @click="otherCallback[type].useParaPat(0)">{{ config.content.paraConfigPat1[lang] }}</button>
                    <button class="configBtn" :disabled="!gameSetting.enableExtra" @click="otherCallback[type].useParaPat(1)">{{ config.content.paraConfigPat2[lang] }}</button>
                </div>
                <div :class="{lock:!gameSetting.enableExtra}">
                    <span>{{ config.content.blickContent[lang] }}</span>
                    <select :disabled="!gameSetting.enableExtra" v-model="gameSetting.blickContVisibility" @change="otherCallback[type].toggleBrickCont(parseInt($event.target.value))">
                        <option value="0">{{ config.content.show[lang] }}</option>
                        <option value="1">{{ config.content.hide[lang] }}</option>
                    </select>
                </div>
            </div>
        </template>
        <div class="foot" v-show="config.setting.buttonsNum > 0">
            <div class="buttonPanel">
                <div class="button" v-for="(button, index) in config.content.buttons" :key="index" @click="callbacks[type][index]">{{ button[lang] }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.popupBackground {
    width: 100%;
    height: 100%;
    background-color: rgba(226, 224, 224, 0.274);
    position: absolute;
    top: 0px;
    left: 0px;
    min-width: 620px;
    min-height: 820px;
}

.popup {
    position: absolute;
    background: #f9f9f9;
    border-radius: 5px;
    padding: 5px;
    border: solid 2px #c3c3d7;
    width: v-bind("popupWidth + 'px'");
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &.w-300 {
        width: 300px;
    }

    .head {
        padding: 5px;

        .right {
            float: right;
            position: absolute;
            top: 0px;
            right: 0px;
            padding: 5px;

            .closeBtn {
                cursor: pointer;
            }
        }

        .title {
            font-size: 30px;
            color: sienna;
            text-align: center;
        }
    }

    .body {
        padding: 5px;

        &.paragraphConfig {
            .paragraphInput {
                resize: none;
                width: 99%;
                height: 400px;
                border: solid 1px;
                border-radius: 10px;
                font-size: 20px;
            }

            .srcInput {
                width: 99%;
                border: solid 1px;
                border-radius: 3px;
                font-size: medium;
            }
        }

        &.gameSetting {
            >*{
                padding: 10px;

                >:not(:first-child) {
                    margin-left: 5px;
                }

                select {
                    border: solid 1px grey;
                    border-radius: 5px;
                }
            }

            .lock::after {
                content: " 🔒";
            }
        }
        
    }

    .foot {
        padding: 5px;

        .buttonPanel {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            width: max-content;

            .button {
                display: inline-block;
                text-align: center;
                border: solid;
                padding: 5px;
                margin-bottom: 5px;
                border-width: 2px;
                color: cornflowerblue;
                border-radius: 16px;
                margin-top: 0px;
                font-weight: bolder;
                width: 88px;
                position: relative;
                background-color: white;
                cursor: pointer;
                box-shadow: 0 5px #999;

                &:active {
                    background-color: #eaeae9;
                    box-shadow: 0 2px #666;
                    transform: translateY(4px);
                }

                &:hover {
                    color: #1969f9;
                }
            }

            .button:not(:first-child) {
                margin-left: 10px;
            }
        }
    }
}

@media screen and (max-width: 620px) {
    .popup {
        left: 5px;
        transform: translate(0%, -50%);
    }
}
</style>