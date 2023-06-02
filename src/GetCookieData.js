import cookie from "react-cookies";
import {useNavigate} from "react-router";

export default function GetCookieData(){
    /*let cookieData = {
        token: "",
        info: "",
    }
    let cookies = document.cookie
    let cookieArr = cookies.split(';')
    for(let i = 0; i < cookieArr.length; i++) {
        let arr = cookieArr[i].split('=')
        if (" token" === arr[0] ) {
            cookieData.token = arr[1]
        }
        if ("info" === arr[0] ) {
            cookieData.info = JSON.parse(unescape(decodeURI(arr[1])))
        }
    }*/
    const cookieData = {
        token: cookie.load('token'),
        info: cookie.load('info'),
    }

    console.log(cookieData)

    return cookieData
}