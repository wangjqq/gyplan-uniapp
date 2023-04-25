<template>
  <view>
    <view>伊川</view>
    <view>温度 {{info[1]}}°C</view>
    <view>天气 {{info[2]}}</view>
    <view>{{info[3]}}</view>
    <view>{{info[4]}}</view>
    <view>{{info[5]}}</view>

    <view>伊川今日生活指数</view>
    <view>带伞:{{info2[1]}}</view>
    <view>洗车:{{info2[2]}}</view>
    <view>紫外线:{{info2[3]}}</view>
    <view>过敏:{{info2[4]}}</view>
    <view>钓鱼:{{info2[5]}}</view>
    <view>穿衣:{{info2[6]}}</view>
    <view>旅行:{{info2[7]}}</view>
    <view>晾晒:{{info2[8]}}</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        info: '',
        info2: ''
      }
    },
    onLoad() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        uni.request({
            url: 'http://weather.cma.cn/api/now/57074',
            success: (res) => {
              this.info = res.data.data.now
            }
          }),
          uni.request({
            url: 'https://www.tianqi.com/yichuan1/',
            success: (res) => {
              this.info = res.data.split("<h1>伊川天气</h1><i>")[1].split("<b>")
              for (var i = 1; i < this.info.length; i++) {
                this.info[i] = this.info[i].split("</b>")[0]
              }
              this.info2 = res.data.split("伊川今日生活指数")[1].split("<p>")
              for (var i = 1; i < this.info2.length; i++) {
                this.info2[i] = this.info2[i].split("</p>")[0]
              }
            }
          })

      },
    }
  }
</script>

<style>

</style>
