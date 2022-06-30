<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">{{ title }}</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-nav">
            <div class="nav-item text-nowrap">
                <a class="nav-link px-3" href="#" @click="signOut">Sign out</a>
            </div>
        </div>
    </header>
</template>

<script>
import {mapActions} from "vuex";
export default {
    name: "Header",
    data() {
        return {
            title: 'Admin Panel'
        }
    },
    methods: {
        ...mapActions([
            'logout',
        ]),
        signOut() {
            this.logout()
                .then(() => {
                    this.$router.push({ name: 'admin-login' })
                });
        }
    }
}
</script>

<style scoped>

</style>