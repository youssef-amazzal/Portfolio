<template>
  <Icon v-if="icons[name]" :name="icons[name]" class="ion-icon" :size="size" />
  <span v-else class="ion-icon-fallback">{{ name }}</span>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: '24'
  }
});

// Map Ionicons names to equivalent icon names from @nuxt/icon
const icons = {
  // Basic UI
  'chevron-down': 'heroicons:chevron-down',
  'close-outline': 'heroicons:x-mark',
  'eye-outline': 'heroicons:eye',
  
  // Communication
  'mail-outline': 'heroicons:envelope',
  'phone-portrait-outline': 'heroicons:device-phone-mobile',
  
  // Documents & Data
  'book-outline': 'heroicons:book-open',
  'calendar-outline': 'heroicons:calendar',
  'paper-plane': 'heroicons:paper-airplane',
  
  // Location
  'location-outline': 'heroicons:map-pin',
  
  // Social
  'logo-facebook': 'simple-icons:facebook',
  'logo-twitter': 'simple-icons:twitter',
  'logo-instagram': 'simple-icons:instagram',
};
</script>

<style scoped>
.ion-icon {
  display: inline-block;
  vertical-align: middle;
}
.ion-icon-fallback {
  display: inline-block;
  width: 24px;
  height: 24px;
  text-align: center;
  font-size: 10px;
  color: #999;
  background-color: #f0f0f0;
  border-radius: 4px;
}
</style>
