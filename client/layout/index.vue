<template>
  <div id="Layout" >
    <el-container :style="{ height: getScreenHeight +'px', overflow: 'scroll' }">
      <asides/>
      <div class="content">
        <headers class="header-component"/>
        <router-view/>
      </div>
    </el-container>
  </div>
</template>

<script>
import Asides from './components/Aside.vue'
// import Headers from './components/Headers.vue'

// import global from '../assets/styles/global.styl'
export default {
	name: 'Layout',
	data () {
		return {
			getScreenHeight: 600 + 'px'
		}
	},
	components: {
		Asides
		// Headers
	},
	created () {
	},
	mounted() {
		// this.getScreenHeight = `${document.documentElement.clientHeight}`
		// 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
		// window.onresize = () => {
		// 	this.getScreenHeight = `${document.documentElement.clientHeight}`
		// }
	}
}
</script>

<style lang="stylus" scope>
  .content{
    width:100%;
  }
</style>
