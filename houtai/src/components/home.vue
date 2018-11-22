<template>
	<el-container>
		<div class="users" v-test_directive="changeColor">欢迎您：<span>{{$store.state.name}}!</span></div>
		<el-header>
			<el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
				<el-table-column label="Id" prop="id">
				</el-table-column>
				<el-table-column label="账号" prop="name">
				</el-table-column>
				<el-table-column label="角色" prop="character1">
				</el-table-column>
				<el-table-column align="right">
					<template slot="header" slot-scope="slot">
						<el-input v-model="search" size="mini" placeholder="Type to search" />
					</template>
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="motai" v-show="isShow">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>编辑</span>
						<el-button style="float: right; padding: 3px 0" type="text" @click="sure">确定</el-button>
					</div>
					<table border="0" cellspacing="0" cellpadding="0" class="editTable">
						<tr>
							<th>Id</th>
							<th>姓名</th>
							<th>角色</th>
						</tr>
						<tr>
							<td>{{nowData.id}}</td>
							<td>
								<el-input v-model="nowData.name" placeholder="请输入内容"></el-input>
							</td>
							<td>
								<el-select v-model="value" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</td>
						</tr>
					</table>
				</el-card>
			</div>
			<el-pagination background layout="prev, pager, next" :total="pageAll*15" :page-size="15" @current-change="chooseCurPage">
			</el-pagination>
		</el-header>
		<el-main>Main</el-main>
	</el-container>
</template>

<script>
	import {deletUser, editUser, getUsers} from '../api/getData'
	export default {
		data() {
			return {
				color: 'red',//用于测试自定义的事件是否可用
				tableData: [], //总共的数据
				search: '',
				nowData: {}, //当前编辑的数据
				isShow: false,
				curIndex: null,
				pageAll: null,
				pageIndex: 1,
				options: [{
					value: '员工',
					label: '员工'
				}, {
					value: '管理员',
					label: '管理员'
				}, {
					value: '超级管理员',
					label: '超级管理员'
				}],
				value: ''
			}
		},
		methods: {
			//用于测试自定义的事件是否可用
			changeColor(){
				return this.color
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleEdit(index, data) { //编辑
				console.log('当前的索引：', index)
				var nowData = {}
				nowData.id = data.id
				nowData.name = data.name
				this.nowData = nowData
				this.isShow = true
				this.curIndex = index
				this.value = data.character1
			},
			async handleDelete(index, data) { //删除用户
				var id = data.id
				var datas = {
					id: id
				}
				const res = await deletUser(datas)
				this.getUserInfo() //更改成功后，重新刷新页面
				console.log('删除用户的结果：', res)
			},
			async sure() { //确定
				var data = this.nowData
				var selectVal = this.value
				data.character = selectVal
				const res = await editUser(data)
				console.log('更改用户信息：', res)
				if (res == 1) {
					this.getUserInfo() //更改成功后，重新刷新页面
				} else {
					alert('更改失败！')
				}
				this.isShow = false
			},
			async getUserInfo() { //获得用户信息
				var data = {
					pageIndex: this.pageIndex
				}
				const res = await getUsers(data);
//				console.log('页面加载拿到的数据：', res)
				this.tableData = res.conut
				this.pageAll = res.total
			},
			async chooseCurPage(e) { //分页
				console.log(e)
				var data = {
					pageIndex: e
				}
				const res = await getUsers(data);
				this.tableData = res.conut
				this.pageAll = res.total
				this.pageIndex = e
			}
		},
		mounted() {
			this.getUserInfo()
		}
	}
</script>

<style lang="scss">
	/**
	 * 在 Sass 中，@include 代表这调用定义好的 @mixin
	 * */
	@mixin fontStyle($size, $color) {
		font-size: $size;
		color: $color;
	}
	/*如果文中出现中文防止报错*/
	@charset "utf-8";
	/*定义变量用$*/
	$orange: #f60; 
	$blacks: black;
	.users{
		@include fontStyle(26px, $orange);
		span{
			color: $blacks;
		}
	}
	.motai {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 2;
	}
	
	.el-card {
		position: fixed;
		width: 480px;
		height: 200px;
		top: calc(50% - 200px);
		left: calc(50% - 150px);
	}
	
	.text {
		font-size: 14px;
	}
	
	.item {
		margin-bottom: 18px;
	}
	
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	
	.clearfix:after {
		clear: both
	}
	
	.clearfix>span {
		position: relative;
		left: -80px;
	}
	
	.el-table__body-wrapper {
		/*height: 265px;*/
	}
	
	.editTable {
		width: 100%;
		height: 100%;
	}
	
	.editTable tr:first-child>th {
		border-bottom: 1px solid #dcdfe6;
	}
	
	.editTable tr td,
	.editTable tr th {
		width: 140px;
		height: 60px;
	}
	
	.editTable tr td>div {
		width: 120px;
	}
	
	.el-card__body {
		padding: 0 20px;
		box-sizing: border-box;
	}
	/*.el-input__inner{
		border: none;
		outline: 0;
	}*/
	
	.el-pagination {
		margin-top: 20px;
	}
</style>