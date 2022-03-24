// chat/pages/chat/wechat.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');
var OssTool = require('../../../ossutils/uploadFile.js');
var timeTool = require('../../../utils/time.js'); //封装的方法
var timer = ''; //计时器

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    type: 0, //1:实践群 2:讨论组
    showModal: false, //显示操作浮层
    showMask: false, //发送作品浮层
    showMaskAni: false, //浮层动画
    list: [1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    works: [], //作品
    courses: [], //实践课程
    masktype: -1, //浮窗类型1:实践课程 2:作品
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    that.setData({
      groupid: options.id,
      type: options.type,
      userId: getApp().globalData.WxUserId
    })

    //获取用户在群聊中的角色
    that.InitMeRole();
    //获取对话的自己信息
    that.InitMeInfo();
    //获取作品
    that.InitWork();
    //获取实践课程
    that.InitCourse();
  },
  InitMeRole() { //获取用户在群聊中的角色
    var that = this;
    var url = requestUrl + "/UserPublicDataAPI/PostUserGroupUserType?userid=" + that.data.userId + "&gid=" + that.data.groupid;
    WxRequest.PostRequest(url, {}).then(res => {
      that.setData({
        userAuth: res.data.data.UserType
      })
    })
  },
  InitMeInfo() { //获取对话的自己信息
    var that = this;
    var url = requestUrl + "/SingleChatInfo/PostUserInfo?UserId=" + that.data.userId;
    WxRequest.PostRequest(url, {}).then(res => {
      that.setData({
        oopenid: that.data.userId,
        oname: res.data.data.NickName,
        oavataUrl: res.data.data.Avatar,
      })
      //获取历史消息
      that.InitOldHistory();
    })
  },
  InitWork() { //获取作品
    var that = this;
    var url = requestUrl + "/API/QualityWorksApi/GetQualityWorksList?page=1&rows=100";
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          works: res.data.data.datas
        })
      }
    })
  },
  InitCourse() { //获取实践课程
    var that = this;
    var url = requestUrl + "/API/PracticalTeaching/GetMorePracticalTeachingList?page=1&rows=100";
    WxRequest.PostRequest(url, {}).then(res => {
      that.setData({
        courses: res.data.data.datas
      })
    })
  },
  InitOldHistory() { //获取历史消息
    var that = this;
    var url = requestUrl + "/API/GroupsInfo/GetGroupMsgNewList?keywords=&userId=" + that.data.userId + "&gid=" + that.data.groupid + "&queryTime=" + timeTool.formatNowTime();

    WxRequest.PostRequest(url, {}).then(res => {

      if (res.data.success) {
        that.setData({
          list: res.data.data.datas
        })
        //获取未读消息
        that.InitHistory(1);
        timer = setInterval(() => {
          that.InitHistory(0);
        }, 2000);
      }
      setTimeout(() => {
        that.setData({
          showLoading: false,
          btmv: that.data.btmv
        })
      }, 2000);
    })
  },
  InitHistory(type) { //获取历史消息
    var that = this;
    var url = requestUrl + "/API/GroupsInfo/GetGroupMsgNewListByNew?keywords=&userId=" + getApp().globalData.openId + "&objId=" + getApp().globalData.CompanyID + "&gid=" + that.data.groupid + "&queryTime=" + timeTool.formatNowTime();

    WxRequest.PostRequest(url, {}).then(res => {

      if (res.data.success) {
        that.setData({
          list: that.data.list.concat(res.data.data.datas),
          btmv: type == 1 ? "btmv1" : ""
        })
      }
      setTimeout(() => {
        that.setData({
          showLoading: false
        })
      }, 2000);
    })
  },
  showMoreData() { //加载更多
    var that = this;
    that.setData({
      pageindex: 1 + that.data.pageindex
    })
    that.InitHistory(1);
  },
  freshData() { //刷新数据
    var that = this;
    that.setData({
      pageindex: 1,
      msgtxt: "",
    })
    that.InitHistory(1);
  },
  previewImg(e) { //预览图片
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
    })
  },
  goCourseOpt(e) { //实践课程
    wx.navigateTo({
      url: '../../../pages/course/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  goWorkOpt(e) { //作品详情
    wx.navigateTo({
      url: '../../../pages/work/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  goGrouper() { //组成员
    var that = this;
    wx.navigateTo({
      url: '../chat/member?id=' + that.data.id,
    })
  },
  goInvite() { //邀请新成员
    var that = this;
    wx.navigateTo({
      url: '../chat/invite?groupid=' + that.data.groupid,
    })
  },
  sendMsg(e) { //发送模板消息
    var that = this;
    var msg = e.detail.value;
    if (msg == "") {
      WxRequest.ShowAlert("请输入发送的消息");
    } else {
      //TODO 发送文字消息
      that.sendMsg2Server(msgtxt, 1);
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
      success: function (res) {

        wx.showLoading({
          title: '上传中...',
          mask: true
        })

        OssTool.uploadImgFile(res.tempFilePaths[0], 'chatmsg/' + getApp().globalData.WxUserId + '/',
          function (result) {
            //发送消息
            that.sendMsg2Server(result, 2);
          },
          function (result) {
            WxRequest.ShowAlert("上传失败");
            wx.hideLoading();
          }
        )

      }
    })
  },
  showMaskOpt(e) { //显示浮窗
    var that = this;
    that.setData({
      showMask: true,
      showMaskAni: true,
      masktype: e.currentTarget.dataset.type
    })
  },
  hideMaskOpt() { //收起浮窗
    var that = this;
    that.setData({
      showMaskAni: false
    })
    setTimeout(() => {
      that.setData({
        masktype: -1,
        showMask: false
      })
    }, 1000);
  },
  sendCheckCourseOpt(e) { //发送选择课程操作
    var that = this;
    var obj = e.currentTarget.dataset.obj;
    var content = obj.ID + "," + obj.Title + "," + obj.AuthorName + "," + item.Thumbnail;
    //TODO 发送消息
    that.sendMsg2Server(content, 4);

  },
  sendCheckWorkOpt(e) { //发送选择作品操作
    var that = this;
    var obj = e.currentTarget.dataset.obj;
    var content = obj.ID + "," + obj.Title + "," + obj.UserName + "," + item.Thumbnail;
    //TODO 发送消息
    that.sendMsg2Server(content, 3);

  },
  sendMsg2Server(content, type) { //发送信息 1:文字 2:图片 3:作品 4:课程
    var that = this;
    var url = requestUrl + "/API/GroupsInfo/PostGroupMsg";
    var userInfo = getApp().globalData.userInfo;
    var params = {
      GroupID: that.data.groupid,
      UserID: that.data.userId,
      UserName: userInfo.NickName,
      UserPic: userInfo.AvataUrl,
      MsgType: type,
      SendTime: timeTool.formatNowTime(),
      Description: content,
      DataType: 0,
      Duration: 0, //时长
    };
    WxRequest.PostRequest(url, params).then(res => {
      if (res.data.success) {
        that.freshData();
        wx.hideLoading();
        wx.showToast({
          title: '发送成功',
          duration: 1000,
        })
      }
    })
  },
  jiesanOpt() { //解散群组
    var that = this;

    wx.showModal({
      cancelColor: '#666666',
      cancelText: '取消',
      confirmColor: '#000000',
      confirmText: '确定',
      content: '确定要解散此讨论组吗',
      showCancel: true,
      title: '',
      success: (result) => {
        if (result.confirm) {
          //TODO　请求接口解散群组
          var url = requestUrl + "/API/GroupsInfo/PostDeleteGroupInfo?gId=" + that.data.groupid + "&UserId=" + getApp().globalData.WxUserId;
          WxRequest.PostRequest(url, {}).then(res => {
            if (res.data.success) {
              wx.showToast({
                title: '解散成功',
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
      }
    })
  },
  OutGroupOpt() { //退出群组
    var that = this;
    var url = requestUrl + "/API/GroupsInfo/DeleteGroupItem?gId=" + that.data.groupid + "&userids=" + that.data.userId;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        wx.showToast({
          title: '退出成功',
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
  },
  setOpt() { //讨论组设置
    var that=this;
    wx.navigateTo({
      url: '../chat/set?id='+that.data.groupid,
    })
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