/*
 * @description: 抛出组件的配置
 * @Date: 2023-03-13 10:04:59
 * @Author: xing.heng
 * @LastEditors: xing.heng
 * @LastEditTime: 2023-03-13 11:26:13
 */

import commonConfig, { displayOption } from './commonConfig'

// 全局配置对象
export const globalConfig = {
  urls: {
    thingsPanelLogin: 'http://47.115.210.16:8080/' // 替换为你的 ThingsPanel 登录地址
  }
}

export {
  commonConfig, displayOption // commonConfig是个函数，传入参数type，动态生成配置,displayOption是决定组件具有哪些属性配置
}
