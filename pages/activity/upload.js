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
    taskid: 0,
    title: "", //标题
    info: "", //内容
    fujian: "", //附件
    fujianUrl: "", //附件上传地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id,
      taskid: options.taskid
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
  chooseFileOpt() { //上传文件
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: "file",
      extension: ["pdf", "doc", "docx", "PDF", "DOC", "DOCX", ],
      success: function (res) {

        wx.showLoading({
          title: '上传中...',
          mask: true
        })
        OssTool.uploadPdfFile(res.tempFiles[0].path, 'course/shijianbaogao/' + getApp().globalData.WxUserId + '/',
          function (result) {
            that.setData({
              fujian: res.tempFiles[0].name,
              fujianUrl: result
            })
            wx.hideLoading();
          },
          function (result) {
            WxRequest.ShowAlert("上传失败" + result);
            wx.hideLoading();
          }
        )
      }
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
      fujian = that.data.fujian, //附件
      fujianUrl = that.data.fujianUrl; //附件上传地址

    if (title == "") {
      WxRequest.ShowAlert("请输入标题");
    } else if (info == "") {
      WxRequest.ShowAlert("请输入内容");
    } else if (fujian == "") {
      WxRequest.ShowAlert("请添加附件");
    } else {
      //TODO 请求接口提交
      var url = requestUrl + "/API/PracticalActivity/UploadWork";
      var params = {
        PracticalID:parseInt(id),
        TaskID:parseInt(that.data.taskid),
        UserID: getApp().globalData.WxUserId,
        Title: title,
        Contents: info,
        AccessoryUrl: fujianUrl
      };
      WxRequest.PostFormRequest(url, params).then(res => {
        if (res.data.success) {
          wx.showToast({
            title: '提交成功',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 2000);
        } else {
          WxRequest.ShowAlert(res.data.msg);
        }
      })
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