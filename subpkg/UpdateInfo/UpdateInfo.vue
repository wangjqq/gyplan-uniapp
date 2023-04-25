<template>
  <view>
    <uni-section title="更新日志" type="line">
      <template v-slot:right>
        有新功能想添加? <span @click="toContact" style="color: red;text-decoration:underline;">立刻联系我</span>
      </template>
      <uni-card :sub-title="'version:'+item.version"
        :title="item.type == '0' ? '版本升级' : (item.type == '1' ? '特性更新' : (item.type == '2' ? '修订补丁' : '未知错误')) "
        :extra="item.date.split('T')[0]" v-for="(item,i) in updateInfoList" :key="i">
        <text v-for="(item1,i1) in item.info.split(' ')" :key="i1" style="display: block;">{{item1}}</text>
      </uni-card>
    </uni-section>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        updateInfoList: [],
      };
    },
    onLoad() {
      this.getUpdateInfo()
    },
    methods: {
      toContact() {
        uni.navigateTo({
          url: '/subpkg/Contact/Contact',
        });
      },
      getUpdateInfo() {
        uni.request({
          url: '/system/getUpdateInfo',
          data: {
            location: 1,
            auth: 1
          },
          success: (res) => {
            this.updateInfoList = res.data.data.reverse()
          }
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
