import Repository from './Repository';
import cbor from 'cbor';

const baseUrl = 'https://be1.whatsva.id'

class WhatsappRepository {
    async createSession(params) {
        const data = new URLSearchParams(params).toString();
        // const data = JSON.stringify(params)
        const reponse = await Repository.post(
            `${baseUrl}/sessions/add`,
            data,
            {
                headers: {

                },
                contentType:"application/x-www-form-urlencoded",
                // responseType: "arraybuffer"
            }
        )
        .then((response) => {
            // const data = cbor.decode(response.data)
            return response.data;
        })
        .catch((error) => {
            // const result = cbor.decode(error.response.data)
            return error;
        });
        return reponse;
    }

    async findSession(params){
        // const dataId = new URLSearchParams(params.id).toString();
        const reponse = await Repository.get(
            `${baseUrl}/sessions/find/${params.id}`,
            {
                contentType:"application/json"
            }
        )
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error
        });
        return reponse;
    }
}

export default new WhatsappRepository();
