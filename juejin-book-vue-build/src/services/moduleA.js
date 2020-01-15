import Http from './http'

// 获取测试数据
export const getTestData = () => {
  return Http.get('/repos/octokit/octokit.rb')
}
