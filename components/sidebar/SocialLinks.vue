<script setup>
defineProps({
    socialLinks: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <ul class="social-list">
        <li v-for="social in socialLinks" :key="social.platform" class="social-item">
            <a :href="social.url" target="_blank" class="social-link" :title="social.platform">
                <ion-icon :name="social.icon"></ion-icon>
            </a>
        </li>
    </ul>
</template>

<style scoped>
.social-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    padding-bottom: 4px;
    padding-left: 7px;
}

.social-item .social-link {
    color: var(--light-gray-70);
    font-size: 18px;
    transition: var(--transition-1);
}

.social-item .social-link:hover {
    color: var(--light-gray);
}

@media (min-width: 1250px) {
    .social-list {
        justify-content: center;
    }
}
</style>
