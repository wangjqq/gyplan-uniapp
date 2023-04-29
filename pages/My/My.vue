<template>
  <view class="my">
    <image src="/static/logo/logo_small.png" mode="scaleToFill"
      style="width: 70%;height: 100px;margin: 0 auto;display: block;">
    </image>
    <my-login v-if="isLogin!='yes'"></my-login>
    <view class="login" v-else>
      <text class="tap">您已登录!</text>
      <button type="primary" @click="logout">退出登录</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        isLogin: ''
      };
    },
    onLoad() {
      this.checkLogin()
    },
    onShow() {
      this.checkLogin()
    },
    methods: {
      checkLogin() {
        this.isLogin = uni.getStorageSync("login")
      },
      logout() {
        uni.setStorageSync('login', 'no');
        uni.removeStorageSync('sessionid');
        uni.request({
          url: '/user/logout',
          method: 'POST',
          success: (res) => {
            uni.setStorageSync('login', 'no');
          },
          header: {
            from: 'wxmp',
            'content-type': 'application/json',
            'cookie': uni.getStorageSync(
              "sessionid") //读取sessionid,当作cookie传入后台将PHPSESSID做session_id使用
          }
        })
        uni.showToast({
          title: '退出登录成功!',
          duration: 1500,
          icon: '',
          success: () => {
            setTimeout(function() {
              uni.switchTab({
                url: '/pages/Home/Home'
              })
              uni.switchTab({
                url: '/pages/My/My'
              })
            }, 1000);

          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .my {

    .login .tap {
      display: block;
      height: 30px;
      text-align: center;
      font-size: 20px;
      margin: 20px 0;
    }
  }
</style>