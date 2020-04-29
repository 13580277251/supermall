/*   混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个
  混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被
  “混合”进入该组件本身的选项 */
import {debounce} from "@components/common/utils.js"
import BackTop from "@components/content/backTop/BackTop"
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener:null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,500)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  },
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isshowBackTop:false,
    }
  },
  methods: {
    backClick(){
      // 回到scroll对象顶部，延迟500毫秒
      this.$refs.scroll.scrollTo(0,0,300)
      
    },
  },
}