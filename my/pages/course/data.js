// my/pages/course/data.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');
import * as echarts from '../../../ec-canvas/echarts';
var lineChart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chktab: 1, //0专栏稿件 1视频稿件 2红读 3四史 4主题
    ecline: {
      lazyLoad: true,
    },
    days: ['近30天', '近14天', '近7天'],
    chkday: 0, //选择的天
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.lineComponent = this.selectComponent('#mychart-dom-line');
  },
  InitChart(xData, yData1, yData2, yData3, yData4, yData5) {
    var that = this;
    that.lineComponent.init((canvas, width, height) => {
      // 初始化图表
      const lineComponent = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      lineComponent.setOption(that.getLineOption(xData, yData1, yData2, yData3, yData4, yData5), true);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return lineComponent;
    });
  },
  getLineOption(xData, yData1, yData2, yData3, yData4, yData5) { //初始化图表
    return {
      tooltip: {
        formatter: '{c}'
      },
      legend: {
        x: 'center',
        y: 'bottom',
        icon: 'roundRect',
        itemWidth: 7,
        itemHeight: 2,
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: xData,
        axisLine: {
          show: true
        },
        axisLabel: {
          color: '#999'
        },
        splitLine: {
          show: false
        }
      }],
      yAxis: [{
        type: 'value',
        axisLine: {
          show: false
        },
        axisLabel: {
          color: '#999'
        },
        splitLine: {
          show: false
        }
      }],
      series: [{
        name: '浏览数',
        type: 'line',
        smooth: true,
        data: yData1,
        itemStyle: {
          normal: {
            color: '#FF7575',
            lineStyle: {
              color: '#FF7575'
            }
          }
        },
      }, {
        name: '评论数',
        type: 'line',
        smooth: true,
        data: yData2,
        itemStyle: {
          normal: {
            color: '#FFBB5F',
            lineStyle: {
              color: '#FFBB5F'
            }
          }
        },
      }, {
        name: '分享数',
        type: 'line',
        smooth: true,
        data: yData3,
        itemStyle: {
          normal: {
            color: '#5BCFC4',
            lineStyle: {
              color: '#5BCFC4'
            }
          }
        },
      }, {
        name: '点赞数',
        type: 'line',
        smooth: true,
        data: yData4,
        itemStyle: {
          normal: {
            color: '#4B82F5',
            lineStyle: {
              color: '#4B82F5'
            }
          }
        },
      }, {
        name: '收藏数',
        type: 'line',
        smooth: true,
        data: yData5,
        itemStyle: {
          normal: {
            color: '#B57AFF',
            lineStyle: {
              color: '#B57AFF'
            }
          }
        },
      }]
    };
  },
  tapTab(e) { //切换类型
    var that = this;
    that.setData({
      chktab: e.currentTarget.dataset.type
    })
    that.InitData();
    that.InitChartData();
  },
  chooseDayOpt() {
    var that = this;
    wx.showActionSheet({
      itemList: that.data.days,
      success: (result) => {

        that.setData({
          chkday: result.tapIndex
        })
        that.InitChartData();
      }
    })
  },
  InitChartData() { //初始化折线图

    var that = this;
    var chktab = that.data.chktab, //选中的tab
      chkday = that.data.chkday; //选择的天
    var url = requestUrl + "/API/UserCenterManuApi/DataWhereDate?userid=" + getApp().globalData.WxUserId + "&typeid=" + chktab + "&day=" + (chkday == 0 ? 30 : (chkday == 1 ? 14 : 7));
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        var dataobj = res.data.data;
        var xData = dataobj.Date;
        var yData1 = dataobj.browse;
        var yData2 = dataobj.comment;
        var yData3 = dataobj.share;
        var yData4 = dataobj.likes;
        var yData5 = dataobj.collection;
        that.InitChart(xData, yData1, yData2, yData3, yData4, yData5);
      }
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
        that.InitData();
        //获取图形数据
        that.InitChartData();
      }
    })

  },
  InitData() { //获取数据
    var that = this;
    var url = requestUrl + "/API/UserCenterManuApi/DataScreening?userid=" + getApp().globalData.WxUserId + "&&typeid=" + that.data.chktab;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          dataobj: res.data.data
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