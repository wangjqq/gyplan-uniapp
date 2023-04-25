<template>
  <view>
    <text style="text-align: center;display: block;margin: 10px 0;">元器件管理系统</text>
    <view class="header" style="margin: 10px 0;display: flex;justify-content:center;align-items: center;">
      <button type="default" size="mini" style="background-color:#007AFF;color: white;width: 20%;"
        @click="showAddFrom">添加</button>
      <uni-data-picker :localdata="ImsOptions" placeholder="选择分类" popup-title="请选择分类" @change="chooesTypeChange"
        style="width: 50%;">
      </uni-data-picker>
    </view>
    <uni-table border stripe emptyText="暂无更多数据">
      <!-- 表头行 -->
      <uni-tr>
        <uni-th align="center" width="20">id</uni-th>
        <uni-th align="center" width="120">分类</uni-th>
        <uni-th align="center" width="100">封装</uni-th>
        <uni-th align="center">名称</uni-th>
        <uni-th align="center">存放地点</uni-th>
        <uni-th align="center">数量</uni-th>
        <uni-th align="center">描述</uni-th>
        <uni-th align="center">最大电压</uni-th>
        <uni-th align="center">最大电流</uni-th>
        <uni-th align="center">尺寸</uni-th>
        <uni-th align="center">焊接方式</uni-th>
        <uni-th align="center">参考价格</uni-th>
      </uni-tr>
      <!-- 表格数据行 -->
      <uni-tr v-for="(item,i) in imsList" :key="i">
        <uni-td align="center">{{item.id}}</uni-td>
        <uni-td align="center">{{item.type_name}}</uni-td>
        <uni-td align="center">{{item.package}}</uni-td>
        <uni-td align="center">{{item.name}}</uni-td>
        <uni-td align="center">{{item.place}}</uni-td>
        <uni-td align="center">{{item.quantity}}</uni-td>
        <uni-td align="left">{{item.description}}</uni-td>
        <uni-td align="center">{{item.voltage!=''?item.voltage+'V':''}}</uni-td>
        <uni-td align="center">{{item.electricity!=''?item.electricity+'A':''}}</uni-td>
        <uni-td align="center">{{item.size}}</uni-td>
        <uni-td align="center">{{item.smt=='1'?'贴片':'直插'}}</uni-td>
        <uni-td align="center">{{item.price}}</uni-td>
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
        imsList: {}, //所有元器件列表
        ImsOptionsOld: [], //元器件分类列表
        ImsOptions: [], //处理后的分类列表

      };
    },
    onShow() {
      this.getAllImsList()
      this.getTypeList()
    },
    methods: {
      // 获取所有元器件列表
      getAllImsList() {
        uni.request({
          url: '/api/ims/getAllImsList',
          success: (res) => {
            this.imsList = res.data.data
          }
        })
      },
      // 获取元器件分类列表
      getTypeList() {
        uni.request({
          url: '/api/ims/getTypeList',
          success: (res) => {
            res.data.data.forEach((element) => {
              element.value = element.id
              element.text = element.type_name
            })
            var rJson = []
            //将所有的pid的数据加到对应的id数据对象里面去，需要添加一个属性children
            for (var i = 0; i < res.data.data.length; i++) {
              var arr = []
              for (var j = 0; j < res.data.data.length; j++) {
                if (res.data.data[i].id == res.data.data[j].type_father_id) {
                  res.data.data[i].children = arr
                  arr.push(res.data.data[j])
                }
              }
            }
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].type_father_id == 0) {
                rJson.push(res.data.data[i])
              }
            }
            this.ImsOptions = rJson
          }
        })
      },
      // 级联选择器选择完成时触发
      chooesTypeChange(val) {
        if (val.detail.value.length == 0) {
          this.getAllImsList()
          return
        }
        uni.request({
          url: '/api/ims/getImsListByType',
          data: {
            type_id: val.detail.value.at(-1).value
          },
          success: (res) => {
            this.imsList = res.data.data
          }
        })
      },
      // 弹出添加表单
      showAddFrom() {
        uni.navigateTo({
          url: '/subpkg/imsAddForm/imsAddForm'
        })
      }

    }
  }
</script>

<style lang="scss">

</style>
