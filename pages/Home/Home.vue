<template>
  <view>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
      style="width: 100%;height: 400rpx;">
      <swiper-item v-for="(i,item) in 4" :key="i">
        <image :src=" '../../static/swiper_imgs/swiper' +(i+1)+'.png'" mode="scaleToFill" style="width: 100%;"></image>
      </swiper-item>
    </swiper>

    <view style="margin: 10px; display: flex;flex-direction: row;justify-content: space-between;">
      <image v-for="(item, index) in 2" :index="index" :key="index"
        :src="'../../static/home_imgs/grid' +(index+1)+'.jpg'" mode="scaleToFill"
        style="height: 100px;width: 45%;display: inline-block;">
      </image>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: ['元器件管理系统', '知识点题目管理系统'] //宫格文本信息
      };
    },
    onLoad() {
      this.setSession()
    },
    methods: {
      // 点击宫格事件
      gridChange(e) {
        console.log(e);
        if (e.detail.index === 0) {
          uni.switchTab({
            url: '/pages/GYStation/GYStation'
          })
        } else if (e.detail.index === 1) {
          uni.switchTab({
            url: '/pages/GyKnowledge/GyKnowledge'
          })
        }
      },
      setSession() {
        uni.request({
          url: '/user/islogin',
          success: (res) => {
            if (res.data.status == 500) { //没有登陆
              uni.setStorageSync('login', 'no');
              uni.removeStorageSync('sessionid'); //每次登录时清除缓存
              uni.setStorageSync('sessionid', res.header['Set-Cookie']); //保存Cookie到Storage
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
</script>

<style lang="scss" scoped>
  .uni-grid-item {
    height: 100px;
  }
</style>
