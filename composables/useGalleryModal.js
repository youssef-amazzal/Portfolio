import { ref, onMounted, onUnmounted } from 'vue';

export function useGalleryModal() {
    const isGalleryOpen = ref(false);
    const currentImageIndex = ref(0);

    const openGalleryModal = (index) => {
        currentImageIndex.value = index;
        isGalleryOpen.value = true;
        document.body.style.overflow = 'hidden';
    };

    const closeGalleryModal = () => {
        isGalleryOpen.value = false;
        document.body.style.overflow = 'auto';
    };

    const previousImage = (totalImages) => {
        if (currentImageIndex.value > 0) {
            currentImageIndex.value--;
        }
    };

    const nextImage = (totalImages) => {
        if (currentImageIndex.value < totalImages - 1) {
            currentImageIndex.value++;
        }
    };

    // Keyboard navigation
    const handleKeydown = (event, totalImages) => {
        if (!isGalleryOpen.value) return;

        switch (event.key) {
            case 'Escape':
                closeGalleryModal();
                break;
            case 'ArrowLeft':
                previousImage(totalImages);
                break;
            case 'ArrowRight':
                nextImage(totalImages);
                break;
        }
    };

    const setupKeyboardNavigation = (totalImages) => {
        const keydownHandler = (event) => handleKeydown(event, totalImages);
        
        onMounted(() => {
            document.addEventListener('keydown', keydownHandler);
        });

        onUnmounted(() => {
            document.removeEventListener('keydown', keydownHandler);
            // Cleanup: restore body overflow if component unmounts while modal is open
            if (isGalleryOpen.value) {
                document.body.style.overflow = 'auto';
            }
        });
    };

    return {
        isGalleryOpen,
        currentImageIndex,
        openGalleryModal,
        closeGalleryModal,
        previousImage,
        nextImage,
        setupKeyboardNavigation
    };
}
