// yunsystem/pages/scan/index.js
var requestUrl = getApp().globalData.requestUrl; //接口请求的地址
var WxRequest = require('../../../utils/WxRequest.js'); //封装请求方法
var timer = ""; //计时器

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.takePhoto();
    timer = setInterval(() => {
      that.takePhoto();
    }, 2000);
  },
  takePhoto() { //拍照
    var that = this;
    const ctx = wx.createCameraContext();

    ctx.takePhoto({
      quality: 'high',
      success: (res) => {        
        var src = res.tempImagePath;
        wx.getFileSystemManager().readFile({
          filePath: src, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: ress => { //成功的回调
            var base64 = ress.data;
            that.ShiBieImgOPt(base64);
          }
        })
      }
    })
  },
  ShiBieImgOPt(base64) {
    var that = this;
    
    var url = requestUrl + '/API/CloudExhibition/PostARSameHqSearchBase64';
    var params = {
      image: base64
    };
    WxRequest.PostFormRequest(url, params).then(res => {
      if (res.data.success&&res.data.data.ID) {
        wx.redirectTo({
          url: '../info/index?id=' + res.data.data.ID,
        })      
      }
    })
  },
  ErrorOpt() {
    WxRequest.ShowAlert("请打开相机");
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
    clearInterval(timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(timer);
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