<template>
    <div v-if="skills && skills.length" class="skills-section">
        <h4 v-if="title" :class="titleClass">{{ title }}</h4>
        <div class="skills-list">
            <span v-for="skill in skills" :key="skill" class="skill-tag">
                {{ skill }}
            </span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    skills: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    titleClass: {
        type: String,
        default: 'h4'
    }
});
</script>

<style scoped>
.skills-section h4 {
    color: var(--white-2);
    font-size: var(--fs-3);
    font-weight: var(--fw-600);
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--primary-color);
}

.skills-section h2 {
    color: var(--white-2);
    font-size: var(--fs-3);
    font-weight: var(--fw-600);
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--primary-color);
}

.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
}

.skill-tag {
    background: var(--eerie-black-2);
    border: 1px solid var(--jet);
    color: var(--light-gray);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: var(--fs-7);
    font-weight: var(--fw-400);
    transition: var(--transition-1);
}

.skill-tag:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
}
</style>
