// changzhenglu/pages/info/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swipers: ['https://zhengzhousizheng.oss-cn-beijing.aliyuncs.com/bannerimgv/%E5%AF%BB%E6%89%BE%E7%BA%A2%E8%89%B2%E7%B2%BE%E7%A5%9E.png', 'https://zhengzhousizheng.oss-cn-beijing.aliyuncs.com/bannerimgv/%E7%BA%A2%E8%89%B2%E6%97%B6%E6%97%B6%E8%AF%BB.png', 'https://zhengzhousizheng.oss-cn-beijing.aliyuncs.com/bannerimgv/%E5%AF%BB%E6%89%BE%E7%BA%A2%E8%89%B2%E7%B2%BE%E7%A5%9E.png'],
    content: '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;延安革命纪念馆位于陕西省延安市宝塔区西北延河东岸，距城1公里处，为国家AAAA级景区。整个纪念馆外观朴素大方，结构紧凑，高大宏伟，具有传统的民族风格。 </p><br/><br/>\
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;延安革命纪念馆始建于1950年1月，原馆址在南关交际处，是中华人民共和国成立后最早建立的革命纪念馆之一。1954年迁往杨家岭原中共中央机关旧址，定名为“延安博物馆”。 </p>\
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1955年迁至城内凤凰山麓革命旧址院内，改名为“延安革命纪念馆”，1973年6月迁往王家坪现址。</p>'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  ImgLoad(e) { //获取图的高度
    var that = this;
    // 取一屏的，第一屏自适应然后按照第一屏的高度
    var ratio = 0;
    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    var viewWidth = 750, //设置图片显示宽度，左右留有16rpx边距
      viewHeight = viewWidth / ratio; //计算的高度值
    that.setData({
      imgh: viewHeight
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  goVROpt() { //跳转到VR部分
    var that = this;
    var url = "https://www.baidu.com";
    wx.navigateTo({
      url: '../webview/index?url=' + url
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})