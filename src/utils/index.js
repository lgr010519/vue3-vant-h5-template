/**
 * 下载文件
 * @param {*} href 文件链接
 * @param {*} fileName 文件名称
 */
export function downloadFileByA(href, fileName = '') {
  const downloadElement = document.createElement('a')
  // 创建下载的链接
  downloadElement.href = href
  downloadElement.target = '_blank'
  // 下载后文件名
  downloadElement.download = fileName
  document.body.appendChild(downloadElement)
  // 点击下载
  downloadElement.click()
  // 下载完成移除元素
  document.body.removeChild(downloadElement)
}
/**
 * 后端返回blob对象进行下载
 *  + axios 配置 responseType: 'blob'
 * @param {*} data
 * @param {*} fileName
 */
export function downloadFile(data, fileName) {
  const blob = new Blob([data])
  const downloadElement = document.createElement('a')
  // 创建下载的链接
  const href = window.URL.createObjectURL(blob)
  downloadElement.href = href
  // 下载后文件名
  downloadElement.download = fileName
  document.body.appendChild(downloadElement)
  // 点击下载
  downloadElement.click()
  // 下载完成移除元素
  document.body.removeChild(downloadElement)
  // 释放掉blob对象
  window.URL.revokeObjectURL(href)
}
