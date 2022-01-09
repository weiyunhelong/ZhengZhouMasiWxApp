// my/components/connent/index.js
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
    showMsg: {
      type: null,
      observer: function (newVal, oldVal) {

        this.setData({
          isshowmsg: newVal==1
        })
      }
    },
    caogaoType: {
      type: null,
      observer: function (newVal, oldVal) {

        this.setData({
          iscaogao: newVal==1
        })
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    dataobj:{},//数据
    type:0,//类型 1:内容 2:视频稿件 3:专栏稿件
    isshowmsg:false,//是否显示未通过icon
    iscaogao:false,//是否是草稿箱
  },

  /**
   * 组件的方法列表
   */
  methods: {
    replyOpt(){//再次申请
      var that=this;
      this.triggerEvent('replayOpt',that.data.dataobj);
    },
  }
})
