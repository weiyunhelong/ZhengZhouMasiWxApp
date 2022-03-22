// my/pages/course/dynamic.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chktab: 1, //1:我的评论 2:我的赞 3:我的收藏
    chksubtab: -1, //0专栏稿件 1视频稿件 2红读 3四史 4主题
    pageindex: 1,
    pagesize: 10,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tapTab(e) { //切换tab
    var that = this;
    that.setData({
      chktab:parseInt(e.currentTarget.dataset.type),
      chksubtab: -1,
      pageindex: 1
    })
    that.InitData();
  },
  tapsubTab(e) { //切换tab
    var that = this;
    that.setData({
      chksubtab: e.currentTarget.dataset.tab,
      pageindex: 1
    })
    that.InitData();
  },
  showMore(){//加载更多
    var that = this;
    that.setData({
      pageindex: 1+that.data.pageindex
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
    getApp().ChargeLogin().then(res => {
      if (getApp().globalData.WxUserId == 0) {
        wx.navigateTo({
          url: '../../../wxauth/pages/wxlogin/index',
        })
      } else {
        //获取数据总揽
        that.InitData();
      }
    })
  },
  InitData() { //获取列表数据
    var that = this;
    var chktab = that.data.chktab; //1:我的评论 2:我的赞 3:我的收藏
    var chksubtab =  that.data.chksubtab; //-1全部 0专栏稿件 1视频稿件 2红读 3四史 4主题
    var pageindex =  that.data.pageindex;
    var pagesize =  that.data.pagesize;
    var url=requestUrl+"/API/UserCenterManuApi";
    switch(chktab){
      case 1:
        url+='/GetCommentListWhereUser';break;
        case 2:
        url+='/GetLikesListWhereUser';break;
        case 3:
        url+='/GetCollectionListWhereUser';break;
    }
    var params='?type='+chksubtab+'&page='+pageindex+'&rows='+pagesize+'&userid='+getApp().globalData.WxUserId;
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