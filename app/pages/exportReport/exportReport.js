//获取应用实例
var app = getApp()
//Page()注册一个页面，接收一个object，指定页面的初始数据、生命周期函数、事件处理函数等
Page({
	data:{
		logoUrl:null,
		companyName: null,
		emailArr: [],
		emailInputVal:null
	},
	onLoad:function(options){
		var companyName = wx.getStorageSync('companyName')
		var logoUrl = wx.getStorageSync('logoUrl')
		var emailArr = wx.getStorageSync('emailList')
		this.setData({
			companyName: companyName,
			logoUrl: logoUrl
		})
	},
	delEmail:function(e){
		var that = this
		var emailbtnid = e.currentTarget.dataset.emailbtnid
		wx.showModal({
			title: '提示',
			content: '删除:'+that.data.emailArr[emailbtnid],
			showCancel: true,
			cancelText: '取消',
			cancelColor: '#000000',
			confirmText: '确定',
			confirmColor: '#3CC51F',
			success: function(res) {
				if (res.confirm) {					
					// console.log('btnid='+emailbtnid)
					that.data.emailArr.splice(emailbtnid,1)
					// console.log(that.data.emailArr)
					that.setData({
						emailArr:that.data.emailArr
					})
				}
			}
		})
	},
	emailBlur:function(e){
		// console.log(e.detail.value)
		this.data.emailInputVal = e.detail.value
	},
	addEmail:function(){
		// console.log(this.data.emailInputVal)
		var emailInputVal = this.data.emailInputVal
		if (emailInputVal) {
			if (this.inArray(emailInputVal,this.data.emailArr)) {//邮箱已存在
				wx.showToast({
					title: '邮箱已存在',
					icon: 'success',//仅支持success或者loading
					duration: 2000
				})
			}
			else {//邮箱不存在
				this.data.emailArr.push(emailInputVal)
				var emailArr = this.data.emailArr
				this.setData({
					emailArr: emailArr,
					emailInputVal: null
				})
			}
		}
	},
	//判断值是否在数组中
	inArray:function(value, array){
	    var i = array.length;
	    while (i--) {
	        if (array[i] === value) {
	            return true;
	        }
	    }
	    return false;
	},
	next:function(){
		var emailArr = this.data.emailArr
		wx.setStorageSync('emailList', emailArr)
		wx.navigateTo({
		  url: '../chooseStartAndEnd/chooseStartAndEnd'
		})
	}
})