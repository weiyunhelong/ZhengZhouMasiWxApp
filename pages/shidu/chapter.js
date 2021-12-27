// pages/shidu/chapter.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chktab: 1, //
    desc: '<p>三亚市，是海南省地级市，简称崖，古称崖州，别称鹿城，地处海南岛的最南端。三亚东邻陵水黎族自治县，西接乐东黎族自治县，北毗保亭黎族苗族自治县，南临南海，三亚市陆地总面积1921平方千米，海域总面积3226平方千米。东西长91.6千米，南北宽51公里，下辖四个区。</p>\
<img style="width:100%;border-radius:10px;margin:10px 0;" src="https://bkimg.cdn.bcebos.com/pic/0b55b319ebc4b74543a93692ffb609178a82b901bf57"/>\
<p>三亚市，是海南省地级市，简称崖，古称崖州，别称鹿城，地处海南岛的最南端。三亚东邻陵水黎族自治县，西接乐东黎族自治县，北毗保亭黎族苗族自治县，南临南海，三亚市陆地总面积1921平方千米，海域总面积3226平方千米。东西长91.6千米，南北宽51公里，下辖四个区。</p>\
<img style="width:100%;border-radius:10px;margin:10px 0;" src="https://bkimg.cdn.bcebos.com/pic/0b55b319ebc4b74543a93692ffb609178a82b901bf57"/>\
<p>三亚市，是海南省地级市，简称崖，古称崖州，别称鹿城，地处海南岛的最南端。三亚东邻陵水黎族自治县，西接乐东黎族自治县，北毗保亭黎族苗族自治县，南临南海，三亚市陆地总面积1921平方千米，海域总面积3226平方千米。东西长91.6千米，南北宽51公里，下辖四个区。</p>',

    id: 0,
    dataobj: {},
    commentId: 0, //
    placeholdertxt: "说点什么吧...",
    comment: "", //评论
    IsCollect:false,//是否已收藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tapTab(e) {//点击切换tab
    this.setData({
      chktab: e.currentTarget.dataset.tab
    })
  },
  collectOpt(){//收藏操作
    var that=this;
    that.setData({
      IsCollect:!that.data.IsCollect
    })
  },
  goDetail(e){//跳转到章节详情
    wx.navigateTo({
      url: '../shidu/detail?id='+e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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