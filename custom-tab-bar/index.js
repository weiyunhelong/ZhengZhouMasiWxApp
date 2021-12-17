Component({
  data: {
    selected: 0,
    color: "#666666",
    selectedColor: "#F24540",
    list: getApp().globalData.tabbar,
    showTabBar: true,
    tabbarresize: '?x-oss-process=image/resize,m_fill,w_54,h_54,limit_0'
  },
  methods: {
    //点击切换跳转
    switchTab: function (e) {
      var that = this;

      //切换的跳转
      if (that.data.selected != e.currentTarget.dataset.index) {
        var urlpath = e.currentTarget.dataset.path;

        if (urlpath.indexOf('/card/index') > -1) { //添加名片
          wx.navigateTo({
            url: '../../idcard/pages/idcard/index',
          })
        } else {
          wx.switchTab({
            url: "../../" + urlpath
          });
        }

      } else {
        return false;
      }
    }
  }
})