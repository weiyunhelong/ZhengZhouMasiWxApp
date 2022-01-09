// my/components/dynamic/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    receiveData: {
      type: null,
      observer: function (newVal, oldVal) {

        this.setData({
          dataobj: newVal
        })
      }
    },
    showType: {
      type: null,
      observer: function (newVal, oldVal) {

        this.setData({
          type: newVal
        })
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    dataobj:{},
    type:0,//1我的评论 2我的赞 3我的收藏
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
