var fileHost = "https://idcardassets.oss-cn-shanghai.aliyuncs.com/";//你的oss地址
var config = {
  //aliyun OSS config
  uploadImageUrl: `${fileHost}`,
  AccessKeySecret: '6ycmXbtjbqD9EYUjZCbSebYe9j5jzU',//登录oss控制台查看
  OSSAccessKeyId: 'LTAI4GDV8Sy6mkYBaC72yRDB',//登录oss控制台查看
  timeout: 60000
};
module.exports = config