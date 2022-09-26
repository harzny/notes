// pages/account/account.js
import {queryList} from "../../api/bill"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    //日历的显示
    calendarShow:false,
    //账单详情的显示
    menuShow:false,
    Accountlist:[],
    sumMoney:0,
    show: false,
    minDate: new Date(2021, 0, 1).getTime(),
    maxDate: new Date(2022, 0, 31).getTime(),
  },
  openCalendar(){
    this.setData({
      calendarShow:true
    })
  },
  closeCalendar(){
    this.setData({
      calendarShow:false
    })
  },

  openMenuShow(){
    this.setData({
      menuShow:true
    })
  },

  closeMenuShow(){
    this.setData({
      menuShow:false
    })
  },

  selectDate(e){
    this.setData({
      showDate:false
    })
    var year = e.detail.getFullYear()
    var mouth=e.detail.getMonth()+1;
    var day=e.detail.getDate();
    console.log(year+"-"+mouth+"-"+day)
  },
  queryList(){
    queryList().then(res=>{
      this.setData({
        Accountlist:res.data,
      })
      this.getTotlaPrice()
    })
  },
  getTotlaPrice(){
    var sum=0;
    var newList=this.data.Accountlist
    newList.forEach(function (item,index){
      if (item.list) {
        item.list.forEach(function (item,index){
          if (item.price) {
            sum=sum+item.price
          }
        })
        item.total = sum;
        sum=0
      }
    });
    this.setData({
      Accountlist:newList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
this.queryList()
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