<template>
    <NuxtLayout>
        <SocialActivitiesSection />
    </NuxtLayout>
</template>

<script setup>
import SocialActivitiesSection from '~/components/sections/SocialActivitiesSection.vue';

useHead({
    title: 'Social Activities - Portfolio',
    meta: [
        { name: 'description', content: 'My involvement in social activities, events, and community organizations.' }
    ]
});
</script>
