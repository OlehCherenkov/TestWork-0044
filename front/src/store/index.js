import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from './modules/admin/auth'
import clients from './modules/admin/clients'
import pets from './modules/admin/pets'
import reports from './modules/admin/reports'

export default new Vuex.Store({
    modules: {
        auth,
        clients,
        pets,
        reports,
    }
})
