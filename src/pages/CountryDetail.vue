<script setup lang="ts">
import { Countries } from "@/types/Countries";
import { defineProps, ref, PropType, onMounted } from "vue";
import { ArrowNarrowLeftIcon } from "@heroicons/vue/solid";
const props = defineProps({
    code: {
        type: String as PropType<string>,
        required: true,
    },
});

const country = ref<Countries>();
const loading = ref<boolean>(false);
const error = ref<boolean>(false);
const fetchCountry = async () => {
    try {
        loading.value = true;
        const response = await fetch(
            `https://restcountries.eu/rest/v2/alpha/${props.code}`
        );
        const data: Countries = await response.json();
        country.value = data;
    } catch (err) {
        error.value = true;
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchCountry();
});
</script>

<template>
    <div v-if="error">There is an error while fetching country data...</div>
    <div v-if="loading">Fetching country data...</div>
    <div v-else>
        <router-link
            :to="{ name: 'home' }"
            class="
                flex
                items-center
                shadow
                text-sm
                dark:bg-dark-blue
                bg-white
                w-max
                px-4
                py-1
                rounded-sm
            "
        >
            <arrow-narrow-left-icon class="w-4 h-4 mr-2" />
            <span>Back</span>
        </router-link>

        <div class="mt-20 flex md:flex-row flex-col w-full justify-center">
            <img
                :alt="country?.name"
                :src="country?.flag"
                class="md:w-1/3 mx-auto"
            />
            <div class="md:ml-10 md:mx-auto">
                <h3 class="font-bold mt-10 text-2xl">{{ country?.name }}</h3>

                <div class="mt-10 flex md:flex-row flex-col">
                    <div>
                        <p>
                            <span class="font-bold">Native Name : </span>
                            <span>{{ country?.nativeName }}</span>
                        </p>
                        <p class="mt-2">
                            <span class="font-bold">Population : </span>
                            <span>
                                {{
                                    country?.population.toLocaleString("id-ID")
                                }}</span
                            >
                        </p>
                        <p class="mt-2">
                            <span class="font-bold">Region : </span>
                            <span>{{ country?.region }}</span>
                        </p>
                        <p class="mt-2">
                            <span class="font-bold">Sub Region : </span>
                            <span>{{ country?.subregion }}</span>
                        </p>
                        <p class="mt-2">
                            <span class="font-bold">Capital : </span>
                            <span>{{ country?.capital }}</span>
                        </p>
                    </div>

                    <div class="md:mt-0 md:ml-5 mt-10">
                        <p>
                            <span class="font-bold">Top Level Domain : </span>
                            <span
                                v-for="(domain, idx) in country?.topLevelDomain"
                                :key="domain"
                            >
                                {{
                                    idx + 1 !== country?.topLevelDomain.length
                                        ? `${domain}, `
                                        : domain
                                }}
                            </span>
                        </p>
                        <p class="mt-2">
                            <span class="font-bold">Currencies : </span>
                            <span>{{ country?.currencies[0].name }}</span>
                        </p>
                        <p class="mt-2">
                            <span class="font-bold">Languages : </span>
                            <span
                                v-for="(language, idx) in country?.languages"
                                :key="language.name"
                            >
                                {{
                                    idx + 1 !== country?.languages.length
                                        ? `${language.name}, `
                                        : language.name
                                }}
                            </span>
                        </p>
                    </div>
                </div>
                <div class="mt-10">
                    <h4 class="font-bold text-lg">Border Countries :</h4>
                    <div class="flex flex-wrap">
                        <div
                            class="
                                px-8
                                mx-2
                                mt-5
                                py-1
                                dark:bg-dark-blue
                                bg-white
                                shadow
                                rounded-sm
                                text-sm
                            "
                            v-for="(border, idx) in country?.borders"
                            :key="border"
                        >
                            {{ border }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
