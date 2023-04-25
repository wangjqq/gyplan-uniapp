<template>
  <view>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
      style="width: 100%;height: 400rpx;">
      <swiper-item v-for="(i,item) in 4" :key="i">
        <image :src=" '../../static/swiper_imgs/swiper' +(i+1)+'.png'" mode="scaleToFill" style="width: 100%;"></image>
      </swiper-item>
    </swiper>
    <!-- 更新信息滚动 -->
    <uni-notice-bar @click="toUpdateInfo" show-icon scrollable showGetMore speed="20" :text="updateInfo" />
    </uni-section>

    <view style="margin: 10px; display: flex;flex-direction: row;justify-content: space-between;">
      <image v-for="(item, index) in 2" :index="index" :key="index" @click="gridChange(index)"
        :src="'https://api.wangjingqi.top/home_imgs-uni/grid' +(index+1)+'.jpg'" mode="scaleToFill"
        style="height: 100px;width: 45%;display: inline-block;border-radius: 10px;">
      </image>

    </view>
    <text @click="gridChange(2)">天气</text>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: ['元器件管理系统', '知识点题目管理系统'], //宫格文本信息
        updateInfo: '' //更新信息
      };
    },
    onLoad() {
      this.setSession()
      this.getUpdateInfo()
    },
    methods: {
      // 获取更新信息
      getUpdateInfo() {
        uni.request({
          url: '/system/getUpdateInfo',
          data: {
            location: 1,
            auth: 1
          },
          success: (res) => {
            this.updateInfo = res.data.data.at(-1).date.split('T')[0] + '更新日志: ' + res.data.data.at(-1).info
          }
        })
      },
      // 点击宫格事件
      gridChange(e) {
        console.log(e);
        if (e === 0) {
          uni.switchTab({
            url: '/pages/GYStation/GYStation'
          })
        } else if (e === 1) {
          uni.switchTab({
            url: '/pages/GyKnowledge/GyKnowledge'
          })
        } else if (e === 2) {
          uni.navigateTo({
            url: '/subpkg/tianqi/tianqi'
          })
        }
      },
      setSession() {

        uni.request({
          url: '/user/islogin',
          success: (res) => {
            if (res.data.status == 500) { //没有登陆
              uni.setStorageSync('login', 'no');
              if (res.header['Set-Cookie']) {
                uni.removeStorageSync('sessionid'); //每次登录时清除缓存
                uni.setStorageSync('sessionid', res.header['Set-Cookie']); //保存Cookie到Storage
              }
            } else {
              uni.setStorageSync('login', 'yes');
            }

          }
        })
      },
      // 跳转到更新信息页面
      toUpdateInfo() {
        uni.navigateTo({
          url: '/subpkg/UpdateInfo/UpdateInfo'
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
