
<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
<teleport to="body">
	<header>
		<app-header />
	</header>
	<main>
    	<router-view />
	</main>
</teleport>
</template>

<style>
main{
	@apply p-8;
}
</style>
