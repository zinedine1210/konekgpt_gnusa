import Repository, { baseUrl } from './Repository';
import cbor from 'cbor';

class UploadFileRepository {
    async uploadFile(params) {
        const reponse = await Repository.post(
            `${baseUrl}/dms/rdb/uploadfile`,
            params.data,
            {
                headers: params.xa
            }
        )
        .then((response) => {
            // const data = cbor.decode(response.data)
            return response.data;
        })
        .catch((error) => {
            // const result = cbor.decode(error.response.data)
            return error.response.data;
        });
        return reponse;
    }

    async setMetadata(params) {
        const data = cbor.encode(params.data)
        const reponse = await Repository.put(
            `${baseUrl}/dms/rdb/setmetadata/${params.uuid}`,
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

    async mappingMetadata(params) {
        const reponse = await Repository.get(
            `${baseUrl}/dms/mapping/knowledgeImg`,
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
}

export default new UploadFileRepository();
