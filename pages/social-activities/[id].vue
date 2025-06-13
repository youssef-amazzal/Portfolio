<template>
    <NuxtLayout>
        <SocialActivityDetail />
    </NuxtLayout>
</template>

<script setup>
import SocialActivityDetail from '~/components/sections/SocialActivityDetail.vue';

useHead({
    title: 'Social Activity Details - Portfolio',
    meta: [
        { name: 'description', content: 'Detailed view of social activity and community involvement.' }
    ]
});
</script>
