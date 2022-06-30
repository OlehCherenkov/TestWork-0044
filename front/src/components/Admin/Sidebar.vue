<template>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3">
            <ul class="nav flex-column">
                <li class="nav-item" v-for="menuItem in menuList" :key="menuItem.route">
                    <router-link :to="{ name: menuItem.route }" class="nav-link">
                        <i :class="menuItem.icon"></i>
                        {{ menuItem.name }}
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import sidebarItems from "@/components/Admin/sidebarItems.js";
export default {
    name: 'SideBar',
    data() {
        return {
            menuList: sidebarItems.menu
        }
    },
}
</script>

<style>
.router-link-active {
    color: #2470dc !important;
}
</style>