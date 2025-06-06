<template>
    <div class="project-hero" :class="[`aspect-${project.aspectRatio || 'horizontal'}`]">
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
    border-radius: 12px;
    box-shadow: var(--shadow-2);
    display: block;
}

/* Default horizontal/square styling */
.aspect-horizontal .hero-image {
    max-height: 400px;
    object-fit: cover;
}

/* Vertical aspect ratio styling */
.aspect-vertical .hero-image,
.aspect-square .hero-image {
    max-height: 600px;
    max-width: 400px;
    object-fit: contain;
    margin: 0 auto;
}

@media (min-width: 768px) {

    .aspect-horizontal .hero-image {
        max-height: 500px;
    }

    .aspect-vertical .hero-image,
    .aspect-square .hero-image {
        max-height: 700px;
        max-width: 450px;
    }
}

@media (min-width: 1024px) {

    .aspect-vertical .hero-image,
    .aspect-square .hero-image {
        max-height: 800px;
        max-width: 500px;
    }
}
</style>
