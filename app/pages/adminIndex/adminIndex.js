//获取应用实例
var app = getApp()
//Page()注册一个页面，接收一个object，指定页面的初始数据、生命周期函数、事件处理函数等
Page({
	// 页面的初始数据
	data:{
		companyName: ''
	},
	// 页面加载，一个页面只会调用一次
	onLoad:function(options){
		this.setData({
			companyName: wx.getStorageSync('companyName')
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
	setAddressAndRules(){
		wx.navigateTo({
		  url: '../setCompanyAddress/setCompanyAddress'
		})
	},
	exportReport(){
		wx.navigateTo({
		  url: '../exportReport/exportReport'
		})
	},
	setDepartment(){
		wx.showModal({
			title: '提示',
			content: '建设中',
			showCancel: false,
			confirmText: '确定',
			confirmColor: '#3CC51F'
		})
		return
		wx.navigateTo({
		  url: '../setDepartmentIndex/setDepartmentIndex'
		})
	}
})