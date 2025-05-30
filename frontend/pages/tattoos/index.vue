<template>
    <Header />
    <div class="fixed bottom-10 left-10 hidden" data-name="request-tattoo">
        <a
            v-if="locale === 'en'"
            class="button button--blue button--solid mt-10"
            href="https://form.jotform.com/213625089286362"
            target="_blank"
        >
            Request Tattoo
        </a>
        <a
            v-else
            class="button button--blue button--solid mt-10"
            href="https://form.jotform.com/213625089286362"
            target="_blank"
        >
            Pedir tatuagem
        </a>
    </div>
    <section class="min-h-screen bg-gray py-40">
        <div
            class="flex flex-col md:flex-row px-5 md:px-20 py-10 gap-2 md:gap-20"
        >
            <h2 class="title-xl mb-5 min-w-[28rem]" v-if="tattoo?.BigTitle">{{
                tattoo.BigTitle
            }}</h2>
            <div class="pt-5 md:pt-20 prose max-w-[41.5rem]">
                <RichText v-if="tattoo?.Intro" :blocks="tattoo.Intro" />
                <a
                    v-if="locale === 'en'"
                    class="button button--blue button--solid mt-10"
                    href="https://form.jotform.com/213625089286362"
                    target="_blank"
                >
                    Request Tattoo
                </a>
                <a
                    v-else
                    class="button button--blue button--solid mt-10"
                    href="https://form.jotform.com/213625089286362"
                    target="_blank"
                >
                    Pedir tatuagem
                </a>
            </div>
        </div>
        <div
            class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-10 container-xl mt-5 md:mt-20"
        >
            <div
                v-for="image in tattoo?.Instagram"
                :key="image?.url"
                class="aspect-square"
            >
                <NuxtImg
                    v-if="image?.url"
                    provider="strapi"
                    format="webp"
                    class="w-full h-full object-cover"
                    :src="image.url"
                    :alt="image.alternativeText"
                />
            </div>
            <div
                class="border-2 border-red aspect-square flex flex-col justify-center items-center text-red text-teaser text-center"
            >
                <span v-if="locale === 'en'">Check out more</span>
                <span v-else>Ver mais</span>
                <span class="font-bold mt-1">
                    <a
                        href="https://www.instagram.com/magma_nta/"
                        target="_blank"
                        >@magma_nta</a
                    ></span
                >
            </div>
        </div>
    </section>

    <section class="bg-black py-5 pb-10 text-white">
        <h2 class="title-full" v-if="tattoo?.ExhibitionTattoosTitle">{{
            tattoo.ExhibitionTattoosTitle
        }}</h2>
        <div
            class="flex flex-col md:flex-row gap-20 container-xl items-center mt-20"
        >
            <div class="w-full md:w-2/6 prose">
                <RichText
                    v-if="tattoo?.ExhibitionTattoosDescription"
                    :blocks="tattoo.ExhibitionTattoosDescription"
                />
            </div>
            <div class="w-4/6">
                <div class="text-teaser" v-if="tattoo?.TattooName">
                    {{ tattoo.TattooName }}
                </div>
                <div class="flex justify-between" v-if="tattoo?.exhibition">
                    <span class="title-lg" v-if="tattoo.exhibition?.Name">{{
                        tattoo.exhibition.Name
                    }}</span>
                    <NuxtLink
                        v-if="tattoo.exhibition?.slug"
                        :to="`${localePath(
                            `/exhibitions/${tattoo.exhibition.slug}`
                        )}`"
                        class="text-teaser"
                    >
                        <span v-if="locale === 'en'">Exhibition page</span>
                        <span v-else>Página da exposição</span>
                    </NuxtLink>
                </div>
                <div>
                    <div class="relative aspect-[97/48] h-full">
                        <span
                            v-if="locale === 'en'"
                            class="absolute bottom-0 left-0 -rotate-90 -translate-x-[100%] text-teaser"
                            >Before</span
                        >
                        <span
                            v-else
                            class="absolute bottom-0 left-0 -rotate-90 -translate-x-[100%] text-teaser"
                            >Antes</span
                        >
                        <NuxtImg
                            class="w-full h-full object-cover absolute"
                            v-if="tattoo?.BeforeImage?.url"
                            provider="strapi"
                            format="webp"
                            :src="tattoo.BeforeImage.url"
                            :alt="tattoo.BeforeImage.alternativeText"
                        />

                        <NuxtImg
                            class="w-full h-full object-cover absolute"
                            v-if="tattoo?.AfterImage?.url"
                            provider="strapi"
                            format="webp"
                            :src="tattoo.AfterImage.url"
                            :alt="tattoo.AfterImage.alternativeText"
                        />
                        <span
                            v-if="locale === 'en'"
                            class="absolute bottom-0 right-0 rotate-90 translate-x-[100%] text-teaser"
                            >After</span
                        >
                        <span
                            v-else
                            class="absolute bottom-0 right-0 rotate-90 translate-x-[100%] text-teaser"
                            >Depois</span
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-20">
            <NuxtLink
                v-for="artist in artists?.data"
                v-if="artist?.slug"
                :to="`${localePath(`/tattoos/${artist.slug}`)}`"
                class="title-md text-white group hover:text-black"
            >
                <div
                    class="border-b-2 border-white py-4 relative text-center hover:bg-white group relative"
                >
                    {{ artist?.Name }}
                </div>
            </NuxtLink>
            <button
                v-if="artistsLoaded?.length < artists?.data?.length"
                @click="loadMore"
            >
                Load More
            </button>
        </div>
    </section>

    <Faqs
        v-if="tattoo?.tattoo_faq?.faqsList"
        :faqs="tattoo.tattoo_faq.faqsList"
    />

    <section class="py-20 overflow-hidden">
        <h2 class="title-full" v-if="tattoo?.ADNTitle">
            {{ tattoo.ADNTitle }}
        </h2>
        <h3 class="title-full" v-if="tattoo?.ADNSubtitle">{{
            tattoo.ADNSubtitle
        }}</h3>

        <div
            class="flex flex-col md:flex-row gap-10 container-xl mt-20 justify-center items-center"
        >
            <div
                v-for="member in tattoo?.Team"
                :key="member?.id"
                class="first:bg-yellow last:bg-green last:text-white p-3"
            >
                <div class="w-full aspect-[624/417]">
                    <NuxtImg
                        v-if="member?.Photo?.url"
                        provider="strapi"
                        format="webp"
                        class="w-full aspect-[210/297] object-cover"
                        :src="member.Photo.url"
                    />
                </div>
                <div
                    class="flex flex-col items-center text-center px-5 py-5 md:py-10"
                >
                    <h4 class="title-md" v-if="member?.Name">{{
                        member.Name
                    }}</h4>
                    <div class="text-teaser" v-if="member?.Role">{{
                        member.Role
                    }}</div>
                    <p class="text-body mt-5 md:mt-10" v-if="member?.Bio">{{
                        member.Bio
                    }}</p>
                </div>
            </div>
        </div>
    </section>

    <MainFooter></MainFooter>
</template>

<script lang="ts" setup>
import type { Tattoo } from '~/types/strapi'

const config = useRuntimeConfig()
const { find } = useStrapi()
const { locale } = useI18n()
const localePath = useLocalePath()
const response = await find<Tattoo>('tattoo', {
    locale: locale.value,
    populate: {
        Team: {
            populate: '*',
        },
        Instagram: {
            populate: '*',
        },
        exhibition: {
            populate: ['Name', 'slug'],
        },
        AfterImage: {
            populate: '*',
        },
        BeforeImage: {
            populate: '*',
        },
        tattoo_faq: {
            populate: '*',
        },
    },
})

const tattoo = response.data

const artists = await find<Artist>('artists', {
    locale: locale.value,
    populate: '*',
})

const length = ref(10)
const loadMore = () => {
    length.value += 10
}

const artistsLoaded = computed(() => {
    return artists.data.slice(0, length.value)
})

onMounted(() => {
    const requestTattooButton = document.querySelector(
        '[data-name="request-tattoo"]'
    )
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            requestTattooButton.style.display = 'block'
        } else {
            requestTattooButton.style.display = 'none'
        }
    })
})
</script>

<style></style>
