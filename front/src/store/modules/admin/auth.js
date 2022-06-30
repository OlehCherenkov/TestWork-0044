import axiosIns from '../../../plugins/axios'
export default {
    actions: {
        async login({commit}, data) {
            return await axiosIns(true).post('login', data)
                .then((result) => {
                    if(result.data) {
                        commit('GET_TOKEN', result.data.access_token);
                    }
                })
                .catch((error) => {
                    const data = {
                        status: error.response.status,
                        message: error.response.data.message,
                        full: error.response
                    }
                    console.log(data);
                    commit('REMOVE_TOKEN');
                })
        },
        async logout({commit}) {
            return await axiosIns(true).post('logout')
                .then(() => {
                    commit('REMOVE_TOKEN');
                })
        }
    },
    mutations: {
        GET_TOKEN(state, data) {
            localStorage.setItem('token', data)
            state.authorise = true
        },
        REMOVE_TOKEN(state) {
            localStorage.removeItem('token')
            state.authorise = false
        }
    },
    state: {
        authorise: !!localStorage.getItem('token'),
    },
    getters: {
        isAuthorise: (state) => {
            return state.authorise
        }
    }
}
