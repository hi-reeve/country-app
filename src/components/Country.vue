<script setup lang="ts">
import { defineProps, PropType } from "vue";
import type { Countries } from "@/types/Countries";
const props = defineProps({
    country: {
        type: Object as PropType<Countries>,
        required: true,
    },
});
</script>

<template>
    <div class="country">
        <div class="country__flag-wrapper">
            <img :alt="props.country.name" :src="props.country.flag" class="country__flag" />
        </div>
        <div class="country__info">
            <h4 class="country__info--title">{{ props.country.name }}</h4>
            <p class="country__info--info">
                <span class="country__info--label">Populations:</span>
                {{ props.country.population.toLocaleString("id-ID") }}
            </p>
            <p class="country__info--info">
                <span class="country__info--label">Region:</span>
                {{ props.country.region }}
            </p>
            <p class="country__info--info">
                <span class="country__info--label">Capital:</span>
                {{ props.country.capital }}
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dark{
	.country{
		&__info{
			@apply bg-dark-blue text-white;
		}
	}
}
.country {
    @apply shadow rounded-lg hover:shadow-xl  cursor-pointer transition-shadow duration-300 ease-in-out;

    &__flag {
        &-wrapper {
            @apply h-[240px] w-full;
        }
        @apply object-cover w-full h-[240px];
    }
    &__info {
        @apply bg-white p-8 pt-4  text-dark-blue;
		&--info{
			@apply my-1;
		}
        &--title {
            @apply font-bold text-xl my-4;
        }
        &--label {
            @apply font-bold;
        }
    }
}
</style>
