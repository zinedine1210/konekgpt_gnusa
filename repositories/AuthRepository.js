import axios from 'axios';
import cbor from 'cbor';
import { baseUrl, customHeaders } from './Repository';

class AuthRepository {
    constructor() {
        this.axiosInstance = axios.create({
            baseUrl,
            headers: customHeaders
        });
    }
    // async postRegister(params) {
    //     const data = cbor.encode(params)
    //     const reponse = await this.axiosInstance.post(
    //         `${baseUrl}/auth/register`,
    //         data
    //     )
    //     .then((response) => {
    //         // console.log(cbor.decode(reponse.data));
    //         const data = cbor.decode(response.data)
    //         return data;
    //     })
    //     .catch((error) => {
    //         return error;
    //     });
    //     return reponse;
    // }

    async postLogin(params, abortSignal) {
        return await this.axiosInstance.post(
            `${baseUrl}/auth/login`,
            null,
            {
                headers: params,
                responseType: "arraybuffer",
                signal: abortSignal
            }
        )
        .then((response) => {
            const data = cbor.decode(response.data)
            return data;
        })
        .catch((error) => {
            if(error.hasOwnProperty("code") && error.code == "ERR_CANCELED"){
                return {"status": -1, "data": "Timeout" }
            }
            let result = cbor.decode(error.response.data)
            return result;
        });
    }

    async postLogout(params) {
        const reponse = await this.axiosInstance.post(
            `${baseUrl}/auth/logout`,
            null,
            {
                headers: params,
                responseType: "arraybuffer"
            }
        )
        .then((response) => {
            console.log('success logout')
            const res = cbor.decode(response.data)
            return res
        })
        .catch((error) => {
            let result = cbor.decode(error.response.data)
            return result;
        });
        return reponse;
    }

    async getStatus(params, abortSignal) {
        const reponse = await this.axiosInstance.get(
            `${baseUrl}/auth/status`,
            { 
                headers: params, 
                responseType: "arraybuffer",
                signal: abortSignal
            }
        )
        .then((response) => {
            let result = cbor.decode(response.data)
            return result;
        })
        .catch((error) => {
            console.log(error)
            console.log("atas error aborted")
            if(error.hasOwnProperty("code") && error.code == "ERR_CANCELED"){
                return {"status": -1, "data": "Timeout" }
            }
            let result = cbor.decode(error.response.data)
            return result;
        });
        return reponse;
    }
}

export default new AuthRepository();
