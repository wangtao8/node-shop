<template>
	<div style="padding-top: 80px;">
		<div style="margin-bottom: 60px;font-size: 32px;">商品详情编辑</div>
		<el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
		  <el-form-item label="商品名称">
		    <el-input v-model="$store.state.curtItem.name"></el-input>
		  </el-form-item>
		  <el-form-item label="商品图片">
		  	<el-upload
				 class="upload-demo"
				 action=""
				 :on-preview="handlePreview" 
				 :on-remove="handleRemove" 
				 :before-upload="beforeAvatarUpload" 
				 :file-list="fileList2" 
				 list-type="picture-card">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
			  <img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		 </el-form-item>
		 <el-form-item label="商品分类">
		    <el-input v-model="$store.state.curtItem.category" :disabled="true"></el-input>
		  </el-form-item>
		  <el-form-item label="商品描述">
		    <el-input v-model="$store.state.curtItem.goods_brief"></el-input>
		  </el-form-item>
		  <el-form-item label="参与活动">
		    <el-select v-model="$store.state.curtItem.promotion_desc" placeholder="请选择活动">
		      <el-option
		        v-for="item in region"
		        :key="item.value"
		        :label="item.label"
		        :value="item.value">
		      </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item size="large">
		    <el-button type="primary" @click="onSubmit">立即更改</el-button>
		    <el-button>取消</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	import axios from 'axios'
	import {uploadAdres} from '../api/getData.js'
	export default {
		data() {
			return {
				dialogImageUrl: '',//当前预览图
				dialogVisible: false,//是否显示预览图
				fileList2: [],//预览图集合
				region: [{
					value: '满立减',
          			label: '满立减'
				}, {
					value: '秒杀',
          			label: '秒杀'
				}, {
					value: '限时购',
          			label: '限时购'
				}],
				sizeForm: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          region: '',
		          resource: '',
		          desc: ''
		        }
			};
		},
		methods: {
			onSubmit() {
	          
	        },
			//删除图片
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
            handlePreview(file) {
            	this.dialogImageUrl = file.url;
            	this.dialogVisible = true
//              console.log('预览图xxxxxxxxxxxxxx：', file.url);
            },
			// 上传前对文件的大小的判断
			beforeAvatarUpload(file) {
				console.log('上传前对文件大小的做对比：', file);
				var fileName = new Array()
				fileName = file.name.split('.');
				const extension = fileName[fileName.length - 1] === 'jpg';
				const extension2 = fileName[fileName.length - 1] === 'gif';
				const extension3 = fileName[fileName.length - 1] === 'png';
				const isLt2M = file.size / 1024 / 1024 < 10
				if(!extension && !extension2 && !extension3) {
					this.$message({
						message: '上传文件只能是jpg、gif、png格式!',
						type: 'warning'
					});
				}
				if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过 10MB!',
						type: 'warning'
					});
				}
				if(extension || extension2 || extension3 && isLt2M == true) {
					//console.log("上传前的文件",file);
					//创建formData表单数据对象
					let fd = new FormData();

					//随文件上传的其他参数
					fd.append('author', "keke");
					fd.append('uploadFile', file);

					//校验完成后提交上传文件的方法
					this.uploadAjax(fd);

					return true;
				}
				return extension || extension2 || extension3 && isLt2M
			},
			// 使用axios异步执行上传到后端api
			uploadAjax(formData) {
//				var res = await upload(formData)
//				console.log('上传结果：', res)
				var _this = this
				const headerConfig = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				};
				axios.post('http://127.0.0.1:3000/upload', formData, headerConfig).then((result) => { //成功后回调
					//返回结果
					console.log("上传的结果: ", result,'this:', this);
					this.fileList2 = [({
						name: result.data,
						url: 'http://127.0.0.1:3000' + result.data
					})];
					this.uploadAdress()
					//上传结果的提示信息
					console.log('上传成功success');
				}).catch(function(err) {
					console.log('上传失败failed' + err.message);
				});
			},
			async uploadAdress(){
				var id = this.$store.state.curtItem.id
				var url = this.fileList2[0].url
				var data = {
					id: id,
					url: url
				}
				var res = await uploadAdres(data)
				console.log('上传地址状态：', res)
			}
		},
		mounted(){
			console.log(this.$store.state.curtItem)
			this.fileList2 = [{url: this.$store.state.curtItem.primary_pic_url}]
		}
	}
</script>

<style>
.el-select{
	width: 100%;
}
</style>