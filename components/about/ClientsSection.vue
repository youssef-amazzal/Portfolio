<template>
    <section class="clients">
        <h3 class="h3 clients-title">Clients</h3>
        <div class="clients-container">
            <ul class="clients-list has-scrollbar" ref="clientsList">
                <li class="clients-item" v-for="client in clients" :key="client.key">
                    <a href="#">
                        <img :src="client.logo" alt="client logo">
                    </a>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Define props
defineProps({
    clients: {
        type: Array,
        required: true
    }
});

// References for auto-scroll containers
const clientsList = ref(null);

// Auto-scroll settings
const scrollSettings = {
    speed: 0.3, // pixels per animation frame
    direction: 1,
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
const clientsHandlers = {
    mouseenter: () => pauseScroll(scrollSettings),
    mouseleave: () => resumeScroll(clientsList.value, scrollSettings),
    touchstart: () => pauseScroll(scrollSettings),
    touchend: () => resumeScroll(clientsList.value, scrollSettings)
};

// Start auto-scroll
const startAutoScroll = () => {
    if (clientsList.value) {
        console.log('Starting clients auto-scroll', clientsList.value);
        console.log('Clients width:', clientsList.value.scrollWidth, 'Client container width:', clientsList.value.clientWidth);

        // Add interaction events
        clientsList.value.addEventListener('mouseenter', clientsHandlers.mouseenter);
        clientsList.value.addEventListener('mouseleave', clientsHandlers.mouseleave);
        clientsList.value.addEventListener('touchstart', clientsHandlers.touchstart);
        clientsList.value.addEventListener('touchend', clientsHandlers.touchend);

        // Start scrolling
        autoScroll(clientsList.value, scrollSettings);
    }
};

// Clean up function
const cleanupAutoScroll = () => {
    // Cancel animation frame
    if (scrollSettings.animationFrame) {
        cancelAnimationFrame(scrollSettings.animationFrame);
    }

    // Remove event listeners if element exists
    if (clientsList.value) {
        clientsList.value.removeEventListener('mouseenter', clientsHandlers.mouseenter);
        clientsList.value.removeEventListener('mouseleave', clientsHandlers.mouseleave);
        clientsList.value.removeEventListener('touchstart', clientsHandlers.touchstart);
        clientsList.value.removeEventListener('touchend', clientsHandlers.touchend);
    }
};

// Setup auto-scroll on component mount with a small delay to ensure DOM is ready
onMounted(() => {
    // Allow a brief moment for the DOM to be fully rendered
    setTimeout(() => {
        console.log('Starting auto-scroll with clients:', clientsList.value);
        startAutoScroll();
    }, 100);
});

// Clean up on component unmount
onBeforeUnmount(() => {
    console.log('Cleaning up clients auto-scroll');
    cleanupAutoScroll();
});
</script>

<style scoped>
/* Clients section styles */
.clients {
    margin-bottom: 15px;
}

.clients-container {
    overflow: hidden;
    position: relative;
}

.clients-list {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 15px;
    margin: 0 -15px;
    padding: 25px;
    padding-bottom: 25px;
    overflow-x: auto;
    scroll-behavior: smooth;
    overscroll-behavior-inline: contain;
    scrollbar-width: none;
    /* Hide scrollbar for Firefox */
    white-space: nowrap;
    /* Ensure items stay in a single row */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.clients-list::-webkit-scrollbar {
    display: none;
}

/* Additional style for smooth looping */
.clients-list::after {
    content: '';
    padding-right: 20px;
}

/* Ensure cursor shows it's interactive */
.clients-list {
    cursor: grab;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.clients-list:active {
    cursor: grabbing;
}

.clients-item {
    min-width: 150px;
    /* Set a fixed minimum width */
    scroll-snap-align: start;
    flex: 0 0 auto;
    /* Prevent items from growing or shrinking */
}

.clients-item img {
    width: 100%;
    filter: grayscale(1);
    transition: var(--transition-1);
}

.clients-item img:hover {
    filter: grayscale(0);
}

/* Media queries for responsive design */
@media (min-width: 450px) {
    .clients-item {
        min-width: calc(33.33% - 10px);
    }
}

@media (min-width: 580px) {

    /* clients */
    .clients-list {
        gap: 50px;
        margin: 0 -30px;
        padding: 45px;
        scroll-padding-inline: 45px;
    }

    .clients-item {
        min-width: calc(33.33% - 35px);
    }
}

@media (min-width: 1024px) {

    /* clients */
    .clients-item {
        min-width: calc(25% - 38px);
    }
}
</style>
