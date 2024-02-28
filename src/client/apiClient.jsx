import AuthRepository from "@/repositories/AuthRepository";

export async function tryLogin(payload){
    try {
        let timeoutId;
        const timoutInterval = 60000;
        let abortSignal = AbortSignal.timeout(timoutInterval)
        const requestPromise = AuthRepository.postLogin({ "uspw": JSON.stringify(payload) })
        console.log(requestPromise);
        const timeoutPromise = new Promise((resolve, reject) => {
        timeoutId = setTimeout(() => {
            reject({ "status": -1, "data": "Timeout" });
        }, timoutInterval);
        });
        const responseData = await Promise.race([requestPromise, timeoutPromise]);

        clearTimeout(timeoutId);
        if (responseData.status === -1 && responseData.data === "Timeout") {
        throw new Error("Timeout");
        }
        
        if (responseData?.token) {
            return {
                success: true,
                msg: "Success Login",
                data: responseData
            }
        } else {
            return {
                success: false,
                msg: "Account not found"
            }
        }
    } catch (error) {
        console.log(error)
        console.log("atas error retry")
        await new Promise(resolve => setTimeout(resolve, 5000));
        return tryLogin(payload)
    }
}