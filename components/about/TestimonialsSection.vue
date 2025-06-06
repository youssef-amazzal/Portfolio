<template>
    <section class="testimonials">
        <h3 class="h3 testimonials-title">Testimonials</h3>

        <div class="testimonials-container">
            <ul class="testimonials-list has-scrollbar" ref="testimonialsList">
                <li class="testimonials-item" v-for="testimonial in testimonials" :key="testimonial.name">
                    <div class="content-card" @click="$emit('openModal', testimonial)" data-testimonials-item>
                        <figure class="testimonials-avatar-box">
                            <img :src="testimonial.avatar" :alt="testimonial.name" width="60" data-testimonials-avatar>
                        </figure>
                        <h4 class="h4 testimonials-item-title" data-testimonials-title>{{ testimonial.name }}</h4>
                        <div class="testimonials-text" data-testimonials-text>
                            <p>{{ testimonial.text }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Define props
defineProps({
    testimonials: {
        type: Array,
        required: true
    }
});

// Define emits
defineEmits(['openModal']);

// References for auto-scroll containers
const testimonialsList = ref(null);

// Auto-scroll settings
const scrollSettings = {
    speed: 0.5, // pixels per animation frame
    direction: 1, // 1 for right to left, -1 for left to right
    paused: false,
    animationFrame: null,
    hasLogged: false
};

// Auto-scroll function
const autoScroll = (element, settings) => {
    if (!element || settings.paused) return;

    // Log the first time to help with debugging
    if (!settings.hasLogged) {
        console.log(`Auto-scrolling element:`, element.className);
        console.log(`Element scroll width: ${element.scrollWidth}, client width: ${element.clientWidth}`);
        settings.hasLogged = true;
    }

    // Ensure the element has enough content to scroll
    if (element.scrollWidth <= element.clientWidth) {
        console.log(`Element ${element.className} doesn't have enough content to scroll`);
        return;
    }

    const scrollAmount = settings.speed * settings.direction;
    element.scrollLeft += scrollAmount;

    // Check if we need to loop (with a larger threshold to ensure smooth looping)
    const threshold = 20;
    if (settings.direction > 0 && element.scrollLeft >= element.scrollWidth - element.clientWidth - threshold) {
        // Reached end, restart from beginning
        element.scrollLeft = 0;
        console.log(`Resetting ${element.className} scroll position to beginning`);
    } else if (settings.direction < 0 && element.scrollLeft <= threshold) {
        // Reached beginning, restart from end
        element.scrollLeft = element.scrollWidth - element.clientWidth;
        console.log(`Resetting ${element.className} scroll position to end`);
    }

    // Continue animation
    settings.animationFrame = requestAnimationFrame(() => autoScroll(element, settings));
};

// Pause scrolling when user interacts
const pauseScroll = (settings) => {
    settings.paused = true;
    if (settings.animationFrame) {
        cancelAnimationFrame(settings.animationFrame);
    }
};

// Resume scrolling after user stops interacting
const resumeScroll = (element, settings) => {
    settings.paused = false;
    settings.animationFrame = requestAnimationFrame(() => autoScroll(element, settings));
};

// Event handler functions (need to be defined outside to properly remove them)
const testimonialsHandlers = {
    mouseenter: () => pauseScroll(scrollSettings),
    mouseleave: () => resumeScroll(testimonialsList.value, scrollSettings),
    touchstart: () => pauseScroll(scrollSettings),
    touchend: () => resumeScroll(testimonialsList.value, scrollSettings)
};

// Start auto-scroll
const startAutoScroll = () => {
    if (testimonialsList.value) {
        console.log('Starting testimonials auto-scroll');
        // Add interaction events
        testimonialsList.value.addEventListener('mouseenter', testimonialsHandlers.mouseenter);
        testimonialsList.value.addEventListener('mouseleave', testimonialsHandlers.mouseleave);
        testimonialsList.value.addEventListener('touchstart', testimonialsHandlers.touchstart);
        testimonialsList.value.addEventListener('touchend', testimonialsHandlers.touchend);

        // Start scrolling
        autoScroll(testimonialsList.value, scrollSettings);
    }
};

// Clean up function
const cleanupAutoScroll = () => {
    // Cancel animation frame
    if (scrollSettings.animationFrame) {
        cancelAnimationFrame(scrollSettings.animationFrame);
    }

    // Remove event listeners if element exists
    if (testimonialsList.value) {
        testimonialsList.value.removeEventListener('mouseenter', testimonialsHandlers.mouseenter);
        testimonialsList.value.removeEventListener('mouseleave', testimonialsHandlers.mouseleave);
        testimonialsList.value.removeEventListener('touchstart', testimonialsHandlers.touchstart);
        testimonialsList.value.removeEventListener('touchend', testimonialsHandlers.touchend);
    }
};

// Setup auto-scroll on component mount with a small delay to ensure DOM is ready
onMounted(() => {
    // Allow a brief moment for the DOM to be fully rendered
    setTimeout(() => {
        console.log('Starting auto-scroll with testimonials:', testimonialsList.value);
        startAutoScroll();
    }, 100);
});

// Clean up on component unmount
onBeforeUnmount(() => {
    console.log('Cleaning up testimonials auto-scroll');
    cleanupAutoScroll();
});
</script>

<style scoped>
/* Testimonials section styles */
.testimonials {
    margin-bottom: 30px;
}

.testimonials-title {
    margin-bottom: 20px;
}

.testimonials-container {
    overflow: hidden;
    position: relative;
}

.testimonials-list {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 15px;
    margin: 0 -15px;
    padding: 25px 15px;
    padding-bottom: 35px;
    overflow-x: auto;
    scroll-behavior: smooth;
    overscroll-behavior-inline: contain;
    scrollbar-width: none;
    /* Hide scrollbar for Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.testimonials-list::-webkit-scrollbar {
    display: none;
}

/* Additional style for smooth looping */
.testimonials-list::after {
    content: '';
    padding-right: 20px;
}

/* Ensure cursor shows it's interactive */
.testimonials-list {
    cursor: grab;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.testimonials-list:active {
    cursor: grabbing;
}

.testimonials-item {
    min-width: 100%;
    scroll-snap-align: center;
}

.testimonials-avatar-box {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(15px, -25px);
    background: var(--bg-gradient-onyx);
    border-radius: 14px;
    box-shadow: var(--shadow-1);
}

.testimonials-item-title {
    margin-bottom: 7px;
}

.testimonials-text {
    color: var(--light-gray);
    font-size: var(--fs-6);
    font-weight: var(--fw-300);
    line-height: 1.6;
    display: -webkit-box;
    line-clamp: 4;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Media queries for responsive design */
@media (min-width: 580px) {

    /* testimonials */
    .testimonials-title {
        margin-bottom: 25px;
    }

    .testimonials-list {
        gap: 30px;
        margin: 0 -30px;
        padding: 30px;
        padding-bottom: 35px;
    }

    .content-card {
        padding: 30px;
        padding-top: 25px;
    }

    .testimonials-avatar-box {
        transform: translate(30px, -30px);
        border-radius: 20px;
    }

    .testimonials-avatar-box img {
        width: 80px;
    }

    .testimonials-item-title {
        margin-bottom: 10px;
        margin-left: 95px;
    }

    .testimonials-text {
        line-clamp: 2;
        -webkit-line-clamp: 2;
    }
}

@media (min-width: 1024px) {

    /* testimonials */
    .testimonials-item {
        min-width: calc(50% - 15px);
    }
}
</style>
