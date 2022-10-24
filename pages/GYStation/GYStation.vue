<template>
  <view>
    <text style="text-align: center;display: block;">元器件管理系统</text>
    <uni-table border stripe emptyText="暂无更多数据">
      <!-- 表头行 -->
      <uni-tr>
        <uni-th align="center">id</uni-th>
        <uni-th align="center">分类</uni-th>
        <uni-th align="left">封装</uni-th>
        <uni-th align="left">名称</uni-th>
        <uni-th align="left">存放地点</uni-th>
        <uni-th align="left">数量</uni-th>
        <uni-th align="left">描述</uni-th>
        <uni-th align="left">最大电压</uni-th>
        <uni-th align="left">最大电流</uni-th>
        <uni-th align="left">尺寸</uni-th>
        <uni-th align="left">焊接方式</uni-th>
        <uni-th align="left">参考价格</uni-th>
      </uni-tr>
      <!-- 表格数据行 -->
      <uni-tr v-for="(item,i) in imsList" :key="i">
        <uni-td>{{item.id}}</uni-td>
        <uni-td>{{item.type_id}}</uni-td>
        <uni-td>{{item.package}}</uni-td>
        <uni-td>{{item.name}}</uni-td>
        <uni-td>{{item.place}}</uni-td>
        <uni-td>{{item.quantity}}</uni-td>
        <uni-td>{{item.description}}</uni-td>
        <uni-td>{{item.voltage}}</uni-td>
        <uni-td>{{item.electricity}}</uni-td>
        <uni-td>{{item.size}}</uni-td>
        <uni-td>{{item.smt}}</uni-td>
        <uni-td>{{item.price}}</uni-td>
      </uni-tr>

    </uni-table>
  </view>
</template>

<script>
  import isLoginMix from '@/mixins/checkLogin.js'
  export default {
    mixins: [isLoginMix],
    data() {
      return {
        imsList: {}
      };
    },
    onShow() {
      this.getAllImsList()
    },
    methods: {
      // 获取所有元器件列表
      getAllImsList() {
        uni.request({
          url: '/api/ims/getAllImsList',
          success: (res) => {
            console.log(res.data);
            this.imsList = res.data.data
          },
          header: {
            from: 'wxmp',
            'cookie': uni.getStorageSync("sessionid") //读取sessionid,当作cookie传入后台将PHPSESSID做session_id使用
          }
        })
      },

    }
  }
</script>

<style lang="scss">

</style>
