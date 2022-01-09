// my/components/msgcom/index.js
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
    type:0,//1浏览我的 2评论我的 3收到的赞 4分享我的 5收藏我的
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
