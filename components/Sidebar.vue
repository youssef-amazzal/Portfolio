<script setup>
import { useSidebar } from '~/composables/useSidebar'
import AvatarSection from './sidebar/AvatarSection.vue'
import ContactsList from './sidebar/ContactsList.vue'
import SocialLinks from './sidebar/SocialLinks.vue'
import Separator from './sidebar/Separator.vue'

const { isOpen, toggleSidebar } = useSidebar()

const roles = [
    { title: 'Student', primary: false },
    { title: 'Software Engineer', primary: false },
    { title: 'Graphic Designer', primary: false }
];

const contacts = [
    {
        type: 'email',
        title: 'Email',
        icon: 'mail-outline',
        component: 'a',
        props: { href: 'mailto:youssef.amazzal-etu@etu.univh2c.ma' },
        value: 'youssef.amazzal-etu@etu.univh2c.ma'
    },
    {
        type: 'phone',
        title: 'Phone',
        icon: 'phone-portrait-outline',
        component: 'a',
        props: { href: 'tel:+212643001457' },
        value: '+212643001457'
    },
    {
        type: 'birthday',
        title: 'Birthday',
        icon: 'calendar-outline',
        component: 'time',
        props: { datetime: '2002-02-07' },
        value: 'February 7, 2002'
    },
    {
        type: 'location',
        title: 'Location',
        icon: 'location-outline',
        component: 'address',
        props: {},
        value: 'Salé, Morocco'
    }
];

const socialLinks = [
    {
        platform: 'GitHub',
        url: 'https://github.com/youssef-amazzal',
        icon: 'logo-github'
    },
    {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/youssef-amazzal-0849641aa',
        icon: 'logo-linkedin'
    }
];
</script>

<template>
    <aside class="sidebar" :class="{ 'active': isOpen }" data-sidebar>
        <AvatarSection name="Youssef Amazzal" :roles="roles" :is-open="isOpen" @toggle="toggleSidebar" />
        <div class="sidebar-info_more">
            <Separator />
            <ContactsList :contacts="contacts" />
            <Separator />
            <SocialLinks :social-links="socialLinks" />
            <Separator />

            <!-- Resume Download Button -->
            <div class="resume-download">
                <a href="/resume.pdf" download="Youssef_Amazzal_Resume.pdf" class="resume-btn">
                    <div class="icon-box">
                        <ion-icon name="download-outline"></ion-icon>
                    </div>
                    <span>Download Resume</span>
                </a>
            </div>
        </div>
    </aside>
</template>

<style scoped>
/* Main sidebar container styles */
.sidebar {
    background: var(--eerie-black-2);
    border: 1px solid var(--jet);
    border-radius: 20px;
    padding: 15px;
    box-shadow: var(--shadow-1);
    z-index: 1;
    max-height: 115px;
    overflow: hidden;
    transition: var(--transition-2);
}

.sidebar.active {
    max-height: 500px;
}

.sidebar-info_more {
    opacity: 0;
    visibility: hidden;
    transition: var(--transition-2);
}

.sidebar.active .sidebar-info_more {
    opacity: 1;
    visibility: visible;
}

/* Resume download button styles */
.resume-download {
    margin-top: 15px;
}

.resume-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: var(--eerie-black-1);
    border: 1px solid var(--jet);
    border-radius: 14px;
    text-decoration: none;
    color: var(--white-2);
    font-size: var(--fs-7);
    font-weight: var(--fw-500);
    transition: var(--transition-1);
}

.resume-btn:hover {
    background: var(--onyx);
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.resume-btn .icon-box {
    background: var(--border-gradient-onyx);
    color: var(--primary-color);
    width: 30px;
    height: 30px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    flex-shrink: 0;
}

.resume-btn:hover .icon-box {
    background: var(--primary-color);
}

.resume-btn span {
    flex: 1;
    white-space: nowrap;
}

@media (min-width: 580px) {
    .sidebar {
        max-height: 155px;
        margin-bottom: 20px;
    }

    .sidebar.active {
        max-height: 644px;
    }

    .resume-btn {
        padding: 14px 18px;
        gap: 15px;
    }

    .resume-btn .icon-box {
        width: 32px;
        height: 32px;
        font-size: 18px;
    }
}

@media (min-width: 1250px) {
    .sidebar {
        position: sticky;
        top: 0;
        max-height: calc(100vh - 40px);
        height: calc(100vh - 40px);
        margin-bottom: 0;
        padding-top: 30px;
        z-index: 1;
        min-width: 320px;
        width: 320px;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: none;
        /* Hide scrollbar for Firefox */
        -ms-overflow-style: none;
        /* Hide scrollbar for IE and Edge */
    }

    /* Hide scrollbar for WebKit browsers */
    .sidebar::-webkit-scrollbar {
        display: none;
    }

    .sidebar-info_more {
        opacity: 1;
        visibility: visible;
    }
}

@media (min-width: 1440px) {
    .sidebar {
        max-height: calc(100vh - 80px);
        height: calc(100vh - 80px);
    }
}
</style>
