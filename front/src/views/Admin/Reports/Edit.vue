<template>
    <div v-if="isLoading">Loading</div>
    <div v-else>
        <PageHeader :data="header" />
        <form class="needs-validation col-md-6" @submit.prevent="submitEdit">
            <div class="row g-3">
                <div class="col-sm-12">
                    <label for="client" class="form-label">Client</label>
                    <select class="form-select" :class="{ 'is-invalid': $v.fields.client_id.$error }" id="client" v-model="$v.fields.client_id.$model">
                        <option value="" selected>Choose client</option>
                        <option v-for="client in clients" :key="client.id" :value="client.id" :selected="+client.id === +fields.client_id">{{ client.full_name }}</option>
                    </select>
                    <div class="d-block invalid-feedback" v-if="$v.fields.client_id.$dirty && $v.fields.client_id.$error">
                        Client is required.
                    </div>
                </div>

                <div class="col-sm-12">
                    <label for="pet" class="form-label">Pet</label>
                    <select class="form-select" :class="{ 'is-invalid': $v.fields.pet_id.$error }" id="pet" v-model="$v.fields.pet_id.$model">
                        <option value="" selected>Choose pet</option>
                        <option v-for="pet in pets" :key="pet.id" :value="pet.id" :selected="+pet.id === +fields.pet_id">{{ pet.name }}</option>
                    </select>
                    <div class="d-block invalid-feedback" v-if="$v.fields.pet_id.$dirty && $v.fields.pet_id.$error">
                        Pet is required.
                    </div>
                </div>

                <div class="col-12">
                    <label for="visit_date" class="form-label">Visit date</label>
                    <DatePicker class="w-100" :class="{ 'is-invalid': $v.fields.visit_date.$error }" id="visit_date" placeholder="Visit date" v-model="$v.fields.visit_date.$model" valueType="format"/>
                    <div class="d-block invalid-feedback" v-if="$v.fields.visit_date.$dirty && $v.fields.visit_date.$error">
                        Visit date is required.
                    </div>
                </div>

                <div class="col-12">
                    <label for="report" class="form-label">Report</label>
                    <textarea class="form-control" :class="{ 'is-invalid': $v.fields.report.$error }" id="report" placeholder="Report" v-model="$v.fields.report.$model"></textarea>
                    <div class="d-block invalid-feedback" v-if="$v.fields.report.$dirty && $v.fields.report.$error">
                        Report is required.
                    </div>
                </div>

            </div>
            <hr class="my-4">
            <button class="btn btn-primary btn-lg" type="submit">Save</button>
        </form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import { required } from 'vuelidate/lib/validators'
import DatePicker from 'vue2-datepicker';
import PageHeader from '@/components/Admin/PageHeader';
export default {
    name: 'Edit',
    components: {
        PageHeader,
        DatePicker
    },
    data() {
        return {
            header: {
                title: this.$route.meta.title,
                routeName: 'admin-reports',
                btnName: 'Back'
            },
            isLoading: false,
            id: this.$route.params.id,
            clients: {},
            pets: {},
            fields: {
                client_id: '',
                pet_id: '',
                visit_date: '',
                report: '',
            },
        }
    },
    async created() {
        this.isLoading = true;
        await this.fetchReport(this.id)
            .then(async () => {
                if(this.isError) {
                    this.$router.push({ name: this.$route.meta.errorRedirect });
                    this.$toast.error(this.getReportActionMessage);
                }
                this.fields = this.getReport
                await this.fetchAllClients()
                    .then(() => {
                        this.clients = this.getAllClients
                    })
                await this.fetchAllPets()
                    .then(() => {
                        this.pets = this.getAllPets
                        this.isLoading = false;
                    })
            })
    },
    computed: {
        ...mapGetters([
            'getAllClients',
            'getAllPets',
            'getReport',
            'getReportActionMessage',
            'isError'
        ]),
    },
    validations: {
        fields: {
            client_id: {
                required
            },
            pet_id: {
                required
            },
            visit_date: {
                required
            },
            report: {
                required,
            },
        }
    },
    methods: {
        ...mapActions([
            'fetchReport',
            'fetchAllClients',
            'fetchAllPets',
            'editReport',
        ]),
        submitEdit() {
            this.$v.$touch()
            if (this.$v.$invalid) {

                return;
            }
            this.editReport(this.fields)
                .then(() => {
                    if(this.isError) {
                        this.$toast.error(this.getReportActionMessage);
                        return;
                    }
                    this.$toast.success(this.getReportActionMessage);
                })
        },
    },

}
</script>

<style>
.mx-datepicker {
    display: block !important;
}
</style>