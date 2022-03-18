// pages/test/test.js
var requestUrl = getApp().globalData.requestUrl;
const time = require('../../utils/time.js');
var WxRequest = require('../../utils/WxRequest.js');
var timer = ""; //倒计时

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clock: "", //倒计时
    showMask: false,
    showMaskAni: false,
    showModal: false,
    showModalAni: false,
    showResult: false,
    showResultAni: false,
    list: [],
    chkoption: -1,
    index: 1,
    sumNum: 0, //题目总数 单选，判断，多选
    questionobj: {},
    ZiMus: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    answereds: [], //已答题的下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      tid: options.tid, //试卷id
      tgid: options.tgid, //成绩单id
      clock: options.clock + ":00"
    })

    //倒计时
    timer = setInterval(function () {
      var minNum =parseInt(that.data.clock.split(':')[0]);
      var secNum = parseInt(that.data.clock.split(':')[1]);
      if (parseInt(minNum == 0) && secNum == 0) { //倒计时结束
        that.confirmOpt();
      } else {
        minNum = secNum - 1 < 0 ? minNum - 1 : minNum;
        secNum = secNum - 1 < 0 ? 59 : secNum - 1;
        minNum = minNum < 10 ? '0' + minNum : minNum;
        secNum = secNum < 10 ? '0' + secNum : secNum;
        that.setData({
          clock: minNum + ":" + secNum
        })
      }
    }, 1000);
    //获取题目
    that.InitData();

  },
  InitData() { //获取题目
    var that = this;
    var url = requestUrl + "/API/ExamAnswer/TestQuestionPaperInfo?id=" + that.data.tid + "&uid=" + getApp().globalData.WxUserId;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        var dataobj = res.data.data;
        var list = dataobj.SingleChoiceList.concat(dataobj.JudgeList).concat(dataobj.MultipleChoiceList);
        that.setData({
          list: list,
          dataobj: dataobj,
          sumNum: list.length,
        })
        //获取题目
        that.InitQuestion(1);
        that.InitAnsereds();
      }
    })
  },
  InitAnsereds() { //获取已经答题
    var that = this;
    var list = that.data.list;
    var answereds = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].UserAnswer != '' && list[i].UserAnswer != null) {
        answereds.push(i + 1);
      }
    }
    that.setData({
      answereds: answereds
    })
  },
  InitQuestion(index) { //获取题目
    var that = this;
    var list = that.data.list;
    var index = index - 1;
    var questionobj = list[index];

    that.setData({
      questionobj: questionobj,
      chkoption: that.GetZiMuIndex(questionobj.UserAnswer, questionobj.TypeID)
    })

  },
  GetZiMuIndex(zimu, type) { //获取选中下标
    var that = this;
    var index = -1,
      ZiMus = that.data.ZiMus;

    if (type == 2) { //多选
      var szmu = zimu.split(','),
        result = [];

      for (var j = 0; j < szmu.length; j++) {
        for (var i = 0; i < ZiMus.length; i++) {
          if (szmu[j] == ZiMus[i]) {
            result.push(i);
            break;
          }
        }
      }
      index = result.join(',');

    } else { //单选和判断
      for (var i = 0; i < ZiMus.length; i++) {
        if (zimu == ZiMus[i]) {
          index = i;
          break;
        }
      }
    }

    return index;
  },
  tapOneOption(e) { //单选和判断，点击选中
    var that = this;
    that.setData({
      chkoption: e.currentTarget.dataset.index
    })
    //提交答案
    var url = requestUrl + "/API/ExamAnswer/SaveAnswerAecord?tid=" + that.data.tid + "&uid=" + getApp().globalData.WxUserId + "&qid=" + that.data.questionobj.QuestionID + "&tgid=" + that.data.tgid + "&myanswer=" + that.Deal2Anser(that.data.chkoption, 1);
    WxRequest.PostRequest(url, {}).then(res => {
      //更新用户答案
      that.UpdateUserAnser(that.Deal2Anser(that.data.chkoption, 1));
      //记录已答题记录
      that.AddToAnswered();

    });

  },
  tapThreeOption(e) { //多选，点击选中
    var that = this;
    var chkoption = that.data.chkoption == -1 ? [] : (that.data.chkoption + "").split(',');
    var index = e.currentTarget.dataset.index;
    var ishas = -1;
    for (var i = 0; i < chkoption.length; i++) {
      if (index == chkoption[i]) {
        ishas = i;
      }
    }
    if (ishas != -1) {
      chkoption.splice(ishas, 1);
    } else {
      chkoption.push(index);
    }
    var chkoption = chkoption.length == 0 ? -1 : chkoption.join(',');
    that.setData({
      chkoption: chkoption
    })

    //提交答案
    if (chkoption != -1) {
      var url = requestUrl + "/API/ExamAnswer/SaveAnswerAecord?tid=" + that.data.tid + "&uid=" + getApp().globalData.WxUserId + "&qid=" + that.data.questionobj.QuestionID + "&tgid=" + that.data.tgid + "&myanswer=" + that.Deal2Anser(that.data.chkoption, 2);
      WxRequest.PostRequest(url, {}).then(res => {
        //更新用户答案
        that.UpdateUserAnser(that.Deal2Anser(that.data.chkoption, 2));
        //记录已答题记录
        that.AddToAnswered(1);

      });
    } else {
      //更新用户答案
      that.UpdateUserAnser(-1);
      //删除用户记录已答题记录
      that.AddToAnswered(0);
    }


  },
  UpdateUserAnser(answer) { //更新用户答案
    var that = this;

    var list = that.data.list;
    var index = that.data.index - 1;
    list[index].UserAnswer = answer;
    that.setData({
      list: list
    })
  },
  AddToAnswered(type) { //记录已答题记录
    var that = this;
    var answereds = that.data.answereds;
    var index = that.data.index;
    var ishas = -1;
    for (var i = 0; i < answereds.length; i++) {
      if (answereds[i] == index) {
        ishas = i;
        break;
      }
    }
    if (type == 0) {
      answereds.splice(ishas, 1);
      that.setData({
        answereds: answereds
      })
    } else if (ishas == -1) {
      answereds.push(index);
      that.setData({
        answereds: answereds
      })
    }
  },
  nomove() {
    return false;
  },
  postOpt() { //交卷操作
    this.setData({
      showMask: true,
      showMaskAni: true,
    })
  },
  cancelOpt() {
    this.setData({
      showMaskAni: false,
    })
    setTimeout(() => {
      this.setData({
        showMask: false
      })
    }, 1000);
  },
  confirmOpt() { //提交试卷
    var that = this;

    var url = requestUrl + "/API/ExamAnswer/SubmitTestPaper?tid=" + that.data.tid + "&uid=" + getApp().globalData.WxUserId + "&tgid=" + that.data.tgid;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          showMaskAni: false,
          showMask: false,
          score:res.data.data.TestGrade
        })
        setTimeout(() => {
          that.setData({
            showResult: true,
            showResultAni: true
          })
        }, 500);
      } else {
        WxRequest.ShowAlert(res.data.data);
      }

    })
  },
  knowOpt() { //继续答题
    var that = this;
    that.setData({
      showResult: true,
      showResultAni: true
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  checkOpt() { //查看答题过程
    this.setData({
      showModal: true,
      showModalAni: true,
    })
  },
  cancelModal() {
    this.setData({
      showModalAni: false,
    })
    setTimeout(() => {
      this.setData({
        showModal: false
      })
    }, 1000);
  },
  preOpt() { //上一题
    var that = this;
    var index = that.data.index - 1;
    that.setData({
      index: index
    })
    that.InitQuestion(index);
  },
  nextOpt() { //下一题
    var that = this;
    if (that.data.chkoption == -1) {
      WxRequest.ShowAlert("请做出你的选择");
    } else {
      var index = that.data.index + 1;
      that.setData({
        index: index,
      })
      that.InitQuestion(index);
    }
  },
  Deal2Anser(optiontxt, type) { //选项转化
    var that = this;
    if (type != 2) { //单选和判断
      return that.data.ZiMus[optiontxt];
    } else { //多选
      var arrys = optiontxt.split(',');
      var result = [];
      for (var i = 0; i < arrys.length; i++) {
        result.push(that.data.ZiMus[arrys[i]]);
      }
      return result.join(',');
    }
  },
  changeIndex(e) { //切换题目
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      index: index + 1
    })
    that.InitQuestion(index);
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