<template>
	<div style="height: 100%;">
		<el-row style="height: 100%;">
			<el-col :span="4" style="min-height: 100%; background-color: #324057;">
				<!-- router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
				<el-menu 
					class="el-menu-vertical-demo" 
					:default-active="defaultActive"  
					background-color="rgb(50, 64, 87)" 
					text-color="#fff" 
					active-text-color="#ffd04b" 
					router>
					<!-- index为加载的路由 -->
					<el-menu-item index="index">
						<i class="el-icon-setting"></i>
						<span slot="title">用户管理</span>
					</el-menu-item>
					<el-menu-item index="vue2">
						<i class="el-icon-menu"></i>
						<span slot="title">商品管理</span>
					</el-menu-item>
					<el-menu-item index="vue3">
						<i class="el-icon-document"></i>
						<span slot="title">用户分析</span>
					</el-menu-item> 
					<el-menu-item index="vue4">
						<i class="el-icon-setting"></i>
						<span slot="title">详细说明</span>
					</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		},
		computed: {
			defaultActive: function(key, keyPath) {
				console.log('xxxxxxx:', this.$route.query)
				//				return this.$route.path;
				return this.$route.path.replace('/', '');
			}
		}
	}
</script>

<style>
	.el-menu{
		background-color: rgb(50, 64, 87)!important;
		width: 100%;
	}
</style>