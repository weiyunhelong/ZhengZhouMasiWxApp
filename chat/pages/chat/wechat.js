// chat/pages/chat/wechat.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    type: 0,
    showModal: false, //显示操作浮层
    showMask: false, //发送作品浮层
    showMaskAni: false, //浮层动画
    list: [1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      //id: options.id,
      //type: options.type,
    })
    that.InitData();
  },
  InitData() {
    var that = this;

    //TODO　获取群组的基本信息
    wx.setNavigationBarTitle({
      title: '内涵段子高端大气群实践内涵段子高端大气群实践',
    })
  },
  goCourse() { //实践课程

  },
  goGrouper() { //组成员
    var that = this;
    wx.navigateTo({
      url: '../chat/member?id=' + that.data.id,
    })
  },
  sendMsg(e) { //发送模板消息
    var that = this;
    var msg = e.detail.value;
    if (msg == "") {
      WxRequest.ShowAlert("请输入发送的消息");
    } else {
      //TODO 发送文字消息
      that.setData({
        msgtxt: ""
      })
      wx.showToast({
        title: '发送成功',
      })
    }
  },
  showModalOpt() { //点击操作按钮
    var that = this;
    that.setData({
      showModal: !that.data.showModal
    })
  },
  chooseImgOpt() { //发送图片
    var that = this;

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function () {

      }
    })
  },
  sendWorkOpt() { //发送作品
    var that = this;
    that.setData({
      showMask: true,
      showMaskAni: true
    })
  },
  hideMaskOpt() { //收起发送作品
    var that = this;
    that.setData({
      showMaskAni: false
    })
    setTimeout(() => {
      that.setData({
        showMask: false
      })
    }, 1000);
  },
  sendCheckWorkOpt(e){//发送选择的操作
    var that=this;
    var obj=e.currentTarget.dataset.obj;
    //TODO 发送消息
    wx.showToast({
      title: '发送成功',
    })
  },
  previewImg(e){//预览图片
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
    })
  },
  jiesanOpt(){//解散群组
    var that=this;
    
    wx.showModal({
      cancelColor: '#666666',
      cancelText: '取消',
      confirmColor: '#000000',
      confirmText: '确定',
      content: '确定要解散此讨论组吗',
      showCancel: true,
      title: '',
      success: (result) => {
        if(result.confirm){
          //TODO　请求接口解散群组
          wx.showToast({
            title: '解散成功',
          })
        }
      }
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