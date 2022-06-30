<template>
    <div>
        <div v-if="isLoading">Loading</div>
        <div v-else>
            <PageHeader :data="header" :searchBar="true" @search="search"/>
            <div v-if="pets && pets.data && pets.data.length">
                <Table :data="pets.data" :headerData="getPetsTableHeader" @editItem="editItem" @deleteItem="deleteItem" />
                <Pagination :data="pets" @pagination-change-page="pagination"/>
            </div>
            <div v-else>
                No data
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import PageHeader from '@/components/Admin/PageHeader';
import Table from '@/components/Admin/Table';
export default {
    name: 'Index',
    components: {
        Table,
        PageHeader
    },
    data() {
        return {
            isLoading: false,
            pets: {},
            header: {
                title: this.$route.meta.title,
                routeName: 'admin-create-pet',
                btnName: 'Create'
            }
        }
    },
    async created() {
        this.isLoading = true
        await this.fetchPets({page: 1})
            .then(() => {
                this.pets = this.getPets
                this.isLoading = false
            })
    },
    computed: {
        ...mapGetters([
            'getPets',
            'getPetsTableHeader',
            'getPetActionMessage',
            'isError'
        ]),
    },
    methods: {
        ...mapActions([
            'fetchPets',
            'deletePet'
        ]),
        async pagination() {
            this.isLoading = true
            await this.fetchPets({page: 1})
                .then(() => {
                    this.pets = this.getPets
                    this.isLoading = false
                })
        },
        async search(search) {
            await this.fetchPets({page: 1, search})
                .then(() => {
                    this.pets = this.getPets
                })
        },
        editItem(id) {
            this.$router.push({ name: 'admin-edit-pet', params: { id } });
        },
        deleteItem(id) {
            this.isLoading = true;
            this.deletePet(id)
                .then(() => {
                    this.pets = this.getPets
                    this.isLoading = false
                    if(this.isError) {
                        this.$toast.error(this.getPetActionMessage);
                        return;
                    }
                    this.$toast.success(this.getPetActionMessage);
                })
        }
    }

}
</script>

<style scoped>

</style>