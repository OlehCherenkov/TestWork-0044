import axiosIns from '../../../plugins/axios'
export default {
    actions: {
        async fetchReports({commit}, data) {
            const page = data.page
            const searchParam = data.search ? `&search=${data.search}` : ``;
            return await axiosIns().get(`admin/reports?page=${page}${searchParam}`)
                .then((result) => {
                    if(result.data) {
                        commit('CHECK_ERROR', {})
                        commit('GET_REPORTS', result.data.data);
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
        async fetchReport({commit}, id) {
            return await axiosIns().get(`admin/reports/${id}`)
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
        async createReport({commit}, data) {
            return await axiosIns().post(`admin/reports`, data)
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
        async editReport({commit}, data) {
            return await axiosIns().put(`admin/reports/${data.id}`, data)
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
        async deleteReport({commit}, id) {
            return await axiosIns().delete(`admin/reports/${id}`)
                .then((result) => {
                    if(result.data) {
                        commit('CHECK_ERROR', {})
                        commit('GET_REPORTS', result.data.data)
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
        GET_REPORTS(state, data) {
            state.reports = data
        },
        GET_CLIENT(state, data) {
            state.report = data
        },
        GET_CLIENT_ACTION_RESULT(state, data) {
            state.reportActionMessage = data
        },
    },
    state: {
        reports: {},
        report: {},
        reportActionMessage: '',
    },
    getters: {
        getReports: (state) => {
            return state.reports
        },
        getReport: (state) => {
            return state.report
        },
        getReportActionMessage: (state) => {
            return state.reportActionMessage
        },
        getReportsTableHeader: (state) => {
            if(state.reports.data && state.reports.data.length) {
                return Object.keys(state.reports.data[0])
            }
            return []
        },
    }
}
