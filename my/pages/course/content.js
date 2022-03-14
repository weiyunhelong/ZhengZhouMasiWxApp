// my/pages/course/content.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chktab: 1, //1:稿件管理 2:申诉管理 3:草稿箱
    chksubtab: -1, //-1全部 0审核中 1已通过 2未通过
    pageindex: 1,
    pagesize: 10,
    list:[],
    mark: "",
    reason:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tapTab(e) { //切换tab
    var that = this;
    that.setData({
      chktab: e.currentTarget.dataset.type,
      chksubtab: -1,
      pageindex:1
    })
    that.InitData();
  },
  tapsubTab(e) { //切换tab
    var that = this;
    that.setData({
      chksubtab: e.currentTarget.dataset.tab,
      pageindex:1
    })
    that.InitData();
  },
  replayOpt(e) { //重新申请
    var that = this;
    var dataobj = e.detail;
    that.setData({
      showMask: true,
      showMaskAni: true,
      reason:dataobj.Cause
    })
  },
  getMark(e) { //获取申请的内容
    this.setData({
      mark: e.detail.value
    })
  },
  replyOpt() { //提交申请
    var that = this;
    var mark = that.data.mark;

    if (mark == "") {
      WxRequest.ShowAlert("请输入申请的内容");
    } else {
      //TODO 
      wx.showToast({
        title: '提交申请成功',
      })
      that.setData({
        showMaskAni: false
      })
      setTimeout(() => {
        that.setData({
          showMask: false
        })
      }, 1000);
    }
  },
  hideMaskOpt() { //关闭遮罩层
    var that = this;
    that.setData({
      showMaskAni: false
    })
    setTimeout(() => {
      that.setData({
        reason:"",
        mark:"",
        showMask: false
      })
    }, 1000);
  },
  ShowMore() { //加载更多
    var that = this;
    that.setData({
      pageindex: that.data.pageindex + 1
    })
    that.InitData();
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
    if (getApp().globalData.WxUserId == 0) {
      wx.reLaunch({
        url: '../../../wxauth/pages/wxlogin/index',
      })
    } else {
      //获取数据总揽
      that.InitData();
    }
  },
  InitData(){ //获取数据
    var that=this;
    var chktab=parseInt(that.data.chktab), //1:稿件管理 2:申诉管理 3:草稿箱
    chksubtab=that.data.chksubtab, //-1全部 0审核中 1已通过 2未通过
    pageindex=that.data.pageindex,
    pagesize=that.data.pagesize;

    var url=requestUrl+"/API/UserCenterManuApi/GetManuListWhereState";
    var params="?page="+pageindex+"&rows="+pagesize+"&userid="+getApp().globalData.WxUserId+"&datatype="+chktab;
    switch(chktab){
      case 1:
        params+='&state='+chksubtab+'&type=-1';break;
        case 2:
        params+='&state='+chksubtab+'&type=-1';break;
        case 3:
        params+='&type='+chksubtab+'&state=-1';break;
    }
    WxRequest.PostRequest(url+params,{}).then(res=>{
      if(res.data.success){
        if(pageindex==1){
          that.setData({
            list:res.data.data.datas
          })
        }else{
          that.setData({
            list:that.data.list.concat(res.data.data.datas) 
          })
        }
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