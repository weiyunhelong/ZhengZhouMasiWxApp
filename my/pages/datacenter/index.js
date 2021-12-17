// my/pages/datacenter/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

import * as echarts from '../../../ec-canvas/echarts';
var lineChart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ecline: {
      onInit: function (canvas, width, height, dpr) {

        lineChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(lineChart);
        lineChart.setOption(getLineOption([], [], [], [], []), true);
        return lineChart;
      }
    },
    chktab: 0, //选中的tab
    chkkind: 0, //选中的类型
    chkday: 0, //选择的天
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tapTab(e) { //切换tab操作
    var that = this;
    that.setData({
      chktab: e.currentTarget.dataset.tab
    })
    that.InitChartData();
  },
  tapKind(e) { //切换分类
    var that = this;
    that.setData({
      chkkind: e.currentTarget.dataset.tab
    })
    that.InitChartData();
  },
  chkDayOpt(e) { //切换天
    var that = this;
    that.setData({
      chkday: e.currentTarget.dataset.day
    })
    that.InitChartData();
  },
  InitChartData() { //初始化折线图

    var that = this;
    var chktab = that.data.chktab, //选中的tab
      chkkind = that.data.chkkind, //选中的类型
      chkday = that.data.chkday; //选择的天

    var xData = ["11.01", "11.02", "11.03", "11.04", "11.05", "11.06", "11.07", "11.08"];
    var yData1 = [],
      yData2 = [],
      yData3 = [],
      yData4 = [];
    for (var i = 0; i < xData.length; i++) {
      yData1.push(parseInt(Math.random() * 1000));
      yData2.push(parseInt(Math.random() * 1000));
      yData3.push(parseInt(Math.random() * 1000));
      yData4.push(parseInt(Math.random() * 1000));
    }
    lineChart.setOption(getLineOption(xData, yData1, yData2, yData3, yData4), true);
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

    setTimeout(() => {
      that.InitChartData();
    }, 2000);

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

//初始化图标
function getLineOption(xData, yData1, yData2, yData3, yData4) {
  return {
    tooltip: {
      formatter: '{c}'
    },
    legend: {
      x:'center',
      y:'bottom',
      icon:'rect',
      itemWidth:7,
      itemHeight:2,
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
      name: '浏览',
      type: 'line',
      smooth: true,
      data: yData1,
      itemStyle: {
        normal: {
          color: '#F24540',
          lineStyle: {
            color: '#F24540'
          }
        }
      },
    }, {
      name: '评论',
      type: 'line',
      smooth: true,
      data: yData2,
      itemStyle: {
        normal: {
          color: '#0AA3FC',
          lineStyle: {
            color: '#0AA3FC'
          }
        }
      },
    }, {
      name: '点赞',
      type: 'line',
      smooth: true,
      data: yData3,
      itemStyle: {
        normal: {
          color: '#FCC40A',
          lineStyle: {
            color: '#FCC40A'
          }
        }
      },
    }, {
      name: '收藏',
      type: 'line',
      smooth: true,
      data: yData4,
      itemStyle: {
        normal: {
          color: '#00DE46',
          lineStyle: {
            color: '#00DE46'
          }
        }
      },
    }]
  };
}