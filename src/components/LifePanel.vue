<script>
    export default {
        data() {
            return {
                lives: 3,
            }
        },
        methods: {
            decrease() {
                this.lives--;
                return this.lives > 0;
            },
            
            increase() {
                this.lives++;
            },

            restore() {
                this.lives = 3;
            }
        }
    }
</script>

<template>
    <div class="lifePanel">
        <span>Player Lives: </span>
        <span>{{ lives }}</span>
    </div>
</template>