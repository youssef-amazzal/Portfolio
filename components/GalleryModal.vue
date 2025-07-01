<template>
    <div v-if="isOpen" class="gallery-modal" @click="$emit('close')">
        <div class="modal-content" @click.stop>
            <button class="modal-close" @click="$emit('close')">
                <ion-icon name="close-outline"></ion-icon>
            </button>
            <img :src="currentImage" :alt="imageAlt" />
            <div class="gallery-navigation">
                <button @click="$emit('previous')" :disabled="currentIndex === 0" class="nav-btn prev-btn">
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </button>
                <span class="image-counter">
                    {{ currentIndex + 1 }} / {{ totalImages }}
                </span>
                <button @click="$emit('next')" :disabled="currentIndex === totalImages - 1" class="nav-btn next-btn">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    currentImage: {
        type: String,
        required: true
    },
    currentIndex: {
        type: Number,
        required: true
    },
    totalImages: {
        type: Number,
        required: true
    },
    imageAlt: {
        type: String,
        default: 'Gallery image'
    }
});

defineEmits(['close', 'previous', 'next']);
</script>

<style scoped>
.gallery-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
}

.modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.modal-content img {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.modal-close {
    position: absolute;
    top: -50px;
    right: 0;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    font-size: 20px;
    transition: background-color 0.3s ease;
}

.modal-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

.gallery-navigation {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px 20px;
    border-radius: 25px;
    backdrop-filter: blur(10px);
}

.nav-btn {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
}

.nav-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.image-counter {
    color: white;
    font-size: 14px;
    font-weight: 500;
    min-width: 60px;
    text-align: center;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .modal-content {
        max-width: 95vw;
        max-height: 95vh;
    }

    .modal-close {
        top: -40px;
        width: 35px;
        height: 35px;
        font-size: 18px;
    }

    .gallery-navigation {
        gap: 15px;
        padding: 8px 16px;
    }

    .nav-btn {
        font-size: 20px;
        padding: 6px;
    }

    .image-counter {
        font-size: 12px;
        min-width: 50px;
    }
}
</style>
