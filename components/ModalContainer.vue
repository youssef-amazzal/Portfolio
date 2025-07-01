<template>
    <div v-if="isOpen" class="modal-container" :class="{ 'active': isOpen }" @click="handleBackdropClick">
        <div class="modal-overlay" @click="$emit('close')"></div>
        <div class="modal-content" :class="modalClass" @click.stop>
            <button v-if="showCloseButton" class="modal-close-btn" @click="$emit('close')">
                <ion-icon name="close-outline"></ion-icon>
            </button>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    modalClass: {
        type: String,
        default: ''
    },
    showCloseButton: {
        type: Boolean,
        default: true
    },
    closeOnBackdrop: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['close']);

const handleBackdropClick = (event) => {
    if (props.closeOnBackdrop && event.target === event.currentTarget) {
        emit('close');
    }
};
</script>

<style scoped>
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: var(--transition-1);
}

.modal-container.active {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
}

.modal-content {
    position: relative;
    background: var(--eerie-black-2);
    border: 1px solid var(--jet);
    border-radius: 14px;
    box-shadow: var(--shadow-5);
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    z-index: 2;
}

.modal-close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: var(--eerie-black-2);
    border: 1px solid var(--jet);
    color: var(--white-2);
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition-1);
    z-index: 10;
}

.modal-close-btn:hover {
    background: var(--jet);
    color: var(--primary-color);
}

.modal-close-btn ion-icon {
    font-size: 18px;
}
</style>
