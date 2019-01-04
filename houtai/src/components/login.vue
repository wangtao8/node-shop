<template>
  <div class="hello">
  	<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="账号" prop="name">
		    <el-input v-model.number="ruleForm2.name"></el-input>
		  </el-form-item>
		  <el-form-item label="密码" prop="pass">
		    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
		  </el-form-item>
		  <!--<el-form-item label="确认密码" prop="checkPass">
		    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
		  </el-form-item>-->
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
		    <el-button @click="login('ruleForm2')">注册</el-button>
		    <div @click="changeName">测试mutations </div>
        <div @click="changeName2">测试actions</div>
        <div @click="changeId">当前值点击 +1：{{this.$store.state.curtId}}</div>

        <div @click="test">点击测试get封装</div>
        <div @click="test2">点击测试post封装</div>

        <div v-for="(item, index) in timeList" :key='index'>{{jisuan(item.time)}}</div>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
//	import axios from 'axios'
    import {login, regiester2} from '../api/getdata'
    import {myMixin, testMixin, TimeFiltering} from '../mixins/mixins'
    // import {fetchList, upload} from '../api/testrequest'
    import {Test, Test2} from '../api/server'
    import {mapState, mapActions} from 'vuex'
    // import store from '../store'
    export default {
        data() {
          var checkAge = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入用户名'));
            } else {
              callback();
            }
          };
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.ruleForm2.checkPass !== '') {
                this.$refs.ruleForm2.validateField('checkPass');
              }
              callback();
            }
          };
          var validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
          return {
            timeList: [
              {time: '2018-12-01 20:24:14'},
              {time: '2018-12-31 20:24:14'},
              {time: '2019-1-01 20:24:14'},
              {time: '2019-1-02 20:24:14'},
              {time: '2019-1-03 20:24:14'}
            ],
            ruleForm2: {
              pass: '',
              checkPass: '',
              name: ''
            },
            rules2: {
              pass: [
                { validator: validatePass, trigger: 'blur' }
              ],
              checkPass: [
                { validator: validatePass2, trigger: 'blur' }
              ],
              name: [
                { validator: checkAge, trigger: 'blur' }
              ]
            },
              now: 0
          };
        },
        computed: {
          name() {
            return this.$store.state.name;
          },
          // ...mapState({
          //   name:state=>state.name
          // })
          jisuan(){
            return function(time){
              let nowTime = new Date().getTime()
              let oldTime = new Date(time).getTime()
              let oneDay = 24*60*60*1000
              let twoDay = 2*24*60*60*1000
              let oneWeek = 7*24*60*60*1000
              let nowDay = new Date(time).getDay()
              if (nowTime - oldTime < oneDay){
                return new Date(time).format("hh:mm")
              }else if( nowTime - oldTime < twoDay){
                return '昨天'
              } else if ( nowTime - oldTime < oneWeek ){
                switch (nowDay) {
                  case 0:
                    return '星期天';
                  case 1:
                    return '星期一';
                  case 2:
                    return '星期二';
                  case 3:
                    return '星期三';
                  case 4:
                    return '星期四';
                  case 5:
                    return '星期五';
                  case 6:
                    return '星期六';
                }
              } else {
                return new Date(time).format("yyyy-MM-dd hh:mm:ss")
              }
            }
          }
        },
        watch: {
          name(newVal, oldVal) {
            console.log('改变值：', newVal)
          }
        },
        methods: {
          // changeId(){
          //   this.$store.dispatch('changeId')
          // },
          ...mapActions([//跟上面写法实现一样，可以简化代码
            "changeId"
          ]),
          changeName(){//要传值可以用下面这种写法，如果只触发方法就用上面的简写
            this.now++
            this.$store.commit('valIsChange', {name: ('wangtao'+this.now)})
          },
          changeName2(){
            this.$store.dispatch('changesVal',{kk: 'wonagequ'})
          },
          submitForm(formName) {
            var _this = this
            this.$refs[formName].validate(async (valid) => {
              console.log(valid)
              if (valid) {
                const data = await login({name:this.ruleForm2.name,pass:this.ruleForm2.pass})
    //    			console.log('登陆返回值:', data)
                if (data == 1) {
                  _this.$store.state.name = _this.ruleForm2.name//改变状态管理器里面的name值,用于显示用户
                  _this.$router.push({path: '/index',query: {name:_this.ruleForm2.name}});//这个用来传递路由间的参数
                } else {
                  alert('该账号还没有注册呢！')
                }
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          login(formName){
            this.$refs[formName].validate(async (valid) => {
      //      	console.log(valid)
                if (valid) {
                  const data = await regiester2({name:this.ruleForm2.name,pass:this.ruleForm2.pass})
                  console.log('注册：', data)
                  if (data == 1) {
                    alert('注册成功')
                  } else {
                    alert('已有账号！')
                  }
                } else {
                  console.log('error submit!!');
                  return false;
                }
            });
          },
          async test(){
            const data = await Test({name:'123',pass:'123'})
            console.log('data:', data)
          },
          async test2(){
            const data = await Test2({name:'123',pass:'123'})
            console.log('data:', data)
          }
        },
        mixins: [myMixin,testMixin,TimeFiltering],
        async mounted(){
          this.testChange()
          this.testChange2()
          // var res = await fetchList()
          // console.log('res:', res)
        }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-input{
	width: 600px;
}
.el-form-item{
	width: 700px;
	margin: 30px auto;
}
</style>
