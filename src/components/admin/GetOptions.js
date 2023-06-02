import {useState} from "react";

const GetOptions = (checkedValues)=>{
    const [cond,setCond] = useState([])
    setCond(checkedValues)
    let id = ''
    let name = ''
    let email = ''
    let options = []
    cond.map((element)=>{
        if (element === 1){
            id = document.getElementById("id").value
            options.push({
                key: 1,
                val: id,
            })
        }
        if (element === 2){
            name = document.getElementById("name").value
            options.push({
                key: 2,
                val: name,
            })
        }
        if (element === 3){
            email = document.getElementById("email").value
            options.push({
                key: 3,
                val: email,
            })
        }
    })
    return options
}
export  default  GetOptions;