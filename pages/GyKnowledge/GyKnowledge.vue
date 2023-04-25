<template>
  <view>
    <text style="text-align: center;display: block;">知识点/题目管理系统</text>
    <uni-table border stripe emptyText="暂无更多数据">
      <!-- 表头行 -->
      <uni-tr>
        <uni-th align="center">id</uni-th>
        <uni-th align="center">题目名</uni-th>
        <uni-th align="left">题解</uni-th>
        <uni-th align="left">状态</uni-th>
        <uni-th align="left">难度</uni-th>
        <uni-th align="left">我的答案</uni-th>
        <uni-th align="left">创建时间</uni-th>
      </uni-tr>
      <!-- 表格数据行 -->
      <uni-tr v-for="(item,i) in structureListData" :key="i">
        <uni-td>{{item.id}}</uni-td>
        <uni-td>{{item.name}}</uni-td>
        <uni-td>{{item.answer}}</uni-td>
        <uni-td>{{item.state}}</uni-td>
        <uni-td>{{item.difficulty}}</uni-td>
        <uni-td>{{item.my_answer}}</uni-td>
        <uni-td>{{item.createdTime}}</uni-td>
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
        structureListData: {},

      };
    },
    onShow() {
      this.getAllImsList()

    },
    methods: {
      // 获取所有元器件列表
      getAllImsList() {
        uni.request({
          url: '/api/knowledge/getDataStructureList',
          success: (res) => {
            this.structureListData = res.data.data
          }
        })
      },

    }
  }
</script>

<style lang="scss">

</style>
