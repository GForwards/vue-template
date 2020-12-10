<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'Home',
    components: {
        HelloWorld,
    },
    created() {
        this.$toast('哈哈哈哈')
    },
}
</script>
<style lang="scss">
.home {
    font-size: 0.2rem /* 20/100 */;
}
</style>
