<template>
	<div class="notice">
		<div>这是通知设置页面222</div>
	</div>
</template>
<script>
export default {
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
