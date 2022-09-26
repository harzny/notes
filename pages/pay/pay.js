// pages/pay/pay.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
      index:'',
      moneyAll: "",
      oldmoneyAll:"0.00",
      displayClick:"none"
    },
    useMath(e) {
      this.setData({
        index:e.currentTarget.dataset.index
      })
      if(e.currentTarget.dataset.index=="+"){
        if (this.data.oldmoneyAll=="0.00") {
          this.setData({
            oldmoneyAll:this.data.moneyAll,
            moneyAll:""
          })
        }else{
          var money=Number(this.data.oldmoneyAll)+Number(this.data.moneyAll)
          this.setData({
            oldmoneyAll:money,
            moneyAll:""
          })
          console.log(money);
        }
      }
      if(e.currentTarget.dataset.index=="-"){
        if (this.data.oldmoneyAll=="0.00") {
          var money=Number(this.data.oldmoneyAll)-Number(this.data.moneyAll)
          this.setData({
            oldmoneyAll:money,
            moneyAll:""
          })
        }else{
          var money=Number(this.data.oldmoneyAll)-Number(this.data.moneyAll)
          this.setData({
            oldmoneyAll:money,
            moneyAll:""
          })
        }
      }
  
    },
    btnClick(e) {
      this.setData({
        index:e.currentTarget.dataset.index
      })
      var money = this.data.moneyAll
      if (money == "") {
        money = e.currentTarget.dataset.index;
        this.setData({
          moneyAll: this.data.moneyAll + money
        })
        console.log(this.data.moneyAll);
      } else {
        this.setData({
          moneyAll: this.data.moneyAll + e.currentTarget.dataset.index
         
        })
        console.log(this.data.moneyAll);
      }
    },

    deleteMath(e) {
      this.setData({
        index:e.currentTarget.dataset.index
      })
      var money = this.data.moneyAll
      if (money != "") {
        var newmoney = money.substr(0, money.length - 1);
        console.log(newmoney);
        this.setData({
          moneyAll: newmoney
        })
      }
    },
    deleteAllMath(e){
      this.setData({
        index:e.currentTarget.dataset.index
      })
      var money = this.data.moneyAll
      if (money != "") {
        this.setData({
          moneyAll: ""
        })
      }
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