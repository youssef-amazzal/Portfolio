<template>
    <!-- testimonials modal -->
    <div class="modal-container" :class="{ 'active': isModalOpen }" data-modal-container>
        <div class="overlay" @click="$emit('closeModal')" data-overlay></div>

        <section class="testimonials-modal">
            <button class="modal-close-btn" @click="$emit('closeModal')" data-modal-close-btn>
                <ion-icon name="close-outline"></ion-icon>
            </button>

            <div class="modal-img-wrapper">
                <figure class="modal-avatar-box">
                    <img :src="selectedTestimonial?.avatar" :alt="selectedTestimonial?.name" width="80" data-modal-img>
                </figure>
                <img src="/assets/images/icon-quote.svg" alt="quote icon">
            </div>

            <div class="modal-content">
                <h4 class="h3 modal-title" data-modal-title>{{ selectedTestimonial?.name }}</h4>
                <time datetime="2021-06-14">14 June, 2021</time>
                <div data-modal-text>
                    <p>{{ selectedTestimonial?.text }}</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
// Define props
defineProps({
    isModalOpen: {
        type: Boolean,
        required: true
    },
    selectedTestimonial: {
        type: Object,
        default: null
    }
});

// Define emits
defineEmits(['closeModal']);
</script>

<style scoped>
/* Testimonials modal styles */
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    overscroll-behavior: contain;
    z-index: 20;
    pointer-events: none;
    visibility: hidden;
}

.modal-container::-webkit-scrollbar {
    display: none;
}

.modal-container.active {
    pointer-events: all;
    visibility: visible;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: hsl(0, 0%, 5%);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    z-index: 1;
    transition: var(--transition-1);
}

.modal-container.active .overlay {
    opacity: 0.8;
    visibility: visible;
    pointer-events: all;
}

.testimonials-modal {
    background: var(--eerie-black-2);
    position: relative;
    padding: 15px;
    margin: 15px 12px;
    border: 1px solid var(--jet);
    border-radius: 14px;
    box-shadow: var(--shadow-5);
    transform: scale(1.2);
    opacity: 0;
    transition: var(--transition-1);
    z-index: 2;
}

.modal-container.active .testimonials-modal {
    transform: scale(1);
    opacity: 1;
}

.modal-close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: var(--onyx);
    border-radius: 8px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--white-2);
    font-size: 18px;
    opacity: 0.7;
}

.modal-close-btn:hover,
.modal-close-btn:focus {
    opacity: 1;
}

.modal-close-btn ion-icon {
    --ionicon-stroke-width: 50px;
}

.modal-avatar-box {
    background: var(--bg-gradient-onyx);
    width: max-content;
    border-radius: 14px;
    margin-bottom: 15px;
    box-shadow: var(--shadow-2);
}

.modal-img-wrapper>img {
    display: none;
}

.modal-title {
    margin-bottom: 4px;
}

.modal-content time {
    font-size: var(--fs-6);
    color: var(--light-gray-70);
    font-weight: var(--fw-300);
    margin-bottom: 10px;
}

.modal-content p {
    color: var(--light-gray);
    font-size: var(--fs-6);
    font-weight: var(--fw-300);
    line-height: 1.6;
}

/* Media queries for responsive design */
@media (min-width: 580px) {

    /* testimonials modal */
    .modal-container {
        padding: 20px;
    }

    .testimonials-modal {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        gap: 25px;
        padding: 30px;
        border-radius: 20px;
    }

    .modal-img-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .modal-avatar-box {
        border-radius: 18px;
        margin-bottom: 0;
    }

    .modal-avatar-box img {
        width: 65px;
    }

    .modal-img-wrapper>img {
        display: block;
        flex-grow: 1;
        width: 35px;
    }
}
</style>
