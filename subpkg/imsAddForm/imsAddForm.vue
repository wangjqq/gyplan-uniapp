<template>
  <view class="add-form">
    <uni-forms :modelValue="addform" ref="form" :rules="rules" class="add-form-container">
      <uni-forms-item required label="元器件分类" labelWidth="100" name="type_id">
        <uni-data-picker :localdata="ImsOptions" placeholder="选择分类" popup-title="请选择分类" @change="chooesTypeChange">
        </uni-data-picker>
      </uni-forms-item>
      <uni-forms-item required label="名称" labelWidth="100" name="name">
        <uni-easyinput v-model="addform.name" style="width: 40%;" />
      </uni-forms-item>
      <uni-forms-item label="封装" labelWidth="100" name="package">
        <uni-easyinput v-model="addform.package" />
      </uni-forms-item>
      <uni-forms-item required label="数量" labelWidth="100" name="quantity">
        <uni-easyinput v-model="addform.quantity" />
      </uni-forms-item>
      <uni-forms-item label="单价" labelWidth="100" name="price">
        <uni-easyinput v-model="addform.price" />
      </uni-forms-item>
      <uni-forms-item label="尺寸" labelWidth="100" name="size">
        <uni-easyinput v-model="addform.size" />
      </uni-forms-item>
      <uni-forms-item label="最大电压(V):" labelWidth="100" name="voltage">
        <uni-easyinput v-model="addform.voltage" />
      </uni-forms-item>
      <uni-forms-item label="最大电流(A):" labelWidth="100" name="electricity">
        <uni-easyinput v-model="addform.electricity" />
      </uni-forms-item>
      <uni-forms-item required label="存放位置:" labelWidth="100" name="place">
        <uni-easyinput v-model="addform.place" />
      </uni-forms-item>
      <uni-forms-item required label="焊接方式:" labelWidth="100" name="smt">
        <radio-group @change="radioChange">
          <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value"
            style="display: inline-block;margin: 0 10px;">
            <view>
              <radio :value="item.value" :checked="index === current" />
            </view>
            <view>{{item.name}}</view>
          </label>
        </radio-group>
      </uni-forms-item>
      <uni-forms-item label="描述:" labelWidth="100" name="description">
        <uni-easyinput v-model="addform.description" />
      </uni-forms-item>
    </uni-forms>
    <button @click="submit">提交</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        items: [{
          value: 1,
          name: '贴片'
        }, {
          value: 0,
          name: '直插'
        }],
        rules: {
          type_id: {
            rules: [{
              required: true,
              errorMessage: '请选择分类',
            }]

          },
          name: {
            rules: [{
              required: true,
              errorMessage: '请输入名称',
            }]
          },
          quantity: {
            rules: [{
              required: true,
              errorMessage: '请输入数量',
            }]
          },
          place: {
            rules: [{
              required: true,
              errorMessage: '请输入存放位置',
            }]
          },
          smt: {
            rules: [{
              required: true,
              errorMessage: '请选择焊接方式',
            }]
          },
        },
        addform: {
          type_id: '',
          type_name: '',
          type_father_id: '',
          package: '',
          electricity: '',
          description: '',
          voltage: '',
          name: '',
          quantity: '',
          price: '',
          smt: '',
          size: '',
          place: ''
        },
        ImsOptionsOld: [], //元器件分类列表
        ImsOptions: [], //处理后的分类列表
      };
    },
    onLoad() {
      this.getTypeList()
    },
    methods: {
      // 提交添加表单
      submit() {
        this.$refs.form.validate().then(res => {
          uni.request({
            url: '/api/ims/addItem',
            data: this.addform,
            method: 'POST',
            success: (res) => {
              if (res.data.status == 200) {
                uni.showToast({
                  title: '添加成功!',
                  duration: 1500,
                  icon: '',
                  success: () => {
                    setTimeout(function() {
                      uni.switchTab({
                        url: '/pages/GYStation/GYStation'
                      })
                    }, 1000);

                  }
                })
              } else {
                uni.showToast({
                  title: res.data.message,
                  duration: 1500,
                  icon: '',
                  success: () => {}
                })
              }
            }
          })
        }).catch(err => {
          console.log('表单错误信息2：', err);
        })
      },
      // 单选框点击事件
      radioChange(e) {
        this.addform.smt = e.detail.value
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
            this.ImsOptionsOld = res.data.data
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
        console.log(val);
        this.addform.type_id = val.detail.value.at(-1).value
        this.ImsOptionsOld.forEach((element) => {
          if (element.id == this.addform.type_id) {
            this.addform.type_name = element.type_name;
            this.addform.type_father_id = element.type_father_id;
          }
        });
      },
    }
  }
</script>

<style lang="scss">
  .add-form {
    margin: 20px;

    .add-form-container {
      display: flex;

      .uni-easyinput__content-input {
        width: 40%;
      }
    }
  }
</style>
