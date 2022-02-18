//promise get请求方式
function GetRequest(url, params) {
  var promise = new Promise((resolve, reject) => {

    //网络请求
    wx.request({
      url: url,
      data: params,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) { //服务器返回数据
        resolve(res);
      },
      fail: function (e) {
        reject('网络超时出错');
      }
    })
  });
  return promise;
}


//promise post请求方式
function PostRequest(url, params) {
  var that=this;
  var promise = new Promise((resolve, reject) => {

    //网络请求
    wx.request({
      url: url,
      data: params,
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=utf-8',
      },
      success: function (res) { //服务器返回数据
        
        resolve(res);
       
      },
      fail: function (e) {
        reject("网络请求出错",e);
      }
    })
  });
  return promise;
}

//promise post请求方式
function PostFormRequest(url, params) {
  var that=this;
  var promise = new Promise((resolve, reject) => {

    //网络请求
    wx.request({
      url: url,
      data: params,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      success: function (res) { //服务器返回数据
        
        resolve(res);
       
      },
      fail: function (e) {
        reject("网络请求出错",e);
      }
    })
  });
  return promise;
}
//查询用户信息
function GetWxUserInfo() {
  var promise = new Promise((resolve, reject) => {

    //网络请求
    wx.request({
      url: getApp().globalData.requesturl+"/member/query_member_info",
      data: {
        UserSessionId:getApp().globalData.openId
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=utf-8',
      },
      success: function (res) { //服务器返回数据
        resolve(res.data);       
      },
      fail: function (e) {
        reject('网络超时出错');
      }
    })
  });
  return promise;
}


//上传图片
function UploadImgOpt(file) {
  var promise = new Promise((resolve, reject) => {

    wx.uploadFile({
      url: getApp().globalData.requesturl+"/plugins/upload_image", //仅为示例，非真实的接口地址
      filePath:file,
      name: 'imagefile',
      success (ress){
       var resobj=JSON.parse(ress.data);
        if(resobj.Result=="2001"){
          //resolve(resobj.ShortUrl);
          resolve(resobj);
        }else{
          reject(resobj.Message);
        }
       
      },
      fail: function (e) {
        reject('网络超时出错');
      }
    })
  });
  return promise;
}

// 弹窗提示
function ShowAlert(msg) {
  wx.showToast({
    title: msg,
    icon: 'none'
  })
}


//对外暴露的方法
module.exports = {
  GetRequest: GetRequest, //Get请求的方式
  PostRequest: PostRequest, //POST请求的方式
  ShowAlert: ShowAlert, //弹窗提示  
  GetWxUserInfo:GetWxUserInfo,//查询用户信息
  UploadImgOpt:UploadImgOpt,//上传图片
  PostFormRequest:PostFormRequest,//表单提交
}