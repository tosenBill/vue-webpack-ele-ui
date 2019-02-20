<template>
    <el-header style="text-align: right; font-size: 12px;background:#ccc;width:100%;">
      <div style="float:left;" class="header_left">
        <hamburger :toggle-click="toggleSideBar" :is-active="sidebar" class="hamburger-container"/>
      </div>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item @click.native="quit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
</template>

<script>
import * as types from '@/store/type'
import Hamburger from '@/components/UI/Hamburger/index.vue'

import { mapGetters } from 'vuex'

export default {
	data () {
		return {

		}
	},
	components: {
		Hamburger
	},
	computed: {
		...mapGetters(['sidebar'])
	},
	mounted() {
	},
	methods: {
		toggleSideBar () {
			this.$store.commit(types.OPEN_SLIDER)
		},
		quit () {
			this.$Utils.removeCookie('_USER_COOKIE')
			this.$router.replace({
				path: '/login'
			})
		}
	}
}
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
