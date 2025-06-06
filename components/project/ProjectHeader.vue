<template>
    <header class="project-header">
        <button class="back-btn" @click="$emit('back')">
            <ion-icon name="arrow-back-outline"></ion-icon>
            Back to Portfolio
        </button>
        <h2 class="h2 article-title">{{ project.title }}</h2>
    </header>
</template>

<script setup>
defineProps({
    project: {
        type: Object,
        required: true
    }
})

defineEmits(['back'])
</script>

<style scoped>
.project-header {
    padding-bottom: 20px;
    border-bottom: 1px solid var(--jet);
    margin-bottom: 30px;
}

.back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--primary-color);
    font-size: var(--fs-6);
    font-weight: var(--fw-500);
    margin-bottom: 20px;
    padding: 8px 16px;
    border-radius: 8px;
    transition: var(--transition-1);
    background: transparent;
    border: 1px solid var(--jet);
}

.back-btn:hover {
    background: var(--primary-color);
    color: var(--eerie-black-1);
    border-color: var(--primary-color);
}

.back-btn ion-icon {
    font-size: 18px;
}
</style>
