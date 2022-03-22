// app.js
var WxRequest = require('./utils/WxRequest.js');

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onShow() {
    var that = this;

    //下载字体文件
    that.DownFontFile();

    //更新微信小程序代码
    that.UpdateWxCode();

  },
  ChargeLogin() { //判断用户是否登录
    var that = this;

    return new Promise((resolve, reject) => {

      wx.getStorage({
        key: "loginObj",
        success: function (res) {

          if (res.data.indexOf('&type=3') > -1) { //微信快捷登录
            wx.login({
              success: res => {

                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {

                  //发送res.code 到后台
                  wx.request({
                    url: that.globalData.requestUrl + '/API/SmallProgramInfo/GetOpenIdByCode?code=' + res.code,
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    },
                    success: function (ress) {

                      if (ress.data.success) {

                        var wxurl = that.globalData.requestUrl + "/API/LoginApi/WXLogin?openid=" + ress.data.data.openid;
                        WxRequest.PostRequest(wxurl, {}).then(resobj => {

                          if (resobj.data.success) {
                            that.globalData.userInfo = resobj.data.data;
                            that.globalData.WxUserId = resobj.data.data.UserId;
                            var resArg = resobj.data.data.UserId;
                            resolve(resArg);
                          } else {
                            that.globalData.WxUserId = 0;
                            resolve(0);
                          }
                        })
                      } else {
                        that.globalData.WxUserId = 0;
                        resolve(0);
                      }
                    },
                    fail() {
                      that.globalData.WxUserId = 0;
                      resolve(0);
                    }
                  })
                }
              },
              fail: res => {
                reject();
              }
            })
          } else { //账户密码登录

            var accounts = res.data.replace('&type=1', '').replace('&type=2', '').split('&');
            wx.request({
              url: that.globalData.requestUrl + "/API/LoginApi/Login?account=" + accounts[0].split('=')[1] + "&password=" + accounts[1].split('=')[1],
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              },
              success: function (ress) {

                if (ress.data.success) {

                  //成功返回数据后，将openid值存储到localStorage中
                  that.globalData.userInfo = ress.data.data;
                  that.globalData.WxUserId = ress.data.data.UserId;
                  var resArg = ress.data.data.UserId;
                  resolve(resArg);

                } else {
                  that.globalData.WxUserId = 0;
                  resolve(0);
                }

              },
              fail() {
                that.globalData.WxUserId = 0;
                resolve(0);
              }
            })
          }
        },
        fail: function () {
          wx.login({
            success: res => {

              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              if (res.code) {

                //发送res.code 到后台
                wx.request({
                  url: that.globalData.requestUrl + '/API/SmallProgramInfo/GetOpenIdByCode?code=' + res.code,
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                  },
                  success: function (ress) {

                    if (ress.data.success) {

                      //成功返回数据后，将openid值存储到localStorage中
                      that.globalData.openId = ress.data.data.openid;
                      that.globalData.WxUserId = 0;
                      var resArg = ress.data.data.openid;
                      resolve(resArg);

                    } else {
                      that.globalData.WxUserId = 0;
                      resolve(0);
                    }

                  },
                  fail() {
                    that.globalData.WxUserId = 0;
                    resolve(0);
                  }
                })
              }
            },
            fail: res => {
              that.globalData.WxUserId = 0;
              resolve(0);
            }
          })
        }
      })

    })
  },
  DownFontFile() { //下载字体

    wx.loadFontFace({
      global: true,
      family: 'PangMenZhengDao',
      source: 'url("https://zhengzhousizheng.oss-cn-beijing.aliyuncs.com/zujired/%E5%BA%9E%E9%97%A8%E6%AD%A3%E9%81%93%E7%B2%97%E4%B9%A6%E4%BD%936.0.ttf")',
      success: function () {
        console.error('下载成功');
      },
      fail: function (err) {
        console.error('下载失败' + err)
      }
    })
  },
  UpdateWxCode() { //更新微信小程序代码
    var that = this
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      //1. 检查小程序是否有新版本发布
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //检测到新版本，需要更新，给出提示
          wx.showModal({
            title: '更新提示',
            content: '检测到新版本，是否重启小程序？',
            success: function (res) {
              if (res.confirm) {
                //2. 用户确定下载更新小程序，小程序下载及更新静默进行
                that.downLoadAndUpdate(updateManager)
              } else if (res.cancel) {
                //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                wx.showModal({
                  title: '温馨提示~',
                  content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                  showCancel: false, //隐藏取消按钮
                  confirmText: "确定更新", //只保留确定更新按钮
                  success: function (res) {
                    if (res.confirm) {
                      //下载新版本，并重新应用
                      that.downLoadAndUpdate(updateManager)
                    }
                  }
                })
              }
            }
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  downLoadAndUpdate: function (updateManager) { //下载小程序新版本并重启应用
    var that = this

    //下载更新小程序新版本
    updateManager.onUpdateReady(function () {

      //最新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate();
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      })
    })

  },
  globalData: {
    userInfo: null, //用户信息
    openId: "", //openid
    userType: 1, //1：学生 2：教师
    WxUserId: 0, //userId204
    requestUrl: "https://edu.vrkejiao.com", //接口地址
    tabbar: [{
        pagePath: "pages/home/index",
        iconPath: "/custom-tab-bar/imgs/home.png",
        selectedIconPath: "/custom-tab-bar/imgs/homeh.png",
        text: "首页"
      },
      {
        pagePath: "pages/jiyin/index",
        iconPath: "/custom-tab-bar/imgs/jiyin.png",
        selectedIconPath: "/custom-tab-bar/imgs/jiyinh.png",
        text: "红色基因"
      },
      {
        pagePath: "pages/course/index",
        iconPath: "/custom-tab-bar/imgs/course.png",
        selectedIconPath: "/custom-tab-bar/imgs/courseh.png",
        text: "进德学堂"
      },
      {
        pagePath: "pages/kecheng/index",
        iconPath: "/custom-tab-bar/imgs/kecheng.png",
        selectedIconPath: "/custom-tab-bar/imgs/kechengh.png",
        text: "创课中心"
      }
    ],
  }
})