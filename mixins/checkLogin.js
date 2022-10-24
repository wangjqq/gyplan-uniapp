export default {
  onShow() {
    this.checkLogin()
  },
  methods: {
    checkLogin() {
      uni.request({
        url: '/user/islogin',
        success: (res) => {
          if (res.data.status == 500) { //没有登陆
            uni.showToast({
              title: '登陆后即可使用',
              duration: 1500,
              icon: '',
              success: () => {
                setTimeout(function() {
                  uni.switchTab({
                    url: '/pages/My/My'
                  })
                }, 1000);

              }
            })
          }

        },
        header: {
          from: 'wxmp',
          'cookie': uni.getStorageSync("sessionid") //读取sessionid,当作cookie传入后台将PHPSESSID做session_id使用
        }
      })
    }
  }
}
