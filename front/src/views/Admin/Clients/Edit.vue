<template>
    <div v-if="isLoading">Loading</div>
    <div v-else>
        <PageHeader :data="header" />
        <form class="needs-validation col-md-6" @submit.prevent="submitEdit">
            <div class="row g-3">
                <div class="col-sm-6">
                    <label for="firstName" class="form-label">First name</label>
                    <input type="text" class="form-control" :class="{ 'is-invalid': $v.fields.first_name.$error }" id="firstName" placeholder="First name" v-model="$v.fields.first_name.$model">
                    <div class="d-block invalid-feedback" v-if="$v.fields.first_name.$dirty && $v.fields.first_name.$error">
                        First name is required.
                    </div>
                </div>

                <div class="col-sm-6">
                    <label for="lastName" class="form-label">Last name</label>
                    <input type="text" class="form-control" :class="{ 'is-invalid': $v.fields.last_name.$error }" id="lastName" placeholder="Last name" v-model="$v.fields.last_name.$model">
                    <div class="d-block invalid-feedback" v-if="$v.fields.last_name.$dirty && $v.fields.last_name.$error">
                        Last name is required.
                    </div>
                </div>

                <div class="col-12">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" :class="{ 'is-invalid': $v.fields.address.$error }" id="address" placeholder="Address" v-model="$v.fields.address.$model">
                    <div class="d-block invalid-feedback" v-if="$v.fields.address.$dirty && $v.fields.address.$error">
                        Address is required.
                    </div>
                </div>
                <div class="col-12">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="text" class="form-control" :class="{ 'is-invalid': $v.fields.phone.$error }" id="phone" placeholder="Phone" v-model="$v.fields.phone.$model">
                    <div class="d-block invalid-feedback" v-if="$v.fields.phone.$dirty && $v.fields.phone.$error">
                        Phone is required and must contain only numeric.
                    </div>
                </div>
            </div>
            <hr class="my-4">
            <button class="btn btn-primary btn-lg" type="submit">Save</button>
        </form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { required, numeric } from 'vuelidate/lib/validators'
import PageHeader from "@/components/Admin/PageHeader";
export default {
    name: 'Edit',
    components: {
        PageHeader
    },
    data() {
        return {
            header: {
                title: this.$route.meta.title,
                routeName: 'admin-clients',
                btnName: 'Back'
            },
            isLoading: false,
            id: this.$route.params.id,
            fields: {
                first_name: '',
                last_name: '',
                address: '',
                phone: '',
            }
        }
    },
    async created() {
        this.isLoading = true;
        await this.fetchClient(this.id)
            .then(() => {
                if(this.isError) {
                    this.$router.push({ name: this.$route.meta.errorRedirect });
                    this.$toast.error(this.getClientActionMessage);
                }
                this.fields = this.getClient
                this.isLoading = false;
            })
    },
    computed: {
        ...mapGetters([
            'getClient',
            'getClientActionMessage',
            'isError',
        ]),
    },
    validations: {
        fields: {
            first_name: {
                required
            },
            last_name: {
                required
            },
            address: {
                required
            },
            phone: {
                required,
                numeric
            },
        }
    },
    methods: {
        ...mapActions([
            'fetchClient',
            'editClient',
        ]),
        submitEdit() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                return;
            }
            this.editClient(this.fields)
                .then(() => {
                    if(this.isError) {
                        this.$toast.error(this.getClientActionMessage);
                        return;
                    }
                    this.$toast.success(this.getClientActionMessage);
                })
        },
    },

}
</script>

<style scoped>

</style>