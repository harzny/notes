var BASE_URL="http://api.tianapi.com";
var key="0cbd563b8f1b8c1ea6ebd957d64c9e09";
var request=(config)=>{
  return new Promise((reslove,reject)=>{
    wx.showLoading({
      title: '加载中',
    })
  
      wx.request({
        url: BASE_URL+config.url,
        method:config.method,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
         },
        data:{
          key,
          data:config.data,
        },
        success:res=>{
          reslove(res.data)
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