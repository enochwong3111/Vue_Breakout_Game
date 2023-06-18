<script>
export default {
    data() {
        return {
            log: "",
            title: "Test log area:"
        }
    },
    methods: {
        logMsg(msg) {
            if (typeof msg === 'object') {
                msg = JSON.stringify(msg);
            }
            this.log = msg + '\n' + this.log;
        },

        clearLog() {
            this.log = '';
        }
    }
}
</script>

<template>
    <div class="logArea">
        <button @click="clearLog()">clearLog</button>
        <div class="logTitle">{{ title }}</div>
        <div class="logContent">{{ log }}</div>
    </div>
</template>

<style lang="scss" scoped>
.logArea {
    border: solid 1px blue;
    border-style: dotted;
    padding: 5px;

    .logTitle {
        color: blueviolet;
        font-size: medium;
    }

    .logContent {
        white-space: pre-line;
        max-height: 200px;
        overflow-y: scroll;
    }
}
</style>