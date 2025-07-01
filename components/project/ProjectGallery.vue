<template>
    <div v-if="project.gallery && project.gallery.length" class="project-gallery">
        <GalleryGrid :images="project.gallery" title="Gallery" title-class="h3" :alt-prefix="`${project.title} - Image`"
            layout="masonry" @image-click="openGalleryModal" />

        <GalleryModal :is-open="isGalleryOpen" :current-image="project.gallery[currentImageIndex]"
            :current-index="currentImageIndex" :total-images="project.gallery.length"
            :image-alt="`${project.title} - Image ${currentImageIndex + 1}`" @close="closeGalleryModal"
            @previous="previousImage" @next="nextImage" />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGalleryModal } from '~/composables/useGalleryModal';

const props = defineProps({
    project: {
        type: Object,
        required: true
    }
});

// Use the gallery modal composable
const {
    isGalleryOpen,
    currentImageIndex,
    openGalleryModal,
    closeGalleryModal,
    previousImage: prevImage,
    nextImage: nextImg,
    setupKeyboardNavigation
} = useGalleryModal();

// Setup keyboard navigation with the total number of images
const totalImages = computed(() => props.project.gallery?.length || 0);
setupKeyboardNavigation(totalImages);

// Wrapper functions to pass the total images count
const previousImage = () => prevImage(totalImages.value);
const nextImage = () => nextImg(totalImages.value);
</script>

<style scoped>
.project-gallery {
    margin-top: 30px;
}
</style>
