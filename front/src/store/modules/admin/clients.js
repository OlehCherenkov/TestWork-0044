import axiosIns from '../../../plugins/axios'
export default {
    actions: {
        async fetchClients({commit}, data) {
            const page = data.page
            const searchParam = data.search ? `&search=${data.search}` : ``;
            return await axiosIns().get(`admin/clients?page=${page}${searchParam}`)
                .then((result) => {
                    if(result.data) {
                        commit('CHECK_ERROR', {})
                        commit('GET_CLIENTS', result.data.data);
                    }
                })
                .catch((error) => {
                    const data = {
                        status: error.response.status,
                        message: error.response.data.message,
                        full: error.response
                    }
                    commit('GET_CLIENT_ACTION_RESULT', data.message)
                    commit('CHECK_ERROR', data)
                })
        },
        async fetchAllClients({commit}) {
            return await axiosIns().get(`admin/clients/all`)
                .then((result) => {
                    if(result.data) {
                        commit('CHECK_ERROR', {})
                        commit('GET_ALL_CLIENTS', result.data.data);
                    }
                })
                .catch((error) => {
                    const data = {
                        status: error.response.status,
                        message: error.response.data.message,
                        full: error.response
                    }
                    commit('GET_CLIENT_ACTION_RESULT', data.message)
                    commit('CHECK_ERROR', data)
                })
        },
        async fetchClient({commit}, id) {
            return await axiosIns().get(`admin/clients/${id}`)
                .then((result) => {
                    if(result.data) {
                        commit('CHECK_ERROR', {})
                        commit('GET_CLIENT', result.data.data);
                    }
                })
                .catch((error) => {
                    const data = {
                        status: error.response.status,
                        message: error.response.data.message,
                        full: error.response
                    }
                    commit('GET_CLIENT_ACTION_RESULT', data.message)
                    commit('CHECK_ERROR', data)
                })
        },
        async createClient({commit}, data) {
            return await axiosIns().post(`admin/clients`, data)
                .then((result) => {
                    if(result.data) {
                        commit('CHECK_ERROR', {})
                        commit('GET_CLIENT_ACTION_RESULT', result.data.data)
                    }
                })
                .catch((error) => {
                    const data = {
                        status: error.response.status,
                        message: error.response.data.message,
                        full: error.response
                    }
                    commit('GET_CLIENT_ACTION_RESULT', data.message)
                    commit('CHECK_ERROR', data)
                })
        },
        async editClient({commit}, data) {
            return await axiosIns().put(`admin/clients/${data.id}`, data)
                .then((result) => {
                    if(result.data) {
                        commit('CHECK_ERROR', {})
                        commit('GET_CLIENT', result.data.data)
                        commit('GET_CLIENT_ACTION_RESULT', result.data.message)
                    }
                })
                .catch((error) => {
                    const data = {
                        status: error.response.status,
                        message: error.response.data.message,
                        full: error.response
                    }
                    commit('GET_CLIENT_ACTION_RESULT', data.message)
                    commit('CHECK_ERROR', data)
                })
        },
        async deleteClient({commit}, id) {
            return await axiosIns().delete(`admin/clients/${id}`)
                .then((result) => {
                    if(result.data) {
                        commit('CHECK_ERROR', {})
                        commit('GET_CLIENTS', result.data.data)
                        commit('GET_CLIENT_ACTION_RESULT', result.data.message)
                    }
                })
                .catch((error) => {
                    const data = {
                        status: error.response.status,
                        message: error.response.data.message,
                        full: error.response
                    }
                    commit('GET_CLIENT_ACTION_RESULT', data.message)
                    commit('CHECK_ERROR', data)
                })
        },
    },
    mutations: {
        GET_CLIENTS(state, data) {
            state.clients = data
        },
        GET_ALL_CLIENTS(state, data) {
            state.allClients = data
        },
        GET_CLIENT(state, data) {
            state.client = data
        },
        GET_CLIENT_ACTION_RESULT(state, data) {
            state.clientActionMessage = data
        },
        CHECK_ERROR(state, data) {
            state.error = data
        }
    },
    state: {
        allClients: {},
        clients: {},
        client: {},
        clientActionMessage: '',
        error: {}
    },
    getters: {
        getAllClients: (state) => {
            return state.allClients
        },
        getClients: (state) => {
            return state.clients
        },
        getClient: (state) => {
            return state.client
        },
        getClientActionMessage: (state) => {
            return state.clientActionMessage
        },
        getClientsTableHeader: (state) => {
            if(state.clients.data && state.clients.data.length) {
                return Object.keys(state.clients.data[0])
            }
            return []
        },
        getErrors: (state) => {
            return state.error;
        },
        isError: (state) => {
            return Object.keys(state.error).length;
        }
    }
}
