import Repository, { baseUrl } from './Repository';
import cbor from 'cbor';

class KnowledgeRepository {
    async insertKnowledge(params) {
        const reponse = await Repository.post(
            `${baseUrl}/gpt-konek/knowledge`,
            params.data,
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
        const reponse = await Repository.delete(
            `${baseUrl}/gpt-konek/knowledge`,
            params.data,
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
        const reponse = await Repository.post(
            `${baseUrl}/gpt-konek/knowledge/simulation`,
            params.data,
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
