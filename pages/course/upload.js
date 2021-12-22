// pages/course/upload.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');
var OssTool = require('../../ossutils/uploadFile.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    title: "", //标题
    info: "", //内容
    imgs: [], //图片
    imgdesc: "", //图片说明
    fujian: "", //附件
    fujianUrl: "", //附件上传地址
    address: "", //地址
    mark: "", //体会
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
  getTitle(e) { //获取标题
    var that = this;
    that.setData({
      title: e.detail.value
    })
  },
  getInfo(e) { //获取实践报告
    var that = this;
    that.setData({
      info: e.detail.value
    })
  },
  chooseImgOpt() { //选择图片
    var that = this;
    wx.chooseImage({
      count: 5 - that.data.imgs.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片 
        var imgs = that.data.imgs;
        imgs = imgs.concat(res.tempFilePaths);
        that.setData({
          imgs: imgs
        })
      }
    })
  },
  DeleteImg(e) { //删除图片
    var that = this;
    var index = e.currentTarget.dataset.index;
    var imgs = that.data.imgs;

    wx.showModal({
      cancelColor: '#999999',
      cancelText: '取消',
      confirmColor: '#262626',
      confirmText: '确定',
      content: '确定要删除该图片吗？',
      showCancel: true,
      title: '温馨提示',
      success: (res) => {
        if (res.confirm) {
          imgs.splice(index, 1);
          that.setData({
            imgs: imgs
          })
        }
      }
    })
  },
  chooseFileOpt() { //上传文件
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: "file",
      extension: ["pdf", "doc", "docx", "PDF", "DOC", "DOCX", ],
      success: function (res) {

        that.setData({
          fujian: res.tempFiles[0].name
        })
      }
    })
  },
  getAddress(e) { //获取地址
    var that = this;
    that.setData({
      address: e.detail.value
    })
  },
  getMark(e) { //获取体会
    var that = this;
    that.setData({
      mark: e.detail.value
    })
  },
  cancelOpt() { //取消
    wx.navigateBack({
      delta: 1,
    })
  },
  postOpt() { //提交操作
    var that = this;
    var id = that.data.id,
      title = that.data.title, //标题
      info = that.data.info, //内容
      imgs = that.data.imgs, //图片
      imgdesc = that.data.imgdesc, //图片说明
      fujian = that.data.fujian, //附件
      fujianUrl = that.data.fujianUrl, //附件上传地址
      address = that.data.address, //地址
      mark = that.data.mark; //体会

    if (title == "") {
      WxRequest.ShowAlert("请输入标题");
    } else if (info == "") {
      WxRequest.ShowAlert("请输入实践报告");
    } else if (imgs.length == 0) {
      WxRequest.ShowAlert("请选择照片");
    } else if (address == "") {
      WxRequest.ShowAlert("请输入实践地址");
    } else if (mark == "") {
      WxRequest.ShowAlert("请输入实践体会");
    } else {
      //TODO 请求接口提交报错
      wx.showToast({
        title: '提交成功',
        duration: 2000
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 2000);
    }
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