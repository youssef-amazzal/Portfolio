<template>
    <ul class="contacts-list">
        <li v-for="contact in contacts" :key="contact.type" class="contact-item">
            <div class="icon-box">
                <ion-icon :name="contact.icon"></ion-icon>
            </div>
            <div class="contact-info">
                <p class="contact-title">{{ contact.title }}</p>
                <component :is="contact.component" v-bind="contact.props" class="contact-link">
                    {{ contact.value }}
                </component>
            </div>
        </li>
    </ul>
</template>

<script setup>
defineProps({
    contacts: {
        type: Array,
        required: true
    }
})
</script>

<style scoped>
.contacts-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

.contact-item {
    min-width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
}

.contact-info {
    max-width: calc(100% - 46px);
    width: calc(100% - 46px);
}

.contact-title {
    color: var(--light-gray-70);
    font-size: var(--fs-8);
    text-transform: uppercase;
    margin-bottom: 2px;
}

.contact-info :is(.contact-link, time, address) {
    color: var(--white-2);
    font-size: var(--fs-7);
}

.contact-info address {
    font-style: normal;
}

@media (min-width: 580px) {
    .contacts-list {
        gap: 20px;
    }

    .contact-info {
        max-width: calc(100% - 64px);
        width: calc(100% - 64px);
    }
}

@media (min-width: 768px) {
    .contacts-list {
        grid-template-columns: 1fr 1fr;
        gap: 30px 15px;
    }
}

@media (min-width: 1250px) {
    .contacts-list {
        grid-template-columns: 1fr;
    }

    .contact-info :is(.contact-link) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .contact-info :is(.contact-link, time, address) {
        --fs-7: 14px;
        font-weight: var(--fw-300);
    }
}
</style>
