export const myMixin = {
    created(){
        // this.testChange()
    },
    methods: {
        testChange(){
            console.log('myMixin')
        }
    }
}

export const testMixin = {
    created(){
        // this.testChange2()
    },
    methods: {
        testChange2(){
            console.log('testMixin')
        }
    }
}