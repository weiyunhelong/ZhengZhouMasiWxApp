
// components/loadding/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showloadingMask: { // 属性名
      type: null, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      observer:function(newVal,oldVal){
        this.setData({
          showloadingMask:newVal
        })
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showloadingMask:true
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
