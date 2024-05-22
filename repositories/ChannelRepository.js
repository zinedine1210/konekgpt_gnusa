import Swal from 'sweetalert2';
import Repository, { baseUrl } from './Repositorycopy';
import cbor from 'cbor';

class ChannelRepository {
    async insertChannel(params) {
        const data = cbor.encode(params.data)
        const reponse = await Repository.post(
            `${baseUrl}/gpt-konek/channel`,
            data,
            {
                headers: params.xa,
                contentType:"application/cbor",
                responseType: "arraybuffer"
            }
        )
        .then((response) => {
            const data = cbor.decode(response.data)
            if(data.status == -1 && data.message == "Token Expired"){
                localStorage.removeItem("XA")
                Swal.fire({
                    icon: "info",
                    title: "Your token expired",
                    text: "Please relog, you will redirect to login page",
                    position: "top-right",
                    timer: 3000
                })
                window.location.reload()
            }
            return data;
        })
        .catch((error) => {
            const result = cbor.decode(error.response.data)
            return result;
        });
        return reponse;
    }

    async updateChannel(params) {
        const data = cbor.encode(params.data)
        const reponse = await Repository.put(
            `${baseUrl}/gpt-konek/channel/${params.id}`,
            data,
            {
                headers: params.xa,
                contentType:"application/cbor",
                responseType: "arraybuffer"
            }
        )
        .then((response) => {
            const data = cbor.decode(response.data)
            if(data.status == -1 && data.message == "Token Expired"){
                localStorage.removeItem("XA")
                Swal.fire({
                    icon: "info",
                    title: "Your token expired",
                    text: "Please relog, you will redirect to login page",
                    position: "top-right",
                    timer: 3000
                })
                window.location.reload()
            }
            return data;
        })
        .catch((error) => {
            const result = cbor.decode(error.response.data)
            return result;
        });
        return reponse;
    }

    async deleteChannel(params) {
        const data = cbor.encode(params.data)
        const reponse = await Repository.delete(
            `${baseUrl}/gpt-konek/channel`,
            {
                data:data,
                headers:params.xa,
                contentType:"application/cbor",
                responseType: "arraybuffer"
            }
        )
        .then((response) => {
            const data = cbor.decode(response.data)
            if(data.status == -1 && data.message == "Token Expired"){
                localStorage.removeItem("XA")
                Swal.fire({
                    icon: "info",
                    title: "Your token expired",
                    text: "Please relog, you will redirect to login page",
                    position: "top-right",
                    timer: 3000
                })
                window.location.reload()
            }
            return data;
        })
        .catch((error) => {
            const result = cbor.decode(error.response.data)
            return result;
        });
        return reponse;
    }

    async getAllChannel(params) {
        const reponse = await Repository.get(
            `${baseUrl}/gpt-konek/channel`,
            {
                headers: params,
                contentType:"application/cbor",
                responseType: "arraybuffer"
            }
        )
        .then((response) => {
            const data = cbor.decode(response.data)
            if(data.status == -1 && data.message == "Token Expired"){
                localStorage.removeItem("XA")
                Swal.fire({
                    icon: "info",
                    title: "Your token expired",
                    text: "Please relog, you will redirect to login page",
                    position: "top-right",
                    timer: 3000
                })
                window.location.reload()
            }
            return data;
        })
        .catch((error) => {
            console.log(error.response)
            const result = cbor.decode(error.response.data)
            return result;
        });
        return reponse;
    }

    async getOneChannel(params) {
        const reponse = await Repository.get(
            `${baseUrl}/gpt-konek/channel/${params.id}`,
            {
                headers: params.xa,
                contentType:"application/cbor",
                responseType: "arraybuffer"
            }
        )
        .then((response) => {
            const data = cbor.decode(response.data)
            if(data.status == -1 && data.message == "Token Expired"){
                localStorage.removeItem("XA")
                Swal.fire({
                    icon: "info",
                    title: "Your token expired",
                    text: "Please relog, you will redirect to login page",
                    position: "top-right",
                    timer: 3000
                })
                window.location.reload()
            }
            return data;
        })
        .catch((error) => {
            const result = cbor.decode(error.response.data)
            return result;
        });
        return reponse;
    }
}

export default new ChannelRepository();
