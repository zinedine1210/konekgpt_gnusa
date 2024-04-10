import Repository, { baseUrl } from './Repositorycopy';
import cbor from 'cbor';

class KnowledgeRepository {
    async insertKnowledge(params) {
        const data = cbor.encode(params.data)
        const reponse = await Repository.post(
            `${baseUrl}/gpt-konek/knowledge`,
            data,
            {
                headers: params.xa,
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

    // async insertKnowledgeUpload(params) {
    //     // const data = cbor.encode(params.data)
    //     // console.log(data);
    //     const reponse = await Repository.post(
    //         `${baseUrl}/gpt-konek/knowledge/upload`,
    //         params.data,
    //         {
    //             headers: params.xa,
    //             contentType:"application/json",
    //         }
    //     )
    //     .then((response) => {
    //         // const data = cbor.decode(response.data)
    //         // return data;
    //         return response.data
    //     })
    //     .catch((error) => {
    //         // const result = cbor.decode(error.response.data)
    //         // return result;
    //         return error.response.data
    //     });
    //     return reponse;
    // }

    async updateKnowledge(params) {
        const data = cbor.encode(params.data)
        const reponse = await Repository.put(
            `${baseUrl}/gpt-konek/knowledge/${params.id}`,
            data,
            {
                headers: params.xa,
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

    async deleteKnowledge(params) {
        const data = cbor.encode(params.data)
        const reponse = await Repository.delete(
            `${baseUrl}/gpt-konek/knowledge`,
            {
                data:data,
                headers: params.xa,
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

    async getAllKnowledge(params) {
        const reponse = await Repository.get(
            `${baseUrl}/gpt-konek/knowledge`,
            {
                headers: params,
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

    async getOneKnowledge(params) {
        const reponse = await Repository.get(
            `${baseUrl}/gpt-konek/knowledge/${params.id}`,
            {
                headers: params.xa,
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

    async simulationKnowledge(params) {
        const data = cbor.encode(params.data)
        const reponse = await Repository.post(
            `${baseUrl}/gpt-konek/knowledge/simulation`,
            data,
            {
                headers: params.xa,
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

    async getListFileKnowledge(params) {
        const reponse = await Repository.get(
            `${baseUrl}/gpt-konek/knowledge/list-files`,
            {
                headers: params,
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

    async getChatByKnowledge(params) {
        const reponse = await Repository.get(
            `${baseUrl}/gpt-konek/inbox/${params.id}`,
            {
                headers: params.xa,
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

    async selectKnowledgeForChannel(params) {
        const data = cbor.encode(params.data)
        const reponse = await Repository.post(
            `${baseUrl}/gpt-konek/channel/select-knowledge`,
            data,
            {
                headers: params.xa,
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
}

export default new KnowledgeRepository();
