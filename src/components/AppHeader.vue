<script setup lang="ts">
import { ref } from "@vue/reactivity";

import { MoonIcon as MoonIconOutline } from "@heroicons/vue/outline";
import { MoonIcon as MoonIconSolid } from "@heroicons/vue/solid";

const darkMode = ref<boolean>(
    localStorage.getItem("darkMode") === "false" ? false : true
);

const initDarkMode = () => {
    const body = document.querySelector("body") as HTMLBodyElement;
    if (darkMode.value) body.classList.add("dark");
    else body.classList.remove("dark");
};
const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
    localStorage.setItem("darkMode", `${darkMode.value}`);
    initDarkMode();
};

initDarkMode();
</script>

<template>
    <nav
        class="nav"
        :class="{
            'nav--dark': darkMode,
            'nav--light': !darkMode,
        }"
    >
        <div class="nav__brand">Where in the world?</div>
        <div class="nav__dark-mode-toggle" @click="toggleDarkMode">
            <MoonIconOutline v-if="!darkMode" class="w-6 h-6 mr-2" />
            <MoonIconSolid v-else class="w-6 h-6 mr-2" />
            <p>Dark Mode</p>
        </div>
    </nav>
</template>


<style lang="scss" scoped>
.nav {
    @apply px-8 py-4 flex shadow ;
    &__brand {
        @apply font-bold text-xl;
    }
    &__dark-mode-toggle {
        @apply flex items-center min-w-min ml-auto cursor-pointer hover:opacity-80;
    }
}
</style>
