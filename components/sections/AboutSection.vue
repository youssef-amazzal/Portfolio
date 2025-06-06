<template>
    <article class="about" data-page="about">
        <header>
            <h2 class="h2 article-title">About me</h2>
        </header>

        <AboutText />

        <ServicesSection />

        <!-- <TestimonialsSection :testimonials="testimonials" @openModal="openModal" /> -->
        <!-- <TestimonialsModal :isModalOpen="isModalOpen" :selectedTestimonial="selectedTestimonial"
            @closeModal="closeModal" /> -->

        <!-- <ClientsSection :clients="clients" /> -->
    </article>
</template>

<script setup>
import { useModal } from '~/composables/useModal';

// Import all the modular components
import AboutText from '~/components/about/AboutText.vue';
import ServicesSection from '~/components/about/ServicesSection.vue';
import TestimonialsSection from '~/components/about/TestimonialsSection.vue';
import TestimonialsModal from '~/components/about/TestimonialsModal.vue';
import ClientsSection from '~/components/about/ClientsSection.vue';

// Testimonials data
const testimonials = [
    {
        name: 'Daniel lewis',
        avatar: '/assets/images/avatar-1.png',
        text: 'Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia.'
    },
    {
        name: 'Jessica miller',
        avatar: '/assets/images/avatar-2.png',
        text: 'Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia.'
    },
    {
        name: 'Emily evans',
        avatar: '/assets/images/avatar-3.png',
        text: 'Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia.'
    },
    {
        name: 'Henry william',
        avatar: '/assets/images/avatar-4.png',
        text: 'Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia.'
    }
];

// Clients data
const clients = [
    { key: "logo-1", name: "Client Logo 1", logo: "/assets/images/logo-1-color.png" },
    { key: "logo-2", name: "Client Logo 2", logo: "/assets/images/logo-2-color.png" },
    { key: "logo-3", name: "Client Logo 3", logo: "/assets/images/logo-3-color.png" },
    { key: "logo-4", name: "Client Logo 4", logo: "/assets/images/logo-4-color.png" },
    { key: "logo-5", name: "Client Logo 5", logo: "/assets/images/logo-5-color.png" },
    { key: "logo-6", name: "Client Logo 6", logo: "/assets/images/logo-6-color.png" }
];

// Use the modal composable for testimonials modal functionality
const { isOpen: isModalOpen, selectedItem: selectedTestimonial, openModal, closeModal } = useModal();
</script>


<style scoped>
/* Main About section styles */
.about .article-title {
    margin-bottom: 15px;
}

/* Responsive styles */
@media (min-width: 580px) {
    .about .article-title {
        margin-bottom: 20px;
    }
}
</style>