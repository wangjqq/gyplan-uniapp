uni.addInterceptor('request', {
  invoke(args) {
    // request 触发前拼接 url 
    if (args.url != "http://weather.cma.cn/api/now/57074" && args.url != "https://www.tianqi.com/yichuan1/") {
      args.url = 'https://api.wangjingqi.top' + args.url
    }

    args.header = {
      from: 'wxmp',
      'cookie': uni.getStorageSync("sessionid"), //读取sessionid,当作cookie传入后台将PHPSESSID做session_id使用
      'content-type': 'application/x-www-form-urlencoded' //解决请求不到数据
    }
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
