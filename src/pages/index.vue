<script setup lang="ts">
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from "@headlessui/vue";

import { SearchIcon, ChevronDownIcon, CheckIcon } from "@heroicons/vue/solid";
import { reactive, ref, onMounted, watch } from "vue";
import type { Countries } from "@/types/Countries";
import Country from "@/components/Country.vue";
import { useDebounceFn } from "@vueuse/core";

// available region Africa, Americas, Asia, Europe, Oceania
const regions = ref<string[]>([
    "Filter by Region",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
]);
const selectedRegion = ref(regions.value[0]);

const state = reactive<{
    countries: Countries[];
    loading: boolean;
    error: boolean;
}>({
    countries: [],
    loading: false,
    error: false,
});

const countryEndPoint: string[] = [
    "https://restcountries.eu/rest/v2/all",
    "https://restcountries.eu/rest/v2/name/",
    "https://restcountries.eu/rest/v2/region/",
];
const fetchCountry = async (url: string) => {
    state.loading = true;
    try {
        const response = await fetch(url);
        const data: Countries[] = await response.json();
        state.countries = data;
    } catch (error) {
        state.error = true;
    } finally {
        state.loading = false;
    }
};

watch(
    () => selectedRegion.value,
    current => {
        if (current !== regions.value[0]) {
            fetchCountry(`${countryEndPoint[2]}${current}`);
        } else {
            fetchCountry(countryEndPoint[0]);
        }
    }
);

const onSearchCountry = useDebounceFn((e: Event) => {
    const keyword = (e.target as HTMLInputElement).value;
    if (keyword) {
        fetchCountry(`${countryEndPoint[1]}${keyword}`);
    } else {
        fetchCountry(countryEndPoint[0]);
    }
}, 750);
onMounted(() => {
    fetchCountry(countryEndPoint[0]);
});
</script>

<template>
    <div class="filter">
        <div class="search">
            <div class="search__icon">
                <SearchIcon class="w-4 h-4" />
            </div>
            <input
                @input="onSearchCountry($event)"
                type="text"
                class="search__input"
                placeholder="Search for a country..."
            />
        </div>
        <div class="select__wrapper relative">
            <Listbox v-model="selectedRegion">
                <ListboxButton class="select__button">
                    <span>{{ selectedRegion }}</span>
                    <ChevronDownIcon class="w-4 h-4 ml-auto" />
                </ListboxButton>
                <transition
                    enter-active-class="transition-all duration-300 ease-in-out"
                    enter-from-class="-translate-y-10 opacity-0"
                    enter-to-class="translate-y-0 opacity-100"
                    leave-active-class="transition-all duration-300 ease-in-out"
                    leave-from-class="scale-100 opacity-100"
                    leave-to-class="scale-95 opacity-0"
                >
                    <ListboxOptions class="select__dropdown">
                        <ListboxOption
                            class="select__dropdown-item"
                            as="template"
                            v-slot="{ selected }"
                            v-for="region in regions"
                            :key="region"
                            :value="region"
                        >
                            <li
                                class="flex"
                                :class="{
                                    'select__dropdown-item--active': selected,
                                }"
                            >
                                <span>{{ region }}</span>
                                <CheckIcon
                                    v-show="selected"
                                    class="w-4 h-4 ml-2"
                                />
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </Listbox>
        </div>
    </div>
    <div class="country__wrapper">
        <template v-if="state.error"
            >There is an error while fetching the data...</template
        >
        <template v-if="state.loading">Fetching country data...</template>
        <template v-else-if="state.countries.length == 0 && !state.loading"
            >No countries found</template
        >
        <template v-else-if="state.countries.length > 0 && !state.loading">
            <template v-for="country in state.countries" :key="country.name">
                <router-link
                    :to="{
                        name: 'country-detail',
                        params: { code: country.alpha2Code },
                    }"
                >
                    <country :country="country" />
                </router-link>
            </template>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.dark {
    .search {
        &__icon {
        }
        &__input {
            @apply bg-dark-blue focus:ring-dark-blue;
        }
    }
    .select {
        &__button {
            @apply bg-dark-blue text-white;
        }
        &__dropdown {
            @apply bg-dark-blue;
            &-item {
                @apply hover:bg-white hover:text-dark-blue;
                &--active {
                    @apply bg-white text-dark-blue;
                }
            }
        }
    }
}
.select {
    &__wrapper {
        @apply relative lg:ml-auto lg:mt-0 mt-5;
    }
    &__button {
        @apply bg-white text-light-dark-blue rounded px-4 py-4 shadow-md flex text-sm items-center lg:min-w-[200px] w-full;
    }
    &__dropdown {
        @apply absolute left-0 top-full w-full shadow-md bg-white py-2 rounded;
        &-item {
            @apply px-4 py-1 text-sm hover:bg-light-dark-blue hover:text-white transition-all duration-300 ease-in-out cursor-pointer;
            &--active {
                @apply bg-dark-blue text-white;
            }
        }
    }
}
.filter {
    @apply flex lg:flex-row flex-col relative z-10;
}
.search {
    @apply flex relative items-center;
    &__icon {
        @apply absolute left-5 top-[18px];
    }

    &__input {
        @apply rounded p-4 pl-14 outline-none border-0 shadow-md focus:ring-gray-100 lg:min-w-[500px] w-full;
    }
}
.country {
    &__wrapper {
        @apply mt-5 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10 relative;
    }
}
</style>
