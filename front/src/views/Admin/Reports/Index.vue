<template>
    <div>
        <div v-if="isLoading">Loading</div>
        <div v-else>
            <PageHeader :data="header" :searchBar="true" @search="search"/>
            <div v-if="reports && reports.data && reports.data.length">
                <Table :data="reports.data" :headerData="getReportsTableHeader" @editItem="editItem" @deleteItem="deleteItem" />
                <Pagination :data="reports" @pagination-change-page="pagination"/>
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
            reports: {},
            header: {
                title: this.$route.meta.title,
                routeName: 'admin-create-report',
                btnName: 'Create'
            }
        }
    },
    async created() {
        this.isLoading = true
        await this.fetchReports({page: 1})
            .then(() => {
                this.reports = this.getReports
                this.isLoading = false
            })
    },
    computed: {
        ...mapGetters([
            'getReports',
            'getReportsTableHeader',
            'getReportActionMessage',
            'isError'
        ]),
    },
    methods: {
        ...mapActions([
            'fetchReports',
            'deleteReport'
        ]),
        async pagination() {
            this.isLoading = true
            await this.fetchReports({page: 1})
                .then(() => {
                    this.reports = this.getReports
                    this.isLoading = false
                })
        },
        async search(search) {
            await this.fetchReports({page: 1, search})
                .then(() => {
                    this.reports = this.getReports
                })
        },
        editItem(id) {
            this.$router.push({ name: 'admin-edit-report', params: { id } });
        },
        deleteItem(id) {
            this.isLoading = true;
            this.deleteReport(id)
                .then(() => {
                    this.reports = this.getReports
                    this.isLoading = false
                    if(this.isError) {
                        this.$toast.error(this.getReportActionMessage);
                        return;
                    }
                    this.$toast.success(this.getReportActionMessage);
                })
        }
    }

}
</script>

<style scoped>

</style>