import {getHistoryList} from '../../api/tianxing'
// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowDate:null,
    list:'',
    dialogShow:false,
    currentLsdate:'',
    currentTitle:'',
  },
   format(num){
    if(num<10){
     return '0'+num;
    }
    return num
  },
  openDialog(e){
    console.log(e);
    this.setData({
      dialogShow:true,
      currentLsdate:e.currentTarget.dataset.lsdate,
      currentTitle:e.currentTarget.dataset.title
    })
  },
  closeDialog(){
    this.setData({
      dialogShow:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var now=new Date();
    var date={
      year:now.getFullYear()+'',
      month:this.format(now.getMonth()+1)+'',
      date:this.format(now.getDate())+'',
    }
    this.getInfo(now),
    this.setData({
      nowDate:date,
    })
    // wx.showLoading({
    //   title: '加载中',
    // })
    // // setTimeout(() => {
    //   wx.request({
    //     url: 'http://api.tianapi.com/lishi/index',
    //     month:"GET",
    //     data:{
    //       key:'0cbd563b8f1b8c1ea6ebd957d64c9e09',
    //       date:this.format(now.getMonth()+1)+this.format(now.getDate()),
    //     },
    //     success:res=>{
    //       //获取结果
    //       console.log(res);
    //       var list=res.data.newslist;
    //      var list= list.map(item=>{
    //         item.lsdate=item.lsdate.split("-")[0];
    //         return item
    //       })
    //       this.setData({
    //         list,
    //       })
    //     },
    //     //结束关闭“加载中”
    //     complete:()=>{
    //       wx.hideLoading({
    //         success: (res) => {},
    //       })
    //     }
    //   })
    // }, 3000);
 
  },
    getInfo(now){
      getHistoryList({
        date:this.format(now.getMonth()+1)+this.format(now.getDate())
      }).then(res=>{
            var list=res.newslist;
             var list= list.map(item=>{
                item.lsdate=item.lsdate.split("-")[0];
                return item
              })
              this.setData({
                list,
             })
             console.log(list);
      });
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})