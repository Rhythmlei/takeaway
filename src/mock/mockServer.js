// 使用mockjs，模拟后台服务器返回的数据，提供模拟的数据接口
import Mock from 'mockjs'
import data from './data.json'

// 返回goods的接口
Mock.mock('/shopgoods', { code: 0, data: data.goods })

// 返回ratings的接口
Mock.mock('/shopratings', { code: 0, data: data.ratings })

// 返回info的接口
Mock.mock('/shopinfo', { code: 0, data: data.info })



// export default xxx   ????      这里不需要向外暴露该模块，只需要运行就行
// 只需要在入口js中，如同css文件那样引入该文件地址即可