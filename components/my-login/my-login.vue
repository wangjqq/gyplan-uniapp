<template>
  <view class="from">
    <uni-forms :modelValue=" formData" border>
      <uni-forms-item label=" " label-width="0" name="name">
        <uni-easyinput prefixIcon="person" :inputBorder="false" type="text" v-model="formData.username"
          placeholder="请输入帐号" />
      </uni-forms-item>
      <uni-forms-item label=" " label-width="0" name="name">
        <uni-easyinput prefixIcon="locked-filled" :inputBorder="false" type="password" v-model="formData.password"
          placeholder="请输入密码" />
      </uni-forms-item>
      <uni-forms-item label=" " label-width="0" name="name">
        <view style="display: flex;flex-direction: row;justify-content: space-between;">
          <view class="inputt" style="width: 50%;">
            <uni-easyinput prefixIcon="info" :inputBorder="false" type="text" v-model="formData.capdata"
              placeholder="请输入验证码" style="width:50%;height: 50px;display: block;" />
          </view>

          <image @click="getCaptacha" :src="picSrc" style="width: 50%; height: 40px;display: block;"></image>
        </view>

      </uni-forms-item>

    </uni-forms>
    <button @click="login" v-if="isLogin">登录</button>
    <button @click="register" v-else>注册</button>
    <view class="toRegister" style="display: flex;justify-content: center;color: #acadaf;">
      <text @click="isLogin=false" v-if="isLogin">注册</text>
      <text @click="isLogin=true" v-else>已有帐号,去登陆</text>
      <text>/</text>
      <text @click="toContact">忘记密码</text>
    </view>
    <!-- <button @click="toRegister">注册</button> -->
  </view>
</template>

<script>
  export default {
    name: "my-login",
    data() {
      return {
        picSrc: '',
        formData: {
          username: '',
          password: '',
          capdata: ''
        },
        isLogin: true
      };
    },
    watch: {
      isLogin() {
        this.formData = {
          username: '',
          password: '',
          capdata: ''
        }
        this.getCaptacha()
      }
    },
    created() {
      this.getCaptacha()
    },
    methods: {
      // 获取验证码
      getCaptacha() {
        uni.request({
          url: '/user/captcha',
          success: (res) => {
            console.log(res);
            this.picSrc = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(res.data)
          },
          header: {
            from: 'wxmp',
            'cookie': uni.getStorageSync("sessionid") //读取sessionid,当作cookie传入后台将PHPSESSID做session_id使用
          }
        })
      },
      // 登录
      login() {
        uni.request({
          url: '/user/login',
          data: this.formData,
          method: 'POST',
          success: (res) => {
            console.log(res);
            if (res.data.status == 200) {
              uni.showToast({
                title: '登陆成功',
                success: () => {
                  setTimeout(function() {
                    uni.setStorageSync('login', 'yes');
                    uni.switchTab({
                      url: '/pages/Home/Home'
                    })
                  }, 1000);
                }
              })
            } else {
              uni.showToast({
                icon: 'none',
                title: res.data.message,
                success: () => {

                }
              })
            }
          }
        })
      },
      // 注册
      register() {
        uni.request({
          url: '/user/reguser',
          data: this.formData,
          method: 'POST',
          success: (res) => {
            console.log(res);
            if (res.data.status == 200) {
              uni.showToast({
                title: '注册成功',
                success: () => {
                  this.isLogin = true
                }
              })
            } else {
              uni.showToast({
                icon: 'none',
                title: res.data.message,
                success: () => {

                }
              })
            }
          },
          header: {
            from: 'wxmp',
            'cookie': uni.getStorageSync("sessionid"), //读取sessionid,当作cookie传入后台将PHPSESSID做session_id使用
            'content-type': 'application/x-www-form-urlencoded' //解决请求不到数据
          }
        })
      },
      // 去联系页面
      toContact() {
        uni.navigateTo({
          url: '/subpkg/Contact/Contact'
        })
      }
    }
  }
</script>

<style lang="scss">
  .from {
    margin: 10px 20px;
  }
</style>
