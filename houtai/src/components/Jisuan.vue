<template>
    <div id="app">
        <div>{{reverseTitle}}</div>
        <div>{{reverseTitle2()}}</div>
        <button @click="add()">补充货物1</button>
        <div>总价为：{{price}}</div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            package1: {
                count: 5,
                price: 5
            },
            package2: {
                count: 10,
                price: 10
            },
            title: 'Hello Vue!!!'
        }
    },
    computed: {
        price(){
            return this.package1.count*this.package1.price+this.package2.count*this.package2.price　　//总价随着货物或价格的改变会重新计算
        },
        reverseTitle(){//计算属性里面的方法，只要引用值没发生变化，那么就不会执行该方法
            console.log('我执行了reverseTitle方法')
            return this.title.split('').reverse().join('')
        }
    },
    methods: {   //对象的方法
        add(){
            this.package1.count++
            this.package2.count++
        },
        reverseTitle2(){//每次页面渲染时就会执行该方法
            console.log('我执行了reverseTitle2方法:', this.title)
            return this.title.split('').reverse().join('')
        }
    }
}
</script>

