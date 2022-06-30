<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">{{ data.title }}</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
            <div class="form-group mb-0 me-3" v-if="searchBar">
                <input type="text" class="form-control" placeholder="Search" @input="$emit('search', $event.target.value)">
            </div>
            <router-link :to="{ name: data.routeName }" class="btn btn-outline-primary">
                {{ data.btnName }}
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "PageHeader",
    props: {
        data: {
            type: Object,
            required: true
        },
        searchBar: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>

</style>