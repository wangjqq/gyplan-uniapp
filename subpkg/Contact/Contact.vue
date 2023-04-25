<template>
  <view class="cotact">
    <text style="display:block; text-align: center;font-size: 30px;margin: 20px 0;">联系我</text>
    <view class=" contact-imgs">
      <image src="/static/logo/wx1.jpg" mode="aspectFit" show-menu-by-longpress="true"></image>
      <image src="/static/logo/qq1.png" mode="aspectFit" show-menu-by-longpress="true"></image>
    </view>
    <text user-select="true"
      style="display:block; text-align: center;font-size: 30px;margin: 20px 0;">1092229612@qq.com</text>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  .cotact {
    .contact-imgs {
      display: flex;

    }
  }
</style>
