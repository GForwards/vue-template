/* 广告相关接口 */
import request from '@/utils/request'

/**
 * @description fetchAdvertDetail 获取广告详情
 * @export
 * @param {integer} advertId 广告id
 * @returns
 */
export function fetchAdvertDetail(advertId) {
    return request({
        url: '/hy-message/app/market/getMarketPage',
        method: 'get',
        params: { advertId },
    })
}
