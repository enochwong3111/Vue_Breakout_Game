<script>
export default {
    lose: {
        setting: {
            title: true,
            buttonsNum: 1,
            body: true,
            close: false,
            width: 500,
        },
        content: {
            title: {
                "en_GB": "You Lose",
            },
            remark: {
                "en_GB": "Too difficult?<br> Don't worry! You can change the paragraph content to a shorter one, or lower the paddle physical coefficient in the game setting."
            },
            buttons: [
                {
                    "en_GB": "Restart"//&#9166;
                }
            ],
        },
    },
    win: {
        setting: {
            title: true,
            buttonsNum: 1,
            body: true,
            close: false,
            width: 300,
        },
        content: {
            title: {
                "en_GB": "You Win",
            },
            remark: {
                "en_GB": "Thanks for playing! New functions unlock in the game setting."
            },
            buttons: [
                {
                    "en_GB": "Play again"
                }
            ],
        },
    },
    gameSetting: {
        setting: {
            title: true,
            buttonsNum: 0,
            body: true,
            close: true,
            width: 600,
        },
        content: {
            title: {
                "en_GB": "Game Setting",
            },
            paddlePhyCoef: {
                "en_GB": "Paddle physical coefficient:",
            },
            paraConfig: {
                "en_GB": "Paragraph content config:"
            },
            theme: {
                "en_GB": "Use theme:"
            },
            paraConfigChange: {
                "en_GB": "Change"
            },
            paraConfigRestore: {
                "en_GB": "Restore"
            },
            paraConfigPat1: {
                "en_GB": "Pattern 1"
            },
            paraConfigPat2: {
                "en_GB": "Pattern 2"
            },
            blickContent: {
                "en_GB": "Brick content:"
            },
            show: {
                "en_GB": "Show",
            },
            hide: {
                "en_GB": "Hide",
            }
        },
    },
    paragraphConfig: {
        setting: {
            title: true,
            buttonsNum: 1,
            body: true,
            close: true,
            width: 800,
        },
        content: {
            title: {
                "en_GB": "Change Paragraph",
            },
            buttons: [
                {
                    "en_GB": "Update"
                }
            ],
        },
    }
}
</script>