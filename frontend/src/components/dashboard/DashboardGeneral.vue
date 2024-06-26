<template>
    <div class="row">
        <div class="col-lg-6">
            <h2 class="mb-4">User Information</h2>
            <form>
                <div v-if="showGenericWarningMessage" class="text-center">
                    <span class="text-danger small">Something happened, please try again later!</span>
                </div>
                <div class="mb-3">
                    <label for="username">Username</label>
                    <input v-model="userInfo.username" type="text" id="username" class="form-control"
                        :disabled="!editMode" v-model.trim="userInfo.username" required :class="{
                            'is-valid': isUsernameValid && editMode,
                            'is-invalid': !isUsernameValid && showUsernameWarningMessage && editMode,
                        }" @focus="showUsernameWarningMessage = true" @blur="showUsernameWarningMessage = false">
                    <span v-if="showUsernameWarningMessage && !isUsernameValid" class="text-danger small">Username
                        must be between 5 and 20 characters!</span>
                </div>

                <div class="mb-3">
                    <label for="email">Email</label>
                    <input v-model="userInfo.email" type="email" id="email" class="form-control" :disabled="!editMode"
                        v-model.trim="userInfo.email" required :class="{
                            'is-valid': isEmailValid && editMode,
                            'is-invalid':
                                ((!isEmailValid && showEmailWarningMessage) ||
                                    existingEmail === userInfo.email) && editMode,
                        }" @focus="showEmailWarningMessage = true" @blur="showEmailWarningMessage = false">

                    <span v-if="showEmailWarningMessage && !isEmailValid" class="text-danger small">Please provide a
                        valid email!
                    </span>
                    <span v-if="existingEmail === userInfo.email" class="text-danger small">
                        {{ `${existingEmail} is already exist!` }}
                    </span>
                </div>

                <div class="mb-3">
                    <label for="password">Password</label>
                    <input v-model="userInfo.password" type="password" id="password" class="form-control"
                        :disabled="!editMode" v-model.trim="userInfo.password" :class="{
                            'is-valid': isPasswordValid && editMode,
                            'is-invalid': !isPasswordValid && showPasswordWarningMessage && editMode,
                        }" @focus="showPasswordWarningMessage = true" @blur="showPasswordWarningMessage = false" />
                    <span v-if="showPasswordWarningMessage && !isPasswordValid" class="text-danger small">Password
                        must be between 4 and 10 characters!</span>
                </div>
                <button @click="!editMode ? toggleEditMode() : saveUserInfo()" type="button" class="btn btn-primary"
                    :disabled="editMode ? !isFormValid : false">
                    {{ editMode ? 'Save' : 'Edit' }}
                </button>
                <button v-if="editMode" style=" background-color: #ecc73c !important; border-color: #ecc73c !important;"
                    @click="cancelEditMode" type="button" class="btn btn-primary ms-3">
                    Cancel
                </button>
            </form>
        </div>
        <div class="col-lg-6"></div>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore.js';
import { useUserStore } from '@/stores/userStore.js';
import { mapState, mapActions } from 'pinia';
import { useToast } from "vue-toastification";

export default {
    name: "DashboardGeneral",
    data() {
        return {
            userInfo: {
                username: '',
                email: '',
                password: '',
            },
            editMode: false,
            showUsernameWarningMessage: false,
            showEmailWarningMessage: false,
            showPasswordWarningMessage: false,
            existingEmail: null,
            showGenericWarningMessage: false,
        };
    },
    created() {
        this.userInfo.username = this.user.username;
        this.userInfo.email = this.user.email;
    },
    computed: {
        ...mapState(useAuthStore, ['user']),
        isFormValid() {
            return this.isUsernameValid && this.isEmailValid && this.isPasswordValid;
        },
        isUsernameValid() {
            return (
                this.userInfo.username.length >= 5 &&
                this.userInfo.username.length <= 20
            );
        },
        isEmailValid() {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.userInfo.email);
        },
        isPasswordValid() {
            return (
                this.userInfo.password.length >= 4 &&
                this.userInfo.password.length <= 10
            );
        },
    },
    methods: {
        ...mapActions(useUserStore, ['updateUserDetails']),
        ...mapActions(useAuthStore, ['logout']),

        toggleEditMode() {
            this.editMode = !this.editMode;
        },
        async saveUserInfo() {

            try {
                await this.updateUserDetails(this.userInfo)

                const toast = useToast();
                toast.success('Please login with new details!', {
                    position: 'top-right',
                    timeout: 2500,
                    closeButton: 'button',
                    icon: true,
                    rtl: false,
                });

                setTimeout(() => {
                    this.logout()
                }, 3000);
            } catch (e) {
                const { error } = e;
                if (error === 'Email already exist!') {
                    this.existingEmail = this.userInfo.email;
                } else {
                    this.showGenericWarningMessage = true;
                }
            }

        },
        cancelEditMode() {
            this.editMode = false;
            this.userInfo.username = this.user.username;
            this.userInfo.email = this.user.email;
            this.userInfo.password = '';
        },
    },
}
</script>

<style scoped></style>