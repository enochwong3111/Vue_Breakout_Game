<script>
    export default {
        data(){
            return {
                currentScore: 0
            };
        },
        methods:{
            addScore(val) {
                this.currentScore += val;
            },
            clear() {
                this.currentScore = 0;
            }
        }
    }
</script>

<template>
    <div class="scoreBoard">
        <span>Score: </span>
        <span>{{ currentScore }}</span>
    </div>
</template>

<style></style>