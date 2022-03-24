// pages/group/create.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');
var uploadTool = require('../../ossutils/uploadFile'); //上传到OSS

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseid: 0,
    name: "",
    logo: "",
    list: [],
    pageindex: 1,
    chkIds: [],
    id: 0, //讨论组
    showloadingMask: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      courseid: options.id
    })
  },
  logoOpt() { //上传logo
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {

        uploadTool.uploadImgFile(res.tempFilePaths[0], 'tupians/' + getApp().globalData.openId + '/',
          function (result) {
            that.setData({
              logo: result
            })
          },
          function (result) {
            WxRequest.ShowAlert("上传图片失败");
          }
        )
      }
    })
  },
  getName(e) { //获取群名称
    var that=this;
   
    wx.showModal({
      cancelColor: '#999999',
      cancelText: '取消',
      confirmColor: '#262626',
      confirmText: '确认',
      content: '',
      editable: true,
      placeholderText: '请输入讨论名称',
      showCancel: true,
      title: '设置讨论名称',
      success: (result) => {
        that.setData({
          name:result.content
        })
      }
    })
  },
  ShowMoreDta() { //添加群成员
    var that = this;
    that.setData({
      pageindex: 1 + that.data.pageindex
    })
    that.InitMember();
  },
  chkTapOpt(e) { //点击操作
    var that = this;
    var list = that.data.list,
      chkIds = [];
    var id = e.currentTarget.dataset.id;
    for (var i = 0; i < list.length; i++) {
      if (id == list[i].ID) {
        list[i].IsChk = !list[i].IsChk;
        break;
      }
    }
    for (var i = 0; i < list.length; i++) {
      if (list[i].IsChk) {
        chkIds.push(list[i].ID);
      }
    }
    that.setData({
      list: list,
      chkIds: chkIds,
    })
  },
  saveOpt() { //创建操作
    var that = this;
    var
      logo = that.data.logo,
      name = that.data.name,
      chkIds = that.data.chkIds;

    if (logo == '') {
      WxRequest.ShowAlert("请上传讨论头像");
    } else if (name == "") {
      WxRequest.ShowAlert("请输入讨论名称");
    } else if (name.length < 2 || name.length > 12) {
      WxRequest.ShowAlert("名称长度在2-12字长");
    } else if (chkIds.length == 0) {
      WxRequest.ShowAlert("请选择成员");
    } else {
      var url = requestUrl + "/API/GroupsInfo/CreatGroupInfo";
      var params = {
        Title: name,
        GroupLeaderID: getApp().globalData.WxUserId,
        GroupImg: logo,
        Industry: 0,
        ProvinceName:"",
        CityName: "",
        AreaName: "",
        UserIds: chkIds.join(','),
      };
      WxRequest.PostRequest(url, params).then(res => {
        if (res.data.success) {
          wx.showToast({
            title: '创建成功',
          })
          setTimeout(() => {
            wx.switchTab({
              url: '../group/index',
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
    wx.hideShareMenu({
      menus: ['shareAppMessage', 'shareTimeline'],
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.InitMember();
  },
  InitMember() { //获取成员列表

    var that = this;
    var pageindx = that.data.pageindex;
    var chkkind = that.data.chkkind;
    var url = requestUrl + "/API/XRIdeology/HomeDateList?uid=" + getApp().globalData.WxUserId + "&dataType=" + chkkind;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        if (pageindx == 1) {
          that.setData({
            list: res.data.data.CourseCenter.concat(res.data.data.Fourhistories), //res.data.data.datas
          })
        } else {
          that.setData({
            list: that.data.list.concat(res.data.data.RedGene)
          })
        }
      }
      setTimeout(() => {
        wx.hideLoading();
        that.setData({
          showloadingMask: false
        })
      }, 1000);
    })
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