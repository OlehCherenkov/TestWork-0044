import axiosIns from '../../../plugins/axios'
export default {
    actions: {
        async fetchPets({commit}, data) {
            const page = data.page
            const searchParam = data.search ? `&search=${data.search}` : ``;
            return await axiosIns().get(`admin/pets?page=${page}${searchParam}`)
                .then((result) => {
                    if(result.data) {
                        commit('CHECK_ERROR', {})
                        commit('GET_PETS', result.data.data);
                    }
                })
                .catch((error) => {
                    const data = {
                        status: error.response.status,
                        message: error.response.data.message,
                        full: error.response
                    }
                    commit('GET_PET_ACTION_RESULT', data.message)
                    commit('CHECK_ERROR', data)
                })
        },
        async fetchAllPets({commit}) {
            return await axiosIns().get(`admin/pets/all`)
                .then((result) => {
                    if(result.data) {
                        commit('CHECK_ERROR', {})
                        commit('GET_ALL_PETS', result.data.data);
                    }
                })
                .catch((error) => {
                    const data = {
                        status: error.response.status,
                        message: error.response.data.message,
                        full: error.response
                    }
                    commit('GET_PET_ACTION_RESULT', data.message)
                    commit('CHECK_ERROR', data)
                })
        },
        async fetchPet({commit}, id) {
            return await axiosIns().get(`admin/pets/${id}`)
                .then((result) => {
                    if(result.data) {
                        commit('CHECK_ERROR', {})
                        commit('GET_PET', result.data.data);
                    }
                })
                .catch((error) => {
                    const data = {
                        status: error.response.status,
                        message: error.response.data.message,
                        full: error.response
                    }
                    commit('GET_PET_ACTION_RESULT', data.message)
                    commit('CHECK_ERROR', data)
                })
        },
        async createPet({commit}, data) {
            return await axiosIns().post(`admin/pets`, data)
                .then((result) => {
                    if(result.data) {
                        commit('CHECK_ERROR', {})
                        commit('GET_PET_ACTION_RESULT', result.data.data)
                    }
                })
                .catch((error) => {
                    const data = {
                        status: error.response.status,
                        message: error.response.data.message,
                        full: error.response
                    }
                    commit('GET_PET_ACTION_RESULT', data.message)
                    commit('CHECK_ERROR', data)
                })
        },
        async editPet({commit}, data) {
            return await axiosIns().put(`admin/pets/${data.id}`, data)
                .then((result) => {
                    if(result.data) {
                        commit('CHECK_ERROR', {})
                        commit('GET_PET', result.data.data)
                        commit('GET_PET_ACTION_RESULT', result.data.message)
                    }
                })
                .catch((error) => {
                    const data = {
                        status: error.response.status,
                        message: error.response.data.message,
                        full: error.response
                    }
                    commit('GET_PET_ACTION_RESULT', data.message)
                    commit('CHECK_ERROR', data)
                })
        },
        async deletePet({commit}, id) {
            return await axiosIns().delete(`admin/pets/${id}`)
                .then((result) => {
                    if(result.data) {
                        commit('CHECK_ERROR', {})
                        commit('GET_PETS', result.data.data)
                        commit('GET_PET_ACTION_RESULT', result.data.message)
                    }
                })
                .catch((error) => {
                    const data = {
                        status: error.response.status,
                        message: error.response.data.message,
                        full: error.response
                    }
                    commit('GET_PET_ACTION_RESULT', data.message)
                    commit('CHECK_ERROR', data)
                })
        },
    },
    mutations: {
        GET_PETS(state, data) {
            state.pets = data
        },
        GET_ALL_PETS(state, data) {
            state.allPets = data
        },
        GET_PET(state, data) {
            state.pet = data
        },
        GET_PET_ACTION_RESULT(state, data) {
            state.petActionMessage = data
        },
        CHECK_ERROR(state, data) {
            state.error = data
        }
    },
    state: {
        allPets: {},
        pets: {},
        pet: {},
        petActionMessage: '',
    },
    getters: {
        getAllPets: (state) => {
            return state.allPets
        },
        getPets: (state) => {
            return state.pets
        },
        getPet: (state) => {
            return state.pet
        },
        getPetActionMessage: (state) => {
            return state.petActionMessage
        },
        getPetsTableHeader: (state) => {
            if(state.pets.data && state.pets.data.length) {
                return Object.keys(state.pets.data[0])
            }
            return []
        },
    }
}
