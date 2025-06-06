<template>
    <div v-if="project.gallery && project.gallery.length" class="project-gallery">
        <h3 class="h3">Gallery</h3>
        <div class="gallery-grid">
            <div v-for="(image, index) in project.gallery" :key="index" class="gallery-item"
                @click="openImageModal(image)">
                <img :src="image" :alt="`${project.title} - Image ${index + 1}`" loading="lazy">
                <div class="gallery-overlay">
                    <ion-icon name="expand-outline"></ion-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    project: {
        type: Object,
        required: true
    }
})

const openImageModal = (image) => {
    // TODO: Implement image modal for full-screen view
    window.open(image, '_blank')
}
</script>

<style scoped>
.project-gallery h3 {
    margin-bottom: 20px;
    color: var(--white-2);
}

.gallery-grid {
    column-count: 1;
    column-gap: 15px;
    margin-bottom: 10px;
}

.gallery-item {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: var(--transition-1);
    break-inside: avoid;
    margin-bottom: 15px;
    width: 100%;
}

.gallery-item:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-3);
}

.gallery-item img {
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: var(--transition-1);
}

.gallery-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: var(--transition-1);
}

.gallery-item:hover .gallery-overlay {
    opacity: 1;
}

.gallery-overlay ion-icon {
    color: var(--white-2);
    font-size: 24px;
}

.gallery-item:hover img {
    transform: scale(1.05);
}

/* Responsive Design */
@media (min-width: 450px) {
    .gallery-grid {
        column-count: 2;
        column-gap: 15px;
    }
}

@media (min-width: 768px) {
    .gallery-grid {
        column-count: 2;
        column-gap: 20px;
    }
}

@media (min-width: 1024px) {
    .gallery-grid {
        column-count: 3;
        column-gap: 20px;
    }
}

@media (min-width: 1200px) {
    .gallery-grid {
        column-count: 4;
        column-gap: 20px;
    }
}
</style>
