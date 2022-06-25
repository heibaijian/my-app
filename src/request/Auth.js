import {url} from "../utils"
import {CLIENTID,SECRET,FRONTHOST} from "../utils"
import axios from "axios";

export async function fetchGithubSSOAuth(codeString) {
    let data;
    await axios({
        method: "get",
        url: `http://127.0.0.1:8080/build/token?client_id=${CLIENTID}&client_secret=${SECRET}&code=${codeString}&redirect_uri=${FRONTHOST}/login`,
    }).then(res=>{
        data=res.data;
    })
    return data

}

