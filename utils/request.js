uni.addInterceptor('request', {
  invoke(args) {
    // request 触发前拼接 url 
    args.url = 'https://api.wangjingqi.top' + args.url
  },
  success(args) {
    // 请求成功后，修改code值为1
    // args.data.code = 1
  },
  fail(err) {
    console.log('interceptor-fail', err)
  },
  complete(res) {}
})
