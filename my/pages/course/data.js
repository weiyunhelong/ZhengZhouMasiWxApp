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
    chktab: 1, //1:我的视频 2:我的专栏
    ecline: {
      onInit: function (canvas, width, height, dpr) {

        lineChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(lineChart);
        lineChart.setOption(getLineOption([], [], [], [], [], []), true);
        return lineChart;
      }
    },
    days:['近30天','近14天','近7天'],
    chkday: 0, //选择的天
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tapTab(e) { //切换类型
    var that = this;
    that.setData({
      chktab: e.currentTarget.dataset.type
    })
    that.InitChartData();
  },
  chooseDayOpt(){
    var that=this;
    wx.showActionSheet({
      itemList: that.data.days,
      success: (result) => {
       
        that.setData({
          chkday:result.tapIndex
        })
        that.InitChartData();
      }
    })
  },
  InitChartData() { //初始化折线图

    var that = this;
    var chktab = that.data.chktab, //选中的tab
      chkday = that.data.chkday; //选择的天

    var xData = ["11.01", "11.02", "11.03", "11.04", "11.05", "11.06", "11.07", "11.08"];
    var yData1 = [],
      yData2 = [],
      yData3 = [],
      yData4 = [],
      yData5 = [];
    for (var i = 0; i < xData.length; i++) {
      yData1.push(parseInt(Math.random() * 1000));
      yData2.push(parseInt(Math.random() * 1000));
      yData3.push(parseInt(Math.random() * 1000));
      yData4.push(parseInt(Math.random() * 1000));
      yData5.push(parseInt(Math.random() * 1000));
    }
    lineChart.setOption(getLineOption(xData, yData1, yData2, yData3, yData4, yData5), true);
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

//初始化图表
function getLineOption(xData, yData1, yData2, yData3, yData4, yData5) {
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
}