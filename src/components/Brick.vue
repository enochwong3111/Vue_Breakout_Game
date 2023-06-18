<script>
export default {
    props: ['x', 'y', 'content', 'healthPoint', 'wStyle'],//, 'colorScheme'
    data() {
        return {
            width: 0,
            height: 0,
            top: 0
        }
    },
}
</script>

<template>
    <span class="blick" v-show="healthPoint > 0" :health-point="healthPoint" :style="{ left: wStyle.left + 'px' }">{{ content }}</span>
</template>

<style lang="scss" scoped>
.blick {
    position: absolute;

    .hideContent & {
        color: transparent !important;
    }

    [color-scheme="0"] & {
        border: solid 1px #92a599;

        &[health-point="1"] {
            background-color: #f2f7f3;
            color: black;
        }

        &[health-point="2"] {
            background-color: #d0e9e9;
            color: black;
        }

        &[health-point="3"] {
            background-color: #728585;
            color: white;
        }

        &[health-point="4"] {
            background-color: #244444;
            color: white;
        }
    }

    [color-scheme="1"] & {
        color: black;
        border: solid 1px #c78d8d;

        &[health-point="1"] {
            background-color: #F9F5F6;
        }

        &[health-point="2"] {
            background-color: #F8E8EE;
        }

        &[health-point="3"] {
            background-color: #FDCEDF;
        }

        &[health-point="4"] {
            background-color: #f0adc5;
        }
    }
}
</style>