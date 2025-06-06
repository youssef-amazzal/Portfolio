<template>
    <section class="testimonials">
        <h3 class="h3 testimonials-title">Testimonials</h3>

        <ul class="testimonials-list has-scrollbar">
            <li class="testimonials-item" v-for="(testimonial, index) in testimonials" :key="index">
                <div class="content-card" @click="openModal(testimonial)">
                    <figure class="testimonials-avatar-box">
                        <img :src="testimonial.avatar" :alt="testimonial.name" width="60">
                    </figure>

                    <h4 class="h4 testimonials-item-title">{{ testimonial.name }}</h4>

                    <div class="testimonials-text">
                        <p>{{ testimonial.text }}</p>
                    </div>
                </div>
            </li>
        </ul>

        <!-- Testimonials modal -->
        <div class="modal-container" :class="{ active: isModalOpen }" data-modal-container>
            <div class="overlay" @click="closeModal" data-overlay></div>

            <section class="testimonials-modal">
                <button class="modal-close-btn" @click="closeModal" data-modal-close-btn>
                    <IonIcon name="close-outline" />
                </button>

                <div class="modal-img-wrapper">
                    <figure class="modal-avatar-box">
                        <img :src="currentTestimonial?.avatar" :alt="currentTestimonial?.name" width="80">
                    </figure>
                    <img src="/assets/images/icon-quote.svg" alt="quote icon">
                </div>

                <div class="modal-content">
                    <h4 class="h3 modal-title">{{ currentTestimonial?.name }}</h4>
                    <time datetime="2021-06-14">14 June, 2021</time>
                    <div>
                        <p>{{ currentTestimonial?.text }}</p>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import IonIcon from '~/components/IonIcon.vue';

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

const isModalOpen = ref(false);
const currentTestimonial = ref(null);

const openModal = (testimonial) => {
    currentTestimonial.value = testimonial;
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};
</script>
