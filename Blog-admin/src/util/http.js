import axios from 'axios'
axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
export default axios