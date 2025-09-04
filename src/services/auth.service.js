import axios from 'axios'

class AuthService {
    constructor() {
        this.url = import.meta.env.VITE_API_URL
    }

    async login(reqData) {
        const response = await axios.post(this.url + '/user/login', reqData)
        if (response?.data.status) {
            const resData = response.data.data
            localStorage.setItem('user', JSON.stringify(resData))
            return response.data
        } else {
            return response.data
        }
    }

    async loginWithGoogle(reqData) {
        const response = await axios.post(this.url + '/oauth2/verify-token', reqData)
        if (response?.data.status) {
            const resData = response.data.data
            localStorage.setItem('user', JSON.stringify(resData))
            return response.data
        } else {
            return response.data
        }
    }

    changePassword(payload) {
        const response = axios.post(this.url + '/user/change-password', payload)
        return response
    }

    getLinkedinAuthUrl(company) {
        const response = (this.url + '/oauth2/authorization/linkedin?isCompany='+ company )
        return response
    }

    async loginWithLinkedIn(reqData) {
        const response = await axios.post(this.url + '/oauth2/auth/linkedin/verify', reqData)
        if (response?.data.status) {
            const resData = response.data.data
            localStorage.setItem('user', JSON.stringify(resData))
            return response.data
        } else {
            return response.data
        }
    }

    async signup(data) {
        const response = await axios.post(this.url + '/user/register', data)
        if (response?.data.status) {
            return response.data
        } else {
            return response.data
        }
    }

    async logout() {
        localStorage.removeItem('userProfile')
        localStorage.removeItem('user')
        localStorage.removeItem('userType')

        // localStorage.clear()
        sessionStorage.clear()
        // router.push('/')
        // window.location.reload()
        window.location.href = '/';

    }

    forgotPassword(data) {
        const response = axios.get(this.url + '/user/forget-password/'+ data.email)
        return response
    }

    resendVerificationCode(email) {
        const response = axios.get(this.url + '/user/resend-otp/' + email)
        return response
    }

    checkOtpVerification(data,email) {
        const response = axios.get(this.url + '/user/check-otp/' + email + '/' + data)
        return response
    }

    getMenus() {
        const response = axios.get(this.url + '/user/menu/getMenus')
        return response
    }
    assignRoleMenu(accessControlData){
        const response = axios.post(this.url + '/user/menu/assignRoleMenu',accessControlData)
        return response
    }

    getRoleWiseMenu(roleId){
        const response = axios.get(this.url + '/user/menu/role-menu-list?roleId='+roleId)
        return response
    }
}

export default new AuthService()
