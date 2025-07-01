<template>
    <div v-if="images && images.length" class="gallery-section">
        <h3 v-if="title" :class="titleClass">{{ title }}</h3>
        <div class="gallery-grid" :class="{
            'masonry-layout': layout === 'masonry',
            'grid-layout': layout === 'grid'
        }">
            <div v-for="(image, index) in images" :key="index" class="gallery-item" @click="$emit('imageClick', index)">
                <img :src="image" :alt="getImageAlt(index)" loading="lazy" @error="handleImageError">
                <div class="gallery-overlay">
                    <ion-icon name="expand-outline"></ion-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    images: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        default: 'Photo Gallery'
    },
    titleClass: {
        type: String,
        default: 'h3'
    },
    altPrefix: {
        type: String,
        default: 'Gallery image'
    },
    layout: {
        type: String,
        default: 'grid',
        validator: (value) => ['grid', 'masonry'].includes(value)
    }
});

defineEmits(['imageClick']);

const getImageAlt = (index) => {
    return `${props.altPrefix} ${index + 1}`;
};

const handleImageError = (event) => {
    // Hide the gallery item if image fails to load
    event.target.parentElement.style.display = 'none';
};
</script>

<style scoped>
.gallery-section {
    margin-top: 30px;
}

.gallery-section h3 {
    color: var(--white-2);
    font-size: var(--fs-3);
    font-weight: var(--fw-600);
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--primary-color);
}

/* Grid Layout (fixed aspect ratio) */
.gallery-grid.grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.grid-layout .gallery-item {
    aspect-ratio: 16/9;
}

/* Masonry Layout (variable height) */
.gallery-grid.masonry-layout {
    column-count: 1;
    column-gap: 15px;
    margin-top: 20px;
}

.masonry-layout .gallery-item {
    break-inside: avoid;
    margin-bottom: 15px;
    width: 100%;
}

.gallery-item {
    position: relative;
    cursor: pointer;
    border-radius: 12px;
    overflow: hidden;
    background: var(--border-gradient-onyx);
    transition: transform 0.3s ease;
}

.gallery-item:hover {
    transform: translateY(-5px);
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.masonry-layout .gallery-item img {
    height: auto;
}

.gallery-item:hover img {
    transform: scale(1.05);
}

.gallery-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    color: white;
    font-size: 24px;
}

.gallery-item:hover .gallery-overlay {
    opacity: 1;
}

/* Responsive Design for Masonry Layout */
@media (min-width: 450px) {
    .gallery-grid.masonry-layout {
        column-count: 2;
        column-gap: 15px;
    }
}

@media (min-width: 768px) {
    .gallery-grid.masonry-layout {
        column-count: 2;
        column-gap: 20px;
    }

    .gallery-grid.grid-layout {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
    }

    .gallery-overlay {
        font-size: 20px;
    }
}

@media (min-width: 1024px) {
    .gallery-grid.masonry-layout {
        column-count: 3;
        column-gap: 20px;
    }
}

@media (min-width: 1200px) {
    .gallery-grid.masonry-layout {
        column-count: 4;
        column-gap: 20px;
    }
}

@media (max-width: 480px) {
    .gallery-grid.grid-layout {
        grid-template-columns: 1fr;
        gap: 12px;
    }
}
</style>
