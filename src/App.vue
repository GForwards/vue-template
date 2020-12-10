<template>
    <div id="app" v-wechat-title="title">
        <router-view />
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            title: state => state.page.title,
        }),
    },
    mounted() {
        console.log(
            'process.env.VUE_APP_SITE_ID--',
            process.env.VUE_APP_SITE_ID
        )
        // 增加站点统计功能
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.innerText = `document.write(unescape("%3Cspan style='display:none;' id='cnzz_stat_icon_${process.env.VUE_APP_SITE_ID}'%3E%3C/span%3E%3Cscript src='https://v1.cnzz.com/z_stat.php%3Fid%3D${process.env.VUE_APP_SITE_ID}' type='text/javascript'%3E%3C/script%3E"));var _czc = _czc || [];_czc.push(["_setAccount", "${process.env.VUE_APP_SITE_ID}"]);`
        document.body.appendChild(script)
    },
}
</script>

<style lang="scss">
@import '~@/styles/common.scss';
#app {
    height: 100%;
    margin: 0 auto;
    background: rgba(252, 252, 252, 1);
}
</style>
