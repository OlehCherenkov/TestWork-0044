<template>
    <div>
        <PageHeader :data="header" />
        <form class="needs-validation col-md-6" @submit.prevent="submitCreate">
            <div class="row g-3">
                <div class="col-sm-12">
                    <label for="client" class="form-label">Client</label>
                    <select class="form-select" :class="{ 'is-invalid': $v.fields.client_id.$error }" id="client" v-model="$v.fields.client_id.$model">
                        <option value="" selected>Choose client</option>
                        <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.full_name }}</option>
                    </select>
                    <div class="d-block invalid-feedback" v-if="$v.fields.client_id.$dirty && $v.fields.client_id.$error">
                        Client is required.
                    </div>
                </div>

                <div class="col-sm-12">
                    <label for="lastName" class="form-label">Name</label>
                    <input type="text" class="form-control" :class="{ 'is-invalid': $v.fields.name.$error }" id="lastName" placeholder="Name" v-model="$v.fields.name.$model">
                    <div class="d-block invalid-feedback" v-if="$v.fields.name.$dirty && $v.fields.name.$error">
                        Name is required.
                    </div>
                </div>

                <div class="col-12">
                    <label for="photo" class="form-label">Photo</label>
                    <input type="file" class="form-control" id="photo" @change="uploadPhoto()">
                    <img class="img-thumbnail mt-1" :src="previewPhoto" v-if="previewPhoto">
                </div>
                <div class="col-12">
                    <label for="species" class="form-label">Species</label>
                    <input type="text" class="form-control" :class="{ 'is-invalid': $v.fields.species.$error }" id="species" placeholder="Species" v-model="$v.fields.species.$model">
                    <div class="d-block invalid-feedback" v-if="$v.fields.species.$dirty && $v.fields.species.$error">
                        Species is required.
                    </div>
                </div>
                <div class="col-12">
                    <label for="breed" class="form-label">Breed</label>
                    <input type="text" class="form-control" :class="{ 'is-invalid': $v.fields.breed.$error }" id="breed" placeholder="Breed" v-model="$v.fields.breed.$model">
                    <div class="d-block invalid-feedback" v-if="$v.fields.breed.$dirty && $v.fields.breed.$error">
                        Breed is required.
                    </div>
                </div>
                <div class="col-12">
                    <label for="weight" class="form-label">Weight</label>
                    <input type="text" class="form-control" :class="{ 'is-invalid': $v.fields.weight.$error }" id="weight" placeholder="Weight" v-model="$v.fields.weight.$model">
                    <div class="d-block invalid-feedback" v-if="$v.fields.weight.$dirty && $v.fields.weight.$error">
                        Weight is required.
                    </div>
                </div>
                <div class="col-12">
                    <label for="birthday" class="form-label">Birthday</label>
                    <DatePicker class="w-100" :class="{ 'is-invalid': $v.fields.birthday.$error }" id="birthday" placeholder="Birthday" v-model="$v.fields.birthday.$model" valueType="format"/>
                    <div class="d-block invalid-feedback" v-if="$v.fields.birthday.$dirty && $v.fields.birthday.$error">
                        Birthday is required.
                    </div>
                </div>

            </div>
            <hr class="my-4">
            <button class="btn btn-primary btn-lg" type="submit">Create</button>
        </form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import { required } from 'vuelidate/lib/validators'
import DatePicker from 'vue2-datepicker';
import PageHeader from '@/components/Admin/PageHeader';
export default {
    name: 'Create',
    components: {
        PageHeader,
        DatePicker
    },
    data() {
        return {
            header: {
                title: this.$route.meta.title,
                routeName: 'admin-pets',
                btnName: 'Back'
            },
            isLoading: false,
            clients: {},
            fields: {
                client_id: '',
                name: '',
                photo: '',
                species: '',
                breed: '',
                weight: '',
                birthday: '',
            },
            previewPhoto: '',
        }
    },
    async created() {
        this.isLoading = true;
        await this.fetchAllClients()
            .then(() => {
                this.clients = this.getAllClients
                this.isLoading = false;
            })
    },
    computed: {
        ...mapGetters([
            'getAllClients',
            'getPetActionMessage',
            'isError'
        ]),
    },
    validations: {
        fields: {
            client_id: {
                required
            },
            name: {
                required
            },
            species: {
                required
            },
            breed: {
                required,
            },
            weight: {
                required,
            },
            birthday: {
                required,
            },
        }
    },
    methods: {
        ...mapActions([
            'fetchAllClients',
            'createPet',
        ]),
        uploadPhoto() {
            const input = document.getElementById('photo').files[0];
            const reader = new FileReader()
            reader.onload = () => {
                this.fields.photo = reader.result;
                this.previewPhoto = reader.result;
            }
            reader.readAsDataURL(input);
        },
        submitCreate() {
            this.$v.$touch()
            if (this.$v.$invalid) {

                return;
            }
            this.createPet(this.fields)
                .then(() => {
                    if(this.isError) {
                        this.$toast.error(this.getPetActionMessage);
                        return;
                    }
                    this.$toast.success(this.getPetActionMessage);
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