import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {Button, Descriptions, Image} from "antd";
import axios from "axios";
import GetCookieData from "../../../GetCookieData";

const cookie = GetCookieData()
console.log(cookie)
export default function PaperInfo () {
    const location = useLocation()
    const {state} = location
    console.log(location,state)

    const navigate = useNavigate()
    function back() {
        navigate("/teacher/paper_list", {state: {exam_id: exam}})
    }

    const [exam,setExam] = useState(0)
    const [img,setImg] = useState('')
    useEffect(()=>{
        axios.post("https://xihui.luoxin.live/teacher/paper/get",{
            id: state.paper.id,
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            console.log(res.data.data)
            let d = res.data.data.paper
            console.log(d)
            setExam(d.exam_id)
            setImg(d.img_url)
        }).catch(error => console.log(error));
    },[])
    return (
        <div style={{
            marginTop:'60px',
           marginLeft: '250px',
            marginRight:'250px',
        }}>
            <label style={{
                alignContent:'center',
                overflow: 'hidden',
                marginLeft: '300px',
                color: 'rgba(0, 0, 0, 0.88)',
                fontWeight: '600',
                fontSize: '30px',
                lineHeight: '1.5',
            }}>试卷信息</label>
            <Descriptions title='📝' size='middle' bordered='true' labelStyle={{fontSize:'18px',textAlign:'center'}}>
                <Descriptions.Item label="试卷编号" span="2" >{state.paper.id}</Descriptions.Item>
                <Descriptions.Item label="考试编号" >{exam}</Descriptions.Item>
                <Descriptions.Item label="考试人姓名" span="2">{state.paper.examiner_name}</Descriptions.Item>
                <Descriptions.Item label="考试人学号" >{state.paper.examiner_id}</Descriptions.Item>
                <Descriptions.Item label="阅卷人姓名" span="2">{state.paper.reviewer_name}</Descriptions.Item>
                <Descriptions.Item label="阅卷人学号">{state.paper.reviewer_id}</Descriptions.Item>
                <Descriptions.Item label="试卷成绩" span="2">{state.paper.grade}</Descriptions.Item>
                <Descriptions.Item label="试卷图片">
                    <Image
                        width={50}
                        src={img}
                    />
                </Descriptions.Item>
            </Descriptions>
            <Button style={{marginLeft: '600px',marginTop: '30px'}} type="primary" onClick={back}>返回</Button>
        </div>
    )
}