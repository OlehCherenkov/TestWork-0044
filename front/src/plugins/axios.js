// axios
import axios from 'axios'
const apiURL = process.env.VUE_APP_API_URL
const authURL = process.env.VUE_APP_AUTH_URL
const apiKey = process.env.VUE_APP_API_KEY

function axiosIns(auth = false) {
    const baseURL = auth ? authURL : apiURL;
    let basicHeaders = {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Api-Key': apiKey,
    }
    const token = localStorage.getItem('token');
    if (token) {
        basicHeaders['Authorization'] = `Bearer ${token}`;
    }
    return axios.create({
        baseURL: baseURL,
        timeout: 10000,
        headers: basicHeaders,
    })
}
export default axiosIns
