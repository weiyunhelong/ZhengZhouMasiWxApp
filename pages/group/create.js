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
    friends: [],
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
  getName(e) { //获取群名称
    this.setData({
      name: e.detail.value
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
  goFriend() { //添加群成员
    var that=this;
    wx.navigateTo({
      url: '../group/user?id='+that.data.courseid,
    })
  },
  deleteOpt(e) { //删除
    var that = this;
    var friends = that.data.friends;
    var index = e.currentTarget.dataset.index;
    friends.splice(index, 1);
    that.setData({
      friends: friends
    })
  },
  saveOpt() { //创建操作
    var that = this;
    var name = that.data.name,
      logo = that.data.logo,
      friends = that.data.friends;

    if (name == "") {
      WxRequest.ShowAlert("请输入讨论组名称");
    } else if (name.length < 2 || name.length > 12) {
      WxRequest.ShowAlert("名称长度在2-12字长");
    } else if (logo == '') {
      WxRequest.ShowAlert("请上传讨论组logo");
    } else if (friends.length == 0) {
      WxRequest.ShowAlert("请添加成员");
    } else {
      var url = requestUrl + "/GroupsInfo/CreatGroupInfo";
      var params = {
        Title: name,
        GroupLeaderID: getApp().globalData.openId,
        GroupImg: logo,
        Industry: hangyes[hindex].Key,
        ProvinceName: region[0],
        CityName: region[1],
        AreaName: region[2],
        UserIds: that.DealFriends(),
      };
      WxRequest.PostRequest(url, params).then(res => {
        if (res.data.success) {
          wx.removeStorage({
            key: 'grouperobj',
          })
          WxRequest.ShowSuccessTip("创建群成功");
          setTimeout(() => {
            wx.navigateTo({
              url: '../../../chatroom/pages/chatroom/group?id=' + res.data.data.GroupID,
            })
          }, 2000);
        } else {
          WxRequest.ShowAlert(res.data.msg);
        }
      })
    }
  },
  DealFriends() { //获取所有的
    var that = this;
    var friends = that.data.friends;
    var txtarry = [];
    for (var i = 0; i < friends.length; i++) {
      txtarry.push(friends[i].SendUserID);
    }
    return txtarry.join(',')
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
    that.GetChkFriendData();
  },
  GetChkFriendData() { //获取选中的好友数据
    var that = this;
    wx.getStorage({
      key: 'grouperobj',
      success: function (res) {
        that.setData({
          friends: res.data
        })
      }
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