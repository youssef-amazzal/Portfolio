<template>
    <article class="contact" data-page="contact">
        <header>
            <h2 class="h2 article-title">Contact</h2>
        </header>

        <!-- <section class="mapbox" data-mapbox>
            <figure>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199666.5651251294!2d-121.58334177520186!3d38.56165006739519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac672b28397f9%3A0x921f6aaa74197fdb!2sSacramento%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1647608789441!5m2!1sen!2sbd"
                    width="400" height="300" loading="lazy">
                </iframe>
            </figure>
        </section> -->

        <section class="contact-form">
            <h3 class="h3 form-title">Contact Form</h3>
            <form @submit.prevent="submitForm" class="form" data-form>
                <div class="input-wrapper">
                    <input type="text" v-model="formData.name" class="form-input" placeholder="Full name" required
                        data-form-input>
                    <input type="email" v-model="formData.email" class="form-input" placeholder="Email address" required
                        data-form-input>
                </div>

                <textarea v-model="formData.message" class="form-input" placeholder="Your Message" required
                    data-form-input></textarea>

                <!-- Status messages -->
                <div v-if="submitStatus === 'success'" class="form-status success">
                    Message sent successfully! 🎉
                </div>
                <div v-if="submitStatus === 'error'" class="form-status error">
                    Failed to send message. Please try again.
                </div>

                <button class="form-btn" type="submit" :disabled="!isFormValid || isSubmitting" data-form-btn>
                    <ion-icon name="paper-plane"></ion-icon>
                    <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
                </button>
            </form>
        </section>
    </article>
</template>

<script setup>
import { useContactForm } from '~/composables/useContactForm';

const {
    formData,
    isSubmitting,
    submitStatus,
    isFormValid,
    submitForm,
    clearStatus
} = useContactForm();
</script>

<style scoped>
/* Contact section styles */
.article-title {
    margin-bottom: 2rem;
    /* Uses global styles from style.css for color and ::after */
}

.mapbox {
    position: relative;
    height: 250px;
    width: 100%;
    border-radius: 16px;
    margin-bottom: 30px;
    border: 1px solid var(--jet);
    overflow: hidden;
}

.mapbox figure {
    height: 100%;
}

.mapbox iframe {
    width: 100%;
    height: 100%;
    border: none;
    filter: grayscale(1) invert(1);
}

.contact-form {
    margin-bottom: 10px;
}

.form-title {
    margin-bottom: 20px;
}

.input-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 25px;
    margin-bottom: 25px;
}

.form-input {
    color: var(--white-2);
    font-size: var(--fs-6);
    font-weight: var(--fw-400);
    padding: 13px 20px;
    border: 1px solid var(--jet);
    border-radius: 14px;
    outline: none;
    background: none;
}

.form-input::placeholder {
    font-weight: var(--fw-500);
}

.form-input:focus {
    border-color: var(--primary-color);
}

.form-input:focus:invalid {
    border-color: var(--bittersweet-shimmer);
}

textarea.form-input {
    min-height: 100px;
    height: 120px;
    max-height: 200px;
    resize: vertical;
    margin-bottom: 25px;
}

textarea.form-input::-webkit-resizer {
    display: none;
}

.form-btn {
    position: relative;
    width: 100%;
    background: var(--border-gradient-onyx);
    color: var(--primary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 13px 20px;
    border-radius: 14px;
    font-size: var(--fs-6);
    text-transform: capitalize;
    box-shadow: var(--shadow-3);
    z-index: 1;
    transition: var(--transition-1);
}

.form-btn::before {
    content: "";
    position: absolute;
    inset: 1px;
    background: var(--bg-gradient-jet);
    border-radius: inherit;
    z-index: -1;
    transition: var(--transition-1);
}

.form-btn ion-icon {
    font-size: 16px;
}

.form-btn:hover {
    background: var(--bg-gradient-yellow-1);
}

.form-btn:hover::before {
    background: var(--bg-gradient-yellow-2);
}

.form-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.form-btn:disabled:hover {
    background: var(--border-gradient-onyx);
}

.form-btn:disabled:hover::before {
    background: var(--bg-gradient-jet);
}

/* Form status messages */
.form-status {
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    font-size: var(--fs-6);
    font-weight: var(--fw-400);
}

.form-status.success {
    background: hsla(142, 76%, 36%, 0.1);
    color: hsl(142, 76%, 56%);
    border: 1px solid hsla(142, 76%, 36%, 0.2);
}

.form-status.error {
    background: hsla(0, 100%, 50%, 0.1);
    color: hsl(0, 100%, 70%);
    border: 1px solid hsla(0, 100%, 50%, 0.2);
}

/* For the hidden spinner on number inputs */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Hide number input spinner for Firefox */
input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
}

/* Media queries for responsive design */
@media (min-width: 580px) {
    .mapbox {
        height: 380px;
        border-radius: 18px;
    }

    .input-wrapper {
        gap: 30px;
        margin-bottom: 30px;
    }

    .form-input {
        padding: 15px 20px;
    }

    textarea.form-input {
        margin-bottom: 30px;
    }

    .form-btn {
        --fs-6: 16px;
        padding: 16px 20px;
    }

    .form-btn ion-icon {
        font-size: 18px;
    }
}

@media (min-width: 768px) {
    .input-wrapper {
        grid-template-columns: 1fr 1fr;
    }

    .form-btn {
        width: max-content;
        margin-left: auto;
    }
}
</style>
