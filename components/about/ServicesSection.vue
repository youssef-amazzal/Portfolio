<template>
    <section class="service">
        <h3 class="h3 service-title">What i'm doing</h3>

        <ul class="service-list">
            <li class="service-item" v-for="service in services" :key="service.title">
                <div class="service-icon-box">
                    <img :src="service.icon" :alt="service.title + ' icon'" width="40">
                </div>
                <div class="service-content-box">
                    <h4 class="h4 service-item-title">{{ service.title }}</h4>
                    <p class="service-item-text">{{ service.description }}</p>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup>

const services = [
    {
        title: 'Web Development',
        description: 'Building web applications with Vue.js, Nuxt.js, and Laravel.',
        icon: '/assets/images/icon-dev.svg'
    },
    {
        title: 'Desktop Development',
        description: 'Developing cross-platform desktop applications using c++/java/js.',
        icon: '/assets/images/icon-desktop.svg'
    },
    {
        title: 'Mobile App Development',
        description: 'Creating cross-platform mobile apps with Flutter.',
        icon: '/assets/images/icon-app.svg'
    },
    {
        title: 'Graphic Design',
        description: 'Designing visuals for digital and print media.',
        icon: '/assets/images/icon-design.svg'
    }
];
</script>

<style scoped>
/* Service section styles */
.service {
    margin-bottom: 35px;
}

.service-title {
    margin-bottom: 20px;
}

.service-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

.service-item {
    position: relative;
    background: var(--border-gradient-onyx);
    padding: 20px;
    border-radius: 14px;
    box-shadow: var(--shadow-2);
    z-index: 1;
}

.service-item::before {
    content: "";
    position: absolute;
    inset: 1px;
    background: var(--bg-gradient-jet);
    border-radius: inherit;
    z-index: -1;
}

.service-icon-box {
    margin-bottom: 10px;
}

.service-icon-box img {
    margin: auto;
}

.service-content-box {
    text-align: center;
}

.service-item-title {
    margin-bottom: 7px;
}

.service-item-text {
    color: var(--light-gray);
    font-size: var(--fs-6);
    font-weight: var(--fw-3);
    line-height: 1.6;
}

/* Media queries for responsive design */
@media (min-width: 580px) {

    /* service */
    .service-item {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 18px;
        padding: 30px;
    }

    .service-icon-box {
        margin-bottom: 0;
        margin-top: 5px;
    }

    .service-content-box {
        text-align: left;
    }
}

@media (min-width: 1024px) {

    /* service */
    .service-list {
        grid-template-columns: 1fr 1fr;
        gap: 20px 25px;
    }
}
</style>
