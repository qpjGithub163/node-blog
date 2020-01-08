/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2019-12-30 19:12:01
 * @LastEditors  : jiegiser
 * @LastEditTime : 2020-01-08 09:26:49
 */
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { login } = require('../controller/user')

const handleUserRouter = (req, res) => {
  const method = req.method

    //  登录
  if (method === 'GET' && req.path === '/api/user/login') {
    // const { username, password } = req.body
    const { username, password } = req.query
    const result = login(username, password)
    return result.then(data => {
      if(data.username) {
        // 操作cookie ;path=/是cookie应用于根目录。所有的网页都会生效;httpOnly只允许后台修改cookie
        // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)

        // 使用session进行验证 设置session
        console.log('设置session')
        req.session.username = data.username
        req.session.realname = data.realname
        return new SuccessModel()
      }
      return new ErrorModel('登录失败')
    })
  }
  if(method === 'GET' && req.path === '/api/user/login-test') {
    // if(req.cookie.username) {
    //   return Promise.resolve(new SuccessModel({
    //     username: req.cookie.username
    //   }))
    // }
    console.log('登录验证')
    // 这里就直接判断session
    if(req.session.username) {
      return Promise.resolve(new SuccessModel({
        session: req.session
      }))
    }
    return Promise.resolve(new ErrorModel('未登录'))
  }
}
module.exports = handleUserRouter