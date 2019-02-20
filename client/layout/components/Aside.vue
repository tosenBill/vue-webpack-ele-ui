<template>
    <el-aside id="siderBar" width="200px" :class="{'not-open':!sidebar, 'is-open': sidebar}">
      <el-menu
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      :unique-opened='true'
      :collapse="!sidebar"
      background-color="#545c64"
      text-color="#fff"
      :default-openeds="subMenuActive"
      :default-active="$route.path"
      active-text-color="#409EFF">
      <el-submenu v-for="(item, index) in navList" class="nav-item" :index="item.path" :key="index">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span class="nav-title">{{item.navName}}</span>
        </template>
        <el-menu-item-group v-for="(child, i) in item.children" :key="i">
          <!-- <template slot="title">分组一</template> -->
          <router-link :to="child.link">
              <el-menu-item :index="child.link">{{child.name}}</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    </el-aside>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data () {
		return {
			subMenuActive: [], // 一级菜单选中的菜单
			childMenuActive: '', // 二级菜单选中的菜单
			navList: [
				{
					path: '/set',
					navName: '设置',
					children: [
						{
							link: '/permission',
							name: '权限设置'
						},
						{
							link: '/notice',
							name: '通知设置'
						}
					]
				},
				{
					path: '/logistics',
					navName: '物流',
					children: [
						{
							link: '/look',
							name: '查看物流'
						},
						{
							link: '/sets',
							name: '发送物流'
						}
					]
				}
			]
		}
	},
	mounted() {
	},
	computed: {
		...mapGetters(['sidebar'])
	},
	methods: {
		handleOpen () {},
		handleClose () {},
		close () {}
	},
	watch: {
		$route: {
			handler (val) {
				console.log(this.$route)
				const { matched } = val
				this.subMenuActive = [matched[0].path || '/set']
			},
			immediate: true
		}
	}
}
</script>

<style lang="stylus" scoped>
	#siderBar{
		background:#545c64;
		transition: width .8s;
		&.not-open{
			width: 65px !important;
			overflow-x: hidden;
		}
		&.is-open{
			width: auto;
		}
		.el-menu-vertical:not(.el-menu--collapse) {
			width: 200px;
			min-height: 400px;
		}
		.el-menu-vertical{
			border-right none
		}
		.nav-item >div:hover{
			.nav-title, i{
				color #409eff
			}
		}
		.active {
			background-color: $tabColor;
			color: #fff;
			border-color: $tabColor;
			&::before {
				content: "";
				background: #fff;
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				position: relative;
				margin-right: 2px;
			}
		}
	}
</style>
