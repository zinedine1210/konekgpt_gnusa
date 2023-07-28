import Repository, { baseUrl } from './Repository';
import cbor from 'cbor';

class AuthRepository {
    async postLogin(params) {
        const reponse = await Repository.post(
            `${baseUrl}/auth/mlogin`,
            null,
            {
                headers:params,
                contentType:"application/cbor",
                responseType: "arraybuffer"
            }
        )
        .then((response) => {
            const data = cbor.decode(response.data)
            return data;
        })
        .catch((error) => {
            const result = cbor.decode(error.response.data)
            return result;
        });
        return reponse;
    }

    async postLogout(params) {
        const reponse = await Repository.post(
            `${baseUrl}/auth/logout`,
            null,
            {
                headers: params,
                responseType: "arraybuffer"
            }
        )
        .then((response) => {
            const data = cbor.decode(response.data)
            return data
        })
        .catch((error) => {
            console.log(error);
            let result = cbor.decode(error.response.data)
            return result;
        });
        return reponse;
    }

    async getStatus(params){
        const reponse = await Repository.get(
            `${baseUrl}/auth/status`,
            {
                headers: params,
                contentType:"application/cbor",
                responseType: "arraybuffer"
            }
        )
        .then((response) => {
            const data = cbor.decode(response.data)
            return data
        })
        .catch((error) => {
            console.log(error);
            let result = cbor.decode(error.response.data)
            return result;
        });
        return reponse;
    }
}

export default new AuthRepository();
