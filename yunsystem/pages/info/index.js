// yunsystem/pages/info/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    dataobj: {},
    IsZan: false, //是否点赞
    IsCollect: false, //是否收藏
    IsVr: false, //是否有VR视频
    showloadingMask: true,
    currentSwiper: 0, //轮播图下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id
    })
  },
  swiperChange(e) { //轮播图下标
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  ZanOpt() { //点赞
    var that = this;
    var dataobj = that.data.dataobj;
    var IsZan = that.data.IsZan;
    var url = requestUrl + "/API/CloudExhibition/SaveLikesNumInfo?yid=" + dataobj.ID + "&userid=" + getApp().globalData.WxUserId;
    WxRequest.PostRequest(url, {}).then(res => {
      if (IsZan) { //取消点赞
        wx.showToast({
          title: '已取消点赞',
          duration: 2000
        })
        dataobj.IsLikes = 0;
        dataobj.LikesNum = dataobj.LikesNum - 1;
        that.setData({
          IsZan: false,
          dataobj: dataobj
        })
      } else { //点赞
        wx.showToast({
          title: '点赞成功',
          duration: 2000
        })
        dataobj.IsLikes = 1;
        dataobj.LikesNum = dataobj.LikesNum + 1;
        that.setData({
          IsZan: true,
          dataobj: dataobj
        })
      }
    })
  },
  CollectOpt() { //收藏
    var that = this;
    var dataobj = that.data.dataobj;
    var IsCollect = that.data.IsCollect;
    var url = requestUrl + "/API/CloudExhibition/SaveCollectionNumInfo?yid=" + dataobj.ID + "&userid=" + getApp().globalData.WxUserId;
    WxRequest.PostRequest(url, {}).then(res => {
      if (IsCollect) { //取消收藏
        wx.showToast({
          title: '已取消收藏',
          duration: 2000
        })
        dataobj.IsCollection = 0;
        dataobj.CollectionNum = dataobj.CollectionNum - 1;
        that.setData({
          IsCollect: false,
          dataobj: dataobj
        })
      } else { //收藏
        wx.showToast({
          title: '收藏成功',
          duration: 2000
        })
        dataobj.IsCollection = 1;
        dataobj.CollectionNum = dataobj.CollectionNum + 1;
        that.setData({
          IsCollect: true,
          dataobj: dataobj
        })
      }
    })

  },
  goVROpt() { //vr体验
    var that = this;
    wx.navigateTo({
      url: '../webview/index?type=0&url=' + that.data.dataobj.VRUrl
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu({
      menus: ['shareAppMessage', 'shareTimeline'],
    })

    this.videoContext = wx.createVideoContext('myVideo');

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;

    getApp().ChargeLogin().then(res => {
      if (getApp().globalData.WxUserId == 0) {
        wx.navigateTo({
          url: '../../../wxauth/pages/wxlogin/index',
        })
      } else {
        that.InitData();
        that.SaveRecord();
      }
    })
  },
  InitData() { //获取详情
    var that = this;
    var url = requestUrl + "/API/CloudExhibition/GetCloudExhibitionInfoDetail?id=" + that.data.id + "&userid=" + getApp().globalData.WxUserId;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        var dataobj = res.data.data;
        that.setData({
          dataobj: dataobj,
          IsZan: dataobj.IsLikes == 1, //是否点赞
          IsCollect: dataobj.IsCollection == 1, //是否收藏
          IsVr: dataobj.VRUrl != '', //是否有VR视频
          swipers: dataobj.MainGraph, //顶部轮播图
        })
      }
    });
  },
  ImgLoad(e) { //获取图片高度
    var that = this;
    var ratio = 0;
    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    var viewWidth = 750, //设置图片显示宽度，左右留有16rpx边距
      viewHeight = viewWidth / ratio; //计算的高度值
    that.setData({
      imgh: viewHeight
    })
    setTimeout(() => {
      that.setData({
        showloadingMask: false
      })
    }, 500);
  },
  SaveRecord() { //保存浏览记录
    var that = this;
    var url = requestUrl + "/API/CloudExhibition/SaveBrowseInfo?yid=" + that.data.id + "&userid=" + getApp().globalData.WxUserId;
    WxRequest.PostRequest(url, {}).then(res => {});
  },
  playVideo() { //视频播放
    var that = this;

    this.videoContext.requestFullScreen({
      direction: -90
    });
    this.videoContext.play();
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