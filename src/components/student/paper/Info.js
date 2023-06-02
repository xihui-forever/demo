import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {Button, Descriptions, Image, Input, message} from "antd";
import axios from "axios";
import GetCookieData from "../../../GetCookieData";
import Modal from "antd/es/modal/Modal";

const cookie = GetCookieData()
console.log(cookie)

export default function PaperInfo () {
    const location = useLocation()
    const {state} = location
    console.log(location,state)

    const navigate = useNavigate()
    function AddAppeal() {
        alert("appeal")
        navigate("/student/appeal_add")
    }

    const [img,setImg] = useState('')
    useEffect(()=>{
        axios.post("https://xihui.luoxin.live/examiner/paper/get",{
            id: state.paper.id,
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            console.log(res.data.data)
            let d = res.data.data.paper
            console.log(d)
            setImg(d.img_url)
        }).catch(error => console.log(error));
    },[])

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        let info = document.getElementById("info").value
        console.log(info)

        axios.post("https://xihui.luoxin.live/appeal/add",{
            paper_id: state.paper.id,
            appeal_info: info,
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            console.log(2)
            if (res.data.code !== -1){
                console.log(res.data.data)
                setConfirmLoading(true);
                setTimeout(() => {
                    message.info(`成功`);
                    setOpen(false);
                    setConfirmLoading(false);
                }, 2000);
                navigate("/student/appeal_list")
            }else{
                alert(res.data.msg)
            }

        }).catch(error => console.log(error));
    };
    const handleCancel = () => {
        setOpen(false);
    };

    function back() {
        navigate("/student/paper_list")
    }
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
                <Descriptions.Item label="试卷编号" span="3">{state.paper.id}</Descriptions.Item>
                <Descriptions.Item label="考试名称" span="3">{state.paper.exam}</Descriptions.Item>
                <Descriptions.Item label="学号" span="3">{cookie.info.student_id}</Descriptions.Item>
                <Descriptions.Item label="姓名" span="3">{cookie.info.name}</Descriptions.Item>
                <Descriptions.Item label="试卷成绩" span="3">{state.paper.grade}</Descriptions.Item>
                <Descriptions.Item label="试卷图片" span="3">
                    <Image
                        width={50}
                        src={img}
                    />
                </Descriptions.Item>
            </Descriptions>
            <Button style={{marginLeft: '400px',marginTop: '30px'}} onClick={showModal} type='primary'>提出申诉</Button>
            <Modal
                title="申诉理由"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Input id="info"/>
            </Modal>
            <Button style={{marginLeft: '20px',marginTop: '30px'}} type="primary" onClick={back}>返回</Button>
        </div>
    )
}