<template>
    <div class="advert">
        <img-text :html="backHtml"></img-text>
    </div>
</template>

<script>
import { fetchAdvertDetail } from '@/api/advert'
import ImgText from '@/components/Common/imgText'
import { trackEvent } from '@/utils'
export default {
    name: 'advert',
    components: {
        ImgText,
    },
    data() {
        return {
            backHtml: '',
        }
    },
    created() {
        let advertId = this.$route.query.advertId
        fetchAdvertDetail(advertId).then(res => {
            let { pageContent, pageTitle } = res
            this.backHtml = pageContent
            // document.title = pageTitle
            this.$store.commit('page/setTitle', pageTitle)

            trackEvent('广告营销页', '', pageTitle)
        })
    },
}
</script>
<style lang="scss" scoped>
.advert {
    height: 100vh;
    background: #fff;
}
</style>
