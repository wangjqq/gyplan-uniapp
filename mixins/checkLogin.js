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

            uni.setStorageSync('login', 'no');
            if (res.header['Set-Cookie']) {
              uni.removeStorageSync('sessionid'); //每次登录时清除缓存
              uni.setStorageSync('sessionid', res.header['Set-Cookie']); //保存Cookie到Storage
            }

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
          } else {
            uni.setStorageSync('login', 'yes');
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
