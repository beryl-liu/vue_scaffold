<!-- vuex的使用案例 -->
<template>
  <div class="vuex-demo">
    <!--  调用  -->
    <p>这是vuex中根模块下的state:{{ demoState }}--{{ demoStateAlias }}--{{ demoStatePlusLocalState }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex' // 引入vuex提供的辅助函数，访问方式二
export default {
  name: 'vuex-demo',
  components: {},
  data () {
    return {
      localDemoState:'17'
    }
  },
  props: {},
  watch: {},
  methods: {},
  computed: {
    /**
     * 访问方式二---① 当映射的计算属性的名称与 state 的子节点名称相同
     *
    // ...mapState(['demoState']), // 映射 this.demoState 为 store.state.demoState
    /**
     * 或者访问方式二---②
     */
    ...mapState(
      {
        // 箭头函数可使代码更简练
        demoState: state => state.demoState,

        // 传字符串参数 'demoState' 等同于 `state => state.demoState`
        demoStateAlias: 'demoState',

        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        demoStatePlusLocalState (state) {
          return state.demoState.find(value => {
            return value===this.localDemoState
          })
        }
      }
    )
    // 访问方式一
    // demoState(){
    //   return this.$store.state.demoState
    // }
  },
  created () {
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="less" type="text/less" scoped>
</style>
