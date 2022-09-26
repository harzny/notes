// pages/user/user.js
import{getUserInfo,setEncryption,verifyEncryption} from "../../api/user"
//获取全局变量
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:{
      avatar:'/assets/icon/touxiang.png',
      userName:"",
    },
    baseUrl:"",
    //保险箱的显示
    dialogShow:false,
    encryption:'',
    repeatEncryption:'',
    hasEncryption:false,
    errorMessage:null
  },
  userDetail(){
    wx.navigateTo({
      url: '/pages/userInfo/userInfo?userAccount='+this.data.user.userAccount,
    })
  },

  //点击保险箱显示Dialog
  showDialog(){
    this.setData({
      dialogShow:true
    })
  },
  closeDialog(){
    this.setData({
      dialogShow:false,
      encryption:"",
      repeatEncryption:"",
      errorMessage:null
    })
  },

  //验证
  encryption(){
    if (this.data.hasEncryption) {
      verifyEncryption({
        encryption:this.data.encryption
      }).then(res=>{
        this.closeDialog()
        if (res.code==200) {
          wx.showToast({
            title:"验证成功",
            duration:1000,
            success:()=>{
              setTimeout(() => {
                  app.globalData.currentClassify={
                    id:0,
                    classifyName:"加密"
                  }
                  wx.switchTab({
                    url: '/pages/list/list',
                  })
              }, 500);
            }
          })
        }
      })
    } else {
      if (this.data.encryption!=this.data.repeatEncryption) {
        this.setData({
          errorMessage:"两次密码不一致"
        })
        return
      }
      console.log("准备加密");
      setEncryption({
        encryption:this.data.encryption
      }).then(res=>{
       if (res.code==200) {
         wx.showToast({
           title: '密码设置成功',
           duration:1000,
           success:()=>{
             setTimeout(() => {
                //  设置成功之后在查询一次用户信息
                this.getUserInfo()
             }, 1000);
           }
         })
         this.closeDialog()
       }
      })
    }
  },
  input(){
    this.setData({
      errorMessage:null
    })
  },
  //查询用户信息
  getUserInfo(){
    getUserInfo().then(res=>{
      console.log(res);
      this.setData({
        user:res.data,
        baseUrl:app.globalData.httpPath,
        hasEncryption:res.data.encryption !=null && res.data.encryption.length>0 //不等于null为true 为null就是false
      })
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
    this.getUserInfo()
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