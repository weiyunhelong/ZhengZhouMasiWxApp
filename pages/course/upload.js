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

        const tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;

        wx.showLoading({
          title: '上传中...',
          mask: true
        })

        for (var i = 0; i < tempFilePaths.length; i++) {
          var index = i;
          OssTool.uploadImgFile(tempFilePaths[i], 'course/shijianbaogao/' + getApp().globalData.WxUserId + '/',
            function (result) {
              imgs.push(result);
              that.setData({
                imgs: imgs
              })
              if (index == tempFilePaths.length - 1) {
                wx.hideLoading();
              }
            },
            function (result) {
              WxRequest.ShowAlert("上传失败" + result);
              wx.hideLoading();
            }
          )

        }
        //
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
  getImgdesc(e) { //获取图片说明
    this.setData({
      imgdesc: e.detail.value
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
      fujianUrl = that.data.fujianUrl, //附件上传地址
      address = that.data.address, //地址
      mark = that.data.mark; //体会

    if (title == "") {
      WxRequest.ShowAlert("请输入标题");
    } else if (info == "") {
      WxRequest.ShowAlert("请输入实践报告");
    } else if (imgs.length == 0) {
      WxRequest.ShowAlert("请选择照片");
    } else {
      //TODO 请求接口提交
      var url = requestUrl + "/API/PracticalTeaching/UploadReport";
      var params = {
        PracticalID: id,
        UserID: getApp().globalData.WxUserId,
        Title: title,
        Contents: info,
        Thumbnail: imgs.join('|'),
        ImgExplain: imgdesc,
        Experience: mark,
        AccessoryUrl: fujianUrl,
        Address: address
      };
      WxRequest.PostRequest(url, params).then(res => {
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