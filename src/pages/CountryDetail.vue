<script setup lang='ts'>
import {defineProps, PropType} from 'vue'
const props = defineProps({
	code : {
		type : String as PropType<string>,
		required : true
	}
})
</script>

<template>
	<div>CountryDetail {{props.code}}</div>
</template>

<style scoped>
</style>