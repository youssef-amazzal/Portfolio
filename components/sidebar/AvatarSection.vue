<template>
    <div class="sidebar-info">
        <figure class="avatar-box">
            <img src="/assets/images/pfp_square.webp" alt="Youssef AMAZZAL">
        </figure>

        <div class="info-content">
            <h1 class="name" title="Youssef AMAZZAL">{{ name }}</h1>
            <div class="titles-container">
                <p v-for="(role, index) in roles" :key="index" class="title" :class="{ 'primary-title': role.primary }">
                    {{ role.title }}
                </p>
            </div>
        </div>

        <button class="info_more-btn" @click="$emit('toggle')" data-sidebar-btn>
            <span>{{ isOpen ? 'Hide Contacts' : 'Show Contacts' }}</span>
            <ion-icon name="chevron-down"></ion-icon>
        </button>
    </div>
</template>

<script setup>
defineProps({
    name: {
        type: String,
        default: 'Youssef Amazzal'
    },
    roles: {
        type: Array,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: false
    }
})

defineEmits(['toggle'])
</script>

<style scoped>
.sidebar-info {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
}

.avatar-box {
    background: var(--bg-gradient-onyx);
    border-radius: 20px;
    width: 120px;
    height: 120px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.info-content .name {
    color: var(--white-2);
    font-size: var(--fs-3);
    font-weight: var(--fw-500);
    letter-spacing: -0.25px;
    margin-bottom: 10px;
}

.titles-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: flex-start;
}

.info-content .title {
    color: var(--white-1);
    background: var(--onyx);
    font-size: var(--fs-8);
    font-weight: var(--fw-300);
    width: max-content;
    padding: 3px 12px;
    border-radius: 8px;
    margin: 0;
}

.info-content .primary-title {
    background: var(--bg-gradient-yellow-1);
    color: var(--secondary-color);
    font-weight: var(--fw-500);
}

.info_more-btn {
    position: absolute;
    top: -15px;
    right: -15px;
    border-radius: 0 15px;
    font-size: 13px;
    color: var(--primary-color);
    background: var(--border-gradient-onyx);
    padding: 10px;
    box-shadow: var(--shadow-2);
    transition: var(--transition-1);
    z-index: 1;
}

.info_more-btn::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: inherit;
    background: var(--bg-gradient-jet);
    transition: var(--transition-1);
    z-index: -1;
}

.info_more-btn:hover,
.info_more-btn:focus {
    background: var(--bg-gradient-yellow-1);
}

.info_more-btn:hover::before,
.info_more-btn:focus::before {
    background: var(--bg-gradient-yellow-2);
}

.info_more-btn span {
    display: none;
}

@media (min-width: 580px) {
    .sidebar-info {
        gap: 25px;
    }

    .avatar-box {
        border-radius: 20px;
        width: 120px;
        height: 120px;
    }

    .info-content .name {
        margin-bottom: 15px;
    }

    .info-content .title {
        padding: 5px 18px;
    }

    .info_more-btn {
        top: -15px;
        right: -15px;
        padding: 10px 15px;
    }

    .info_more-btn span {
        display: block;
        font-size: var(--fs-8);
    }

    .info_more-btn ion-icon {
        display: none;
    }
}

@media (min-width: 1250px) {
    .sidebar-info {
        flex-direction: column;
    }

    .info-content .name {
        white-space: nowrap;
        text-align: center;
    }

    .titles-container {
        justify-content: center;
    }

    .info-content .title {
        margin: 2px;
    }

    .info_more-btn {
        display: none;
    }
}
</style>
