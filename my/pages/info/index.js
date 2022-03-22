// my/pages/info/index.js
var WxRequest = require('../../../utils/WxRequest.js');
var validator = require('../../../utils/validator.js');
var requestUrl = getApp().globalData.requestUrl;
var OssTool = require('../../../ossutils/uploadFile.js');

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

  },
  chooseTxOpt(){//替换头像
    var that = this;
    
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片 
        OssTool.uploadImgFile(res.tempFilePaths[0], 'avatarUrl/' + getApp().globalData.openId + '/',
          function (result) {
            var userInfo=that.data.userInfo;
            var url=requestUrl+"/API/UserCenterApi/UpdateUserAvatar?userid="+getApp().globalData.WxUserId+"&useravatar="+result;
            WxRequest.PostRequest(url,{}).then(res=>{
              if(res.data.success){
                userInfo.Avatar=result;
                getApp().globalData.userInfo=userInfo;
                that.setData({
                  userInfo:userInfo
                })
              }
            })
          })
      }
    })
  },  
  goNickName(){
    var that=this;
    wx.navigateTo({
      url: '../info/nickname?name='+that.data.userInfo.NickName+"&type=1",
    })
  },
  goName(){
    var that=this;
    wx.navigateTo({
      url: '../info/nickname?name='+that.data.userInfo.ReadName+"&type=2",
    })
  },
  goDescOpt(){
    wx.navigateTo({
      url: '../info/desc',
    })
  },
  goSexOpt(){
    var that=this;
    wx.showActionSheet({
      itemList: ["保密","男","女"],
      success:function(res){
        var index=res.tapIndex;
        var url=requestUrl+"/API/UserCenterApi/UpdateUserSex?userid="+getApp().globalData.WxUserId+"&usersex="+index;
        WxRequest.PostRequest(url,{}).then(res=>{
          if(res.data.success){
            var userInfo=that.data.userInfo;
            userInfo.Sex=index;
            getApp().globalData.userInfo=userInfo;
            that.setData({
              userInfo:userInfo
            })
          }else{
            WxRequest.ShowAlert(res.data.msg);
          }
        })
      }
    })
  },
  goPwdOpt(){
    wx.navigateTo({
      url: '../info/pwd',
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
    var that = this;

    getApp().ChargeLogin().then(res => {
      if (getApp().globalData.WxUserId == 0) {
        wx.navigateTo({
          url: '../../../wxauth/pages/wxlogin/index',
        })
      } else {
        //获取数据总揽
        that.setData({
          userInfo:getApp().globalData.userInfo
        });
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