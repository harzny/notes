// pages/insertBill/insertBill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastImage:"",
    lastIndex:null,
    updateDate:"",
    moneyAll:"",
    oldmoneyAll:"0.00",
    
    image:[
      {
        id:1,
        url:"/assets/icon/零食.svg",
        name:"零食",
        selectUrl:'',
        isSelect:""
      },{
        id:2,
        url:"/assets/icon/衣服.svg",
        name:"衣服",
        selectUrl:'',
        isSelect:""
      },
      {
        id:3,
        url:"/assets/icon/公交车.svg",
        name:"公交",
        selectUrl:'',
        isSelect:""
      },{
        id:4,
        url:"/assets/icon/旅行.svg",
        name:"旅行",
        selectUrl:'',
        isSelect:""
      }
    ],

  },
  selectImage(e){
    var that=this
    var id=e.currentTarget.dataset.id
    var newList=[...this.data.image]
    this.data.image.forEach(function(item,index){
      item.isSelect=false
      if(id == item.id){
        item.isSelect=true
        item.selectUrl="/assets/icon/定位.svg"
        newList[index]=item
      }
    })
    this.setData({
      image:newList
    })
  },
// 
  useMath(e) {
    console.log(e.currentTarget.dataset.id);
    if(e.currentTarget.dataset.id=="+"){
      if (this.data.oldmoneyAll=="0.00") {
        this.setData({
          oldmoneyAll:this.data.moneyAll,
          moneyAll:""
        })
        console.log(this.data.oldmoneyAll);
      }else{
        var money=Number(this.data.oldmoneyAll)+Number(this.data.moneyAll)
        this.setData({
          oldmoneyAll:money,
          moneyAll:""
        })
        console.log(money);
      }
    }
    if(e.currentTarget.dataset.id=="-"){
      if (this.data.oldmoneyAll=="0.00") {
        var money=Number(this.data.oldmoneyAll)-Number(this.data.moneyAll)
        this.setData({
          oldmoneyAll:money,
          moneyAll:""
        })
        console.log(this.data.oldmoneyAll);
      }else{
        var money=Number(this.data.oldmoneyAll)-Number(this.data.moneyAll)
        this.setData({
          oldmoneyAll:money,
          moneyAll:""
        })
        console.log(money);
      }
    }

  },
  setMath(e) {
    var money = this.data.moneyAll
    if (money == "") {
      money = e.currentTarget.dataset.id;
      this.setData({
        moneyAll: this.data.moneyAll + money
      })
      console.log(this.data.moneyAll);
    } else {
      this.setData({
        moneyAll: this.data.moneyAll + e.currentTarget.dataset.id
      })
      console.log(this.data.moneyAll);
    }

  },
  deleteMath() {
    var money = this.data.moneyAll
    if (money != "") {
      var newmoney = money.substr(0, money.length - 1);
      console.log(newmoney);
      this.setData({
        moneyAll: newmoney
      })
    }


  },
  deleteAllMath(){
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
  onLoad: function (options) {

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