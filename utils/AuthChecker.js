import AuthRepository from "@/repositories/AuthRepository";



export async function AuthChecker() {
  const maxRetries = 10;
  const timoutInterval = 60000;
  
  for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
    let abortSignal = AbortSignal.timeout(timoutInterval)
    try {
      const getToken = localStorage.getItem("XA");
      const dataToken = JSON.parse(getToken);
      let timeoutId;
      const requestPromise = AuthRepository.getStatus({ "XA": dataToken, param: "user" }, abortSignal);
      const timeoutPromise = new Promise((resolve, reject) => {
        timeoutId = setTimeout(() => {
          reject({ "status": -1, "data": "Timeout" });
        }, timoutInterval);
      });

      const responseData = await Promise.race([requestPromise, timeoutPromise]);
      clearTimeout(timeoutId);
      if (responseData.status === -1 && responseData.data === "Timeout") {
        throw new Error("Timeout");
      } else {
        return responseData;
      }
    } catch (error) {
      if (retryCount < maxRetries - 1) {
        // wait before try again
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  // Jika semua upaya retry gagal
  return { "status": -1, "data": "All retry attempts failed" };
}
