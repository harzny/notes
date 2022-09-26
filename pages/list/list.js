// pages/list/list.js
import {queryList,deleteById,setTop,verifyNoteEncryption,setClassify,queryEncryption,queryDeleteList,recoverDeleted} from '../../api/note'
import{getUserInfo,verifyEncryption} from "../../api/user"
import {queryList as classifyList} from '../../api/classify'

var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //判断是验证还是加密
    isVerify:"",
    //搜索的内容
    noteTitle:'',
    //底部提醒的
    isShowTip:true,
    noteList:[],
      //主菜单
      //控制快捷菜单的显示
      operShow: false,
      operActions: [
       
      ],
      //控制侧边菜单的显示
      sideShow:false,
      //当前选择note的ID
      currentNoteId:0,
      //点击加密的弹窗
       showConfirm:false,
      //账号是否设置了密码箱
       hasEncryption:true,
       //验证密码的弹窗
       checkConfirm:false,
       //加密的密码
        encryption:'',
      //分类菜单
      classifyShow: false,
      classifyActions: [
      
      ],
  },
  //搜索功能
  search(e){
    console.log(e.detail);
    this.setData({
      noteTitle:e.detail
    })
    this.getList()
  },
  refresh(){
    this.getList()
  },
  closeTip(){
    this.setData({
      isShowTip:false
    })
    wx.setStorage({
      key: 'noteTipShow',
      data: false,
    })  
  },
  //跳转到编辑页面
  toEdit(e){
    var note=e.currentTarget.dataset.item
    if (note.isEncryption) {
      this.setData({
        isVerify:true,
        checkConfirm:true,
        currentNoteId:note.noteId
      })
    }else{
      wx.navigateTo({
        //把id传到edit页面
        url: '/pages/edit/edit?id='+ note.noteId +'&noteTitle='+note.notetitle,
      })
    }
   
  },

  // 显示快捷菜单
  showOper(e) {
    var note=e.currentTarget.dataset.item;
    if (note.uptAct == "D") {
      var actions = [{
        name: '取消删除',
      }];
      // this.setData({
      //   operShow: true,
      //   currentNoteId: note.id,
      //   operActions: actions,
      //   nowNote: note,
      //   isEncryption: note.isEncryption,
      //   isTop: note.isTop,
      // })
    }else
    var actions=[{
      name: note.isTop?'取消置顶':'置顶',
    },
    {
      name: '删除',
    },
    {
      name:note.isEncryption?"取消加密" : '加密',
    },
    {
      name: '分类',
    },
    {
      name: '复制',
    },];
    this.setData({
      operShow: true,
      currentNoteId: note.noteId,
      operActions:actions,
      nowNote:note
    })
  },

    // 关闭快捷菜单
    operClose() {
    this.setData({ operShow: false });
  },

     // 显示分类菜单
      showClassify(){
        this.setData({ 
          classifyShow: true, 
        });
      },
      // 关闭分类菜单
      closeClassify() {
        this.setData({ classifyShow: false });
      },

      // 显示侧边菜单
      sideShow(){
        this.setData({ sideShow: true });
      },
      //显示所有的便签
      getAll() {
        this.setData({
          noteTitle: ""
        })
        app.globalData.currentClassify = null
        this.getList()
        this.closeSide()
      },
      //回收站
      getDeleteList(){
          queryDeleteList().then(res=>{
            if (res.code==200) {
              this.setData({
                noteList: res.data,
                sideShow:false
              })
              wx.showToast({
                title: "操作成功",
              })
            }
          })
      },
        // 关闭侧边菜单
      closeSide() {
        this.setData({ sideShow: false });
      },
      //验证密码的操作
      checkEncryption(){
        if(this.data.isVerify){
          verifyEncryption({encryption:this.data.encryption}).then(res=>{
            this.closeCkeck()
            if(res.code==200){
              wx.navigateTo({
                url: '/pages/edit/edit?id=' + this.data.currentNoteId,
              })
            }
          })
      }else{
        verifyNoteEncryption({
          encryption:this.data.encryption,
          noteId:this.data.currentNoteId
        }).then(res=>{
          if (res.code==200) {
            this.getList()
            this.setData({
              checkConfirm:false,//关闭弹窗
              encryption:'' //密码置空
            })
          setTimeout(() => {
            wx.showToast({
              title:res.msg,
            })
          }, 100);
            this.operClose()
          }
        })
      }
      },
      closeCkeck(){
        this.setData({
          checkConfirm: false, //关闭弹窗
          encryption: '' //密码置空
        })
      },
    //选择快捷菜单的功能
    operSelect(e ){
      // console.log(e);
      switch(e.detail.name){
        case "置顶":
          console.log(this.data.currentNoteId);
            setTop({noteId:this.data.currentNoteId}).then(res=>{
              console.log(res);
              if (res.code==200) {
                wx.showToast({
                  title: res.msg,
                  duration:1000,
                 success:()=>{
                   setTimeout(() => {
                   this.getList()
                   }, 400);
                 }
                })
              }
              this.operClose()
            })
          break;
        case "取消置顶":
          setTop({noteId:this.data.currentNoteId}
            ).then(res=>{
            if (res.code==200) {
              wx.showToast({
                title: "取消成功",
                success:()=>{
                  setTimeout(() => {
                  this.getList()
                  }, 400);
                this.operClose()
                }
              })
            }
           })
         break;
        case "删除":
          deleteById(this.data.currentNoteId).then(res=>{
            if (res.code==200) {
              this.operClose()
              wx.showToast({
                success:()=>{
                  setTimeout(() => {
                    this.getList();
                   }, 1000);
                },
                title: "删除成功"
              })
            }
          })
          break;
        case "取消删除":
          recoverDeleted(this.data.currentNoteId).then(res=>{
            if (res.code==200) {
              wx.showToast({
                title: res.msg,
              })
              this.getDeleteList()
              this.operClose()
            }
          })
          break;
          case "加密":
          //判断是否有密码箱
          if (this.data.hasEncryption) {
            this.setData({
              checkConfirm:true,
              isVerify:false
            })
          } else {
            this.setData({
              showConfirm:true,
              isVerify:false
            })
          }
          break;
        case"取消加密":
        this.setData({
          checkConfirm:true,
          isVerify:false
        })
        break;
        case "分类":
          this.operClose()
          this.showClassify()
          break;
        case "复制":
          if(!this.data.nowNote.isEncryption){
            wx.setClipboardData({
              data: this.data.nowNote.noteContent,
            })
          }else{
            wx.showToast({
              title: '加密内容不可复制',
            })
          }
          this.operClose()
          break;
      }
    },

    toUser(){
      wx.reLaunch({
        url: '/pages/user/user',
      })
    },
    //选择分类菜单的功能
    classifySelect(e ){
      console.log(this.data.currentNoteId);
       console.log(e.detail.classifyId);
       setClassify({
         noteId:this.data.currentNoteId,
         classifyId:e.detail.classifyId
       }).then(res=>{
          wx.showToast({
            title: '添加成功',
          })
          this.closeClassify()
      })
    },
    //查询列表便签
    getList() {
      queryList({
        noteTitle:this.data.noteTitle,
        classifyId:app.globalData.currentClassify?app.globalData.currentClassify.classifyId:""
      }).then(res => {
        this.setData({
          noteList: res.data
        })
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 同步形式
    var isShowTip = wx.getStorageSync('noteTipShow')
    // console.log(isShowTip);
  
    // 如果读取出来的数据长度<=0 空的，直接结束
    if (isShowTip.length <= 0) {
      return
    }
    // 设置显示状态
    this.setData({
      // isShowTip: isShowTip,
      // 增强写法，如果属性名称和变量名称一样，可以使用增强写法，等价于上面一句
      isShowTip
    })
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
    if (app.globalData.currentClassify && app.globalData.currentClassify.id == 0) {
      queryEncryption().then(res => {
        this.setData({
          noteList: res.data
        })
      })
    } else {
      //查询便签列表
      this.getList()
    }
    getUserInfo().then(res => {
      this.setData({
        hasEncryption: res.data.encryption != null && res.data.encryption.length > 0
      })
    })
    classifyList().then(res => {
      var list = res.data.map((item, index) => {
        //map的作用是将结果进行一个处理然后放到新的数组中
        item.name = item.classifyName
        return item
      })


      this.setData({
        classifyActions: list
      })
    })
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