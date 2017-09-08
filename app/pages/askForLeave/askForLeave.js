//获取应用实例
var app = getApp()
//Page()注册一个页面，接收一个object，指定页面的初始数据、生命周期函数、事件处理函数等
Page({
	// 页面的初始数据
	data:{
		companyName: '我是公司名',
		location_address_name: null,
		pickerArr: ['个人事务','因公外出','其他'],
		pickerIndex: 0
	},
	// 页面加载，一个页面只会调用一次
	onLoad:function(options){
		this.setData({
			location_address_name: wx.getStorageSync('location_address_name')
		})
	},
	onReady:function(){
		
	},
	onShow:function(){
		
	},
	onHide:function(){
		
	},
	onUnload:function(){
		
	},
	onPullDownRefresh:function(){
		
	},
	onReachBottom:function(){
		
	},
	leavePickerChange: function(e){
		console.log('picker发送选择改变，携带值为', e.detail.value)
	    this.setData({
			pickerIndex: e.detail.value
	    })
	},
	submitLeave: function(){

		//提示提交请假说明
		wx.showToast({
			title: '待建设',
			icon: 'success',//仅支持success或者loading
			duration: 2000
		})
	}
})		