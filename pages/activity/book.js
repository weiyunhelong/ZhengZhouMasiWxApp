// pages/activity/book.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');
var validator = require('../../utils/validator.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    taskid:0,
    name: "",
    phone: "",
    studyno:"",
    departments:["计算机与科学","经济管理","土木工程","环境管理"],
    dindex:-1,
    majors:["软件工程","网络安全","国际商务","税务审计",],
    mindex:-1,
    classess:["20190101","20200101","20210101","20210201"],
    cindex:-1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      taskid:options.taskid,
    })
  },
  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getStudyno(e) {
    this.setData({
      studyno: e.detail.value
    })
  },
  departmentchange(e) {
    this.setData({
      dindex: e.detail.value
    })
  },
  majorchange(e) {
    this.setData({
      mindex: e.detail.value
    })
  },
  classeschange(e) {
    this.setData({
      cindex: e.detail.value
    })
  },
  postOpt() {
    var that=this;
    var id=that.data.id,
    name=that.data.name,
    phone=that.data.phone,
    studyno=that.data.studyno,
    departments=that.data.departments,
    dindex=that.data.dindex,
    majors=that.data.majors,
    mindex=that.data.mindex,
    classess=that.data.classess,
    cindex=that.data.cindex;

    if(name==""){
      WxRequest.ShowAlert("请输入姓名");
    }else if(phone==""){
      WxRequest.ShowAlert("请输入手机号");
    }else if(!validator.validateMobile(phone)){
      WxRequest.ShowAlert("手机号不正确");
    }else if(studyno==""){
      WxRequest.ShowAlert("请输入学号");
    }else if(dindex==-1){
      WxRequest.ShowAlert("请选择院系");
    }else if(mindex==-1){
      WxRequest.ShowAlert("请选择专业");
    }else if(cindex==-1){
      WxRequest.ShowAlert("请选择班级");
    }else{
      //TODO 请求接口
      var url=requestUrl+"/API/PracticalActivity/ApplyActivity";
      var params={
        PracticalID:that.data.id,
        ProjectID:that.data.taskid,
        UserID:getApp().globalData.WxUserId,
        Name:name,
        Phone:phone,
        StuNum:studyno,
        DepartmentID:departments[dindex].ID,
        ProfessionalID:majors[mindex].ID,
        ClassID:classess[cindex].ID,
      };
      WxRequest.PostRequest(url,params).then(res=>{
        if(res.data.success){
          wx.showToast({
            title: '报名成功',
            duration:2000
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 2000);
        }else{
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