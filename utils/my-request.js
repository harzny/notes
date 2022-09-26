var BASE_URL="http://127.0.0.1:8088/notes";
var request=(config)=>{
  return new Promise((reslove,reject)=>{
    // 获取本地保存的token
    var token = wx.getStorageSync('Authorization')
    // console.log(token);
    wx.showLoading({
      title: '加载中',
    })
      wx.request({
        url: BASE_URL+config.url,
        method:config.method,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization":token
         },
         data:config.data,
        success:res=>{
          if (res.data.code==401) {
            //如果登录失败先把token删掉
            wx.removeStorageSync('Authorization')
            wx.showToast({
              title: res.data.msg||"登录过期",
              icon:"error",
              success:()=>{
               setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/login/login',
                })
               }, 1500);
              }
            })
            return
          }else if (res.data.code==200){
            reslove(res.data)
          
          } else{
            wx.showToast({
              title: res.data.msg||'操作失败',
              icon:"error",
              duration:500,
            })
          }
        },
        fail:err=>{
          reject(err)
        },
        //结束关闭“加载中”
        complete:()=>{
          wx.hideLoading()
        }
      })
  })
}
export{
  request
}