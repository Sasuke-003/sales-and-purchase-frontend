import axios from "axios";
import { api } from "./api";
import { Logger } from "./logger";

const log = new Logger();

axios.defaults.baseURL = "http://localhost:9999";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] = "";

axios.interceptors.request.use(
    async (req) => {
        log.request(req);
        return req;
    },
    (err) => {
        console.warn("Something went wrong in Req-Interceptor");
        console.log(err);
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    (res) => {
        log.response(res);
        return res?.data?.data;
    },

    async (err) => {
        const failedReq = err.config;

        log.response(err);
        const code = err?.response?.data?.code;

        // If Server isn't running code will be undefined
        if (code === undefined) {
            console.warn("FAILED:  Cannot reach the server or invalid URL");
            return Promise.reject(err?.response?.data);
        } else
            switch (code) {
                case 2: // code(2) -> Token Invalid
                case 9: // code(9) -> Refresh Token Expired
                    // Force Sign Out
                    return api.user.signOut();

                case 11: // code(11) -> Access Token Not Found
                    // Since this happens only once while reloading the page, a request to obtain new refTok is made.
                    await api.token.newRefreshToken();
                // falls through after successfully obtaining the new token, ( obtains only if timed out -> present in localStorage as "nextRefreshTime" )

                case 8: // code(8) -> Access Token Expired - Get new Access Token And Retry "failedReq" ( happens automatically )
                    return await api.token.newAccessToken(failedReq);

                default:
                    if (err?.response?.data?.info) alert(err.response.data.info);
            }
        return Promise.reject(err);
    }
);
