// changzhenglu/components/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    receiveData: { //是否进行缩放
      type: null,
      observer: function (newVal, oldVal) {

        var that = this;
        that.setData({
          IsScane: newVal
        })
      }
    },
    poiIndex: { //当前所在的poi位置
      type: null,
      observer: function (newVal, oldVal) {

        var that = this;
        that.setData({
          poi: newVal
        })

      }
    },
    flagIndex: { //当前用户所在位置
      type: null,
      observer: function (newVal, oldVal) {

        var that = this;
        that.setData({
          flag: newVal
        })

      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    IsScane: false,
    poi: 0,
    flag: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapMap(e) { //点击景点
      var that = this;
      var  IsScane=e.currentTarget.dataset.index;
      that.setData({
        IsScane: IsScane
      })
      that.triggerEvent('poitap',IsScane);
    },
    tapLine(e) { //点击线路
      var that = this;
      var  IsScane=e.currentTarget.dataset.index;
      that.setData({
        IsScane: IsScane
      })
      that.triggerEvent('poitap',IsScane);
    },
  }
})