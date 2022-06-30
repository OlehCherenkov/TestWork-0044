<template>
    <div>
        <div v-if="isLoading">Loading</div>
        <div v-else>
            <PageHeader :data="header" :searchBar="true" @search="search"/>
            <div v-if="clients && clients.data && clients.data.length">
                <Table :data="clients.data" :headerData="getClientsTableHeader" @editItem="editItem" @deleteItem="deleteItem" />
                <Pagination :data="clients" @pagination-change-page="pagination"/>
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
            clients: {},
            header: {
                title: this.$route.meta.title,
                routeName: 'admin-create-client',
                btnName: 'Create'
            }
        }
    },
    async created() {
        this.isLoading = true
        await this.fetchClients({page: 1})
            .then(() => {
                this.clients = this.getClients
                this.isLoading = false
            })
    },
    computed: {
        ...mapGetters([
            'getClients',
            'getClientsTableHeader',
            'getClientActionMessage',
            'isError'
        ]),
    },
    methods: {
        ...mapActions([
            'fetchClients',
            'deleteClient'
        ]),
        async pagination() {
            this.isLoading = true
            await this.fetchClients({page: 1})
                .then(() => {
                    this.clients = this.getClients
                    this.isLoading = false
                })
        },
        async search(search) {
            await this.fetchClients({page: 1, search})
                .then(() => {
                    this.clients = this.getClients
                })
        },
        editItem(id) {
            this.$router.push({ name: 'admin-edit-client', params: { id } });
        },
        deleteItem(id) {
            this.isLoading = true;
            this.deleteClient(id)
                .then(() => {
                    this.clients = this.getClients
                    this.isLoading = false
                    if(this.isError) {
                        this.$toast.error(this.getClientActionMessage);
                        return;
                    }
                    this.$toast.success(this.getClientActionMessage);
                })
        }
    }

}
</script>

<style scoped>

</style>