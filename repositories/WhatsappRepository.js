import Repository, { baseWhatsappUrl } from './Repository';
import cbor from 'cbor';

class WhatsappRepository {
    async createSession(params) {
        const data = new URLSearchParams(params).toString();
        // const data = JSON.stringify(params)
        const reponse = await Repository.post(
            `${baseWhatsappUrl}/sessions/add`,
            data,
            {
                // headers: {

                // },
                contentType:"application/json"
                // contentType:"application/x-www-form-urlencoded",
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
            `${baseWhatsappUrl}/sessions/find/${params.id}`,
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

    async statusSession(params){
        // const dataId = new URLSearchParams(params.id).toString();
        const reponse = await Repository.get(
            `${baseWhatsappUrl}/sessions/status/${params.id}`,
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

    async deleteSession(params){
        // const dataId = new URLSearchParams(params.id).toString();
        const reponse = await Repository.delete(
            `${baseWhatsappUrl}/sessions/delete/${params.id}`,
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

    async getChatList(params){
        const reponse = await Repository.get(
            `${baseWhatsappUrl}/chats?id=${params.id}`,
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

    async getDetailChat(params){
        const reponse = await Repository.get(
            `${baseWhatsappUrl}/chats/${params.receiverId}?id=${params.id}&limit=${params.limit}&cursor_id=&cursor_fromMe=true`,
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

    // MESSAGE
    async sendMessage(params) {
        const data = new URLSearchParams(params.data).toString();
        // const data = JSON.stringify(params.data)
        const reponse = await Repository.post(
            `${baseWhatsappUrl}/chats/sendMessageText?id=${params.id}`,
            data,
            {
                contentType:"application/json"
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

    async sendImage(params) {
        const data = new URLSearchParams(params.data).toString();
        // const data = JSON.stringify(params.data)
        const reponse = await Repository.post(
            `${baseWhatsappUrl}/chats/sendimageURL?id=${params.id}`,
            data,
            {
                contentType:"application/json"
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

    async sendVideo(params) {
        const data = new URLSearchParams(params.data).toString();
        // const data = JSON.stringify(params.data)
        const reponse = await Repository.post(
            `${baseWhatsappUrl}/chats/sendVideoUrl?id=${params.id}`,
            data,
            {
                contentType:"application/json"
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

    async sendDocument(params) {
        const data = new URLSearchParams(params.data).toString();
        // const data = JSON.stringify(params.data)
        const reponse = await Repository.post(
            `${baseWhatsappUrl}/chats/sendDocumentUrl?id=${params.id}`,
            data,
            {
                contentType:"application/json"
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

    async sendContact(params) {
        const data = new URLSearchParams(params.data).toString();
        // const data = JSON.stringify(params.data)
        const reponse = await Repository.post(
            `${baseWhatsappUrl}/chats/sendVCard?id=${params.id}`,
            data,
            {
                contentType:"application/json"
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

    async checkNumber(params) {
        const data = new URLSearchParams(params.data).toString();
        // const data = JSON.stringify(params.data)
        const reponse = await Repository.post(
            `${baseWhatsappUrl}/chats/checkNumber?id=${params.id}`,
            data,
            {
                contentType:"application/json"
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

    async getGroupList(params){
        const reponse = await Repository.get(
            `${baseWhatsappUrl}/groups?id=${params.id}`,
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
