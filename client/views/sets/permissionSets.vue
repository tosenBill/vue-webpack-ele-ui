<template>
	<div class="sets">
		<div>这是权限设置页面111</div>
	</div>
</template>
<script>
export default {
	metaInfo: {
		title: '权限设置meta'
	},
	data () {
		return {
			test: 111
		}
	},
	mounted () {
		this.myApi.getLogin({
			name: 'sehnt'
		})
	}
}
</script>

