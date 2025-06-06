<template>
    <div class="project-hero">
        <img :src="project.image" :alt="project.title" class="hero-image">
    </div>
</template>

<script setup>
defineProps({
    project: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
.project-hero {
    margin-bottom: 40px;
}

.hero-image {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: var(--shadow-2);
}

@media (min-width: 768px) {
    .hero-image {
        max-height: 500px;
    }
}
</style>
