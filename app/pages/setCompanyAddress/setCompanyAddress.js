//获取应用实例
var app = getApp()
//Page()注册一个页面，接收一个object，指定页面的初始数据、生命周期函数、事件处理函数等
Page({
	// 页面的初始数据
	data:{
		addressList: [],
		next_disabled: false
	},
	// 页面加载，一个页面只会调用一次
	onLoad:function(options){
		var addressList_tmp = wx.getStorageSync('addressList')
		if (addressList_tmp) {
			this.setData({
				addressList: addressList_tmp
			})
		}
		
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
	addCompanyAddress:function(){
		wx.showLoading({
			title: '加载中',
			mask: true
		})
		var that = this
		wx.chooseLocation({
			success: function(res) {
				wx.hideLoading()
				console.log(res.name);//位置名称
				console.log(res.address);//详细地址
				console.log(res.latitude);//纬度
				console.log(res.longitude);//经度

				var addressName = res.name 	//位置名称
				var latitude = res.latitude
				var longitude = res.longitude
				var companyAddress = {
					name: addressName,
					latitude: latitude,
					longitude: longitude
				}

				var addressExist = app.inArray(companyAddress,that.data.addressList)
				if (addressExist) {
					return false
				}
				//not exist
				// that.data.addressList = []
				var addressList_tmp = that.data.addressList
				addressList_tmp.push(companyAddress)
				that.setData({
					addressList: addressList_tmp
				})
				wx.setStorageSync('addressList', addressList_tmp)
			}
		});
	},
	delAddress:function(e){
		console.log(e)
		var arr = this.data.addressList
		arr.splice(e.currentTarget.dataset.iconIndex,1)
		this.setData({
			addressList: arr
		})
		wx.setStorageSync('addressList', arr)
	},
	next:function(){
		var addressList = this.data.addressList
		console.log(addressList.length)

		if (addressList.length == 0) {
			wx.showModal({
				title: '提示',
				content: '地址不能为空',
				showCancel: false,
				confirmText: '确定',
				confirmColor: '#3CC51F'
			})
			return false
		}

		wx.navigateTo({
		  url: '../setCompanyRules/setCompanyRules'
		})
	}
})