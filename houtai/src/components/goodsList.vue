<template>
	<div>
		<el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
			<el-table-column label="Id" prop="id">
			</el-table-column>
			<el-table-column label="分类" prop="category">
			</el-table-column>
			<el-table-column label="商品名" prop="name">
			</el-table-column>
			<el-table-column label="商品描述" prop="goods_brief">
			</el-table-column>
			<el-table-column label="商品图片">
				<template slot-scope="scope">
		              <img :src="scope.row.primary_pic_url" alt="" style="width: 120px;height:120px">
		        </template>
			</el-table-column>
			<el-table-column label="参与活动" prop="promotion_desc">
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
		<el-pagination background layout="prev, pager, next" :total="pageAll*5" :page-size="5" @current-change="chooseCurPage">
		</el-pagination>
	</div>
</template>

<script>
	import {getGoodsList} from '../api/getdata'
	export default{
		data(){
			return {
				tableData: [], //总共的数据
				search: '',
				pageIndex: 1,
				pageAll: null,
			}
		},
		methods:{
			async getGoodsList(){
				var data = {
					pageIndex: this.pageIndex
				}
				var res = await getGoodsList(data)
				this.tableData = res.conut
				this.pageAll = res.total
				console.log('获得的商品列表数据：', res)
			},
			async chooseCurPage(e) { //分页
				console.log(e)
				var data = {
					pageIndex: e
				}
				const res = await getGoodsList(data);
				this.tableData = res.conut
				this.pageAll = res.total
				this.pageIndex = e
			},
			handleEdit(index, item){
				this.$store.state.curtItem = item
				this.$router.push({path: '/goodsInfo'});//这个用来传递路由间的参数
			}
		},
		mounted(){
			this.getGoodsList()
		}
	}
</script>

<style>
	.el-pagination {
	    margin-top: 20px;
	}
</style>