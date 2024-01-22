import { post } from './config'
// 获取能耗统计
export const getStatisticsData = (data) =>
  post('/api/v1/bigScreen/queryStatisticsTotal', data)
