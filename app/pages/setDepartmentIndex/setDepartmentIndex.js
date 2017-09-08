//获取应用实例
var app = getApp()
//Page()注册一个页面，接收一个object，指定页面的初始数据、生命周期函数、事件处理函数等
Page({
	// 页面的初始数据
	data:{
		companyName: '我是公司名',
		department:[
			{name:'研发处',show:true,employees:['wangkj','guoxq']},
			{name:'未分部门员工',show:false,employees:['wangkj1','guoxq1']},
		],
		departmentInputShow:false,
		departmentInputContent:''
	},
	// 页面加载，一个页面只会调用一次
	onLoad:function(options){
		
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
	//显示与隐藏部门员工
	showDepartment:function(e){
		// console.log(e.target.dataset.departmentIdx)
		var departmentIdx = e.target.dataset.departmentIdx
		var tmpShow = this.data.department[departmentIdx].show
		this.data.department[departmentIdx].show = tmpShow ? false : true
		var tmpDepartment = this.data.department
		this.setData({
			department: tmpDepartment
		})
	},
	//修改当前部门
	modifyDepartment:function(e){
		console.log(e.target.dataset.departmentIdx)
		
	},
	//操作当前员工
	handleEmployee:function(e){
		// console.log(e)
		console.log(e.target.dataset.employeeIdx)
	},
	chooseEmployee:function(e){
		console.log(e.detail.value)
	},
	delEmployee:function(){
		wx.showModal({
			title: '提示',
			content: '删除选中员工',
			showCancel: true,
			cancelText: '取消',
			cancelColor: '#000000',
			confirmText: '确定',
			confirmColor: '#3CC51F',
			success: function(res) {
				if (res.confirm) {
					console.log('用户点击确定')
					//删除员工
					//
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},
	showDepartmentInput:function(){
		console.log()
		//显示部门输入框
		this.setData({
			departmentInputShow:true
		})
	},
	getDepartmentInputValue:function(e){
		console.log(e)
		console.log(e.detail.value)
		this.data.departmentInputContent = e.detail.value
	},
	addDepartment:function(){
		// console.log(e.detail.value)
		var that = this
		var departmentName = this.data.departmentInputContent
		if (departmentName) {
			wx.showModal({
				title: '提示',
				content: '添加部门：' + departmentName,
				showCancel: true,
				cancelText: '取消',
				cancelColor: '#000000',
				confirmText: '确定',
				confirmColor: '#3CC51F',
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定')
						
						// 提示
						wx.showToast({
							title: '添加部门成功',
							icon: 'success',//仅支持success或者loading
							duration: 2000
						})
						//清空输入
						that.setData({
							departmentInputContent:''
						})

					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			})
		}
	}
})