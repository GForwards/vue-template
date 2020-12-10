import { judgeDevice, judegePayTerminalType } from '@/utils'
const state = {
    device: judgeDevice(), // 判断h5所在设备
    title: '', // 页面标题
    terminal: judegePayTerminalType(), // 支付的终端类型
}

const mutations = {
    setTitle(state, title) {
        state.title = title
    },
}

export default {
    namespaced: true,
    state,
    mutations,
}
