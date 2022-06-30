<template>
    <main class="justify-content-center">
        <form class="form-signin text-center" @submit.prevent="submitLogin">
            <img class="mb-4" src="@/assets/logo.png" alt="logo" width="120" height="120">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
            <div class="form-floating">
                <input type="email" class="form-control" :class="{ 'is-invalid': $v.fields.email.$error }" id="floatingInput" placeholder="name@example.com" v-model="$v.fields.email.$model">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" :class="{ 'is-invalid': $v.fields.password.$error }" id="floatingPassword" placeholder="Password" v-model="$v.fields.password.$model">
                <label for="floatingPassword">Password</label>
            </div>
            <div v-if="$v.fields.$error">
                <div class="d-block invalid-feedback" v-if="!$v.fields.email.required">Email is required</div>
                <div class="d-block invalid-feedback" v-if="!$v.fields.email.email">Email is invalid.</div>
            </div>
            <div v-if="$v.fields.$error">
                <div class="d-block invalid-feedback" v-if="!$v.fields.password.required">Password is required</div>
                <div class="d-block invalid-feedback" v-if="!$v.fields.password.minLength">Password must have at least {{$v.fields.password.$params.minLength.min}} letters.</div>
            </div>
            <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">Sign in</button>
        </form>
    </main>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
    name: "Login",
    data() {
        return {
            fields: {
                email: '',
                password: '',
            }
        }
    },
    computed: {
        ...mapGetters([
            'isAuthorise',
        ]),
    },
    validations: {
        fields: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(4)
            }
        }
    },
    methods: {
        ...mapActions([
            'login',
        ]),
        submitLogin() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                return;
            }
            this.login(this.fields)
                .then(() => {
                    if(this.isAuthorise) {
                        this.$router.push({ name: 'admin-clients' })
                    }
                });
        },
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if(vm.isAuthorise) {
                vm.$router.push({ name: 'admin-clients' })
            }
        })
    }

}
</script>

<style scoped>

.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}

.form-signin {
    font-weight: 400;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>