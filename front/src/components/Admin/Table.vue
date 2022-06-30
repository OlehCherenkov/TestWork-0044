<template>
    <div class="table-responsive">
        <table class="table table-striped table-sm">
            <thead>
            <tr>
                <th scope="col" v-for="(header, index) in headerData" :key="index">{{ header }}</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(itemData, index) in data" :key="index">
                <td v-for="(item, index) in itemData" :key="index">{{ item }}</td>
                <td class="text-end">
                    <span type="button" class="text-warning text-lg font-weight-bold me-3" @click="$emit('editItem', itemData.id)">
                        <i class="fas fa-edit"></i>
                    </span>
                    <span type="button" class="text-danger text-lg font-weight-bold" @click="$emit('deleteItem', itemData.id)">
                        <i class="fas fa-trash"></i>
                    </span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Table',
    props: {
        data: {
            type: Array,
            required: true
        },
        headerData: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

</style>