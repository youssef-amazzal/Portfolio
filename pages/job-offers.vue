<template>
    <NuxtLayout>
        <JobOffersSection />
    </NuxtLayout>
</template>

<script setup>
import JobOffersSection from '~/components/sections/JobOffersSection.vue';

useHead({
    title: 'Job Applications - Portfolio',
    meta: [
        { name: 'description', content: 'Track my job applications and download related documents.' }
    ]
});
</script>
