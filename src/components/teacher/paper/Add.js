import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {Button, Form, Image, Input, Space, Table} from "antd";
import GetCookieData from "../../../GetCookieData";
import axios from "axios";
import Upload from "antd/es/upload/Upload";
import Modal from "antd/es/modal/Modal";
import {PlusOutlined} from "@ant-design/icons";
import {message} from "antd/lib";
import cookie from "react-cookies";
import {func} from "prop-types";


const cookieData = GetCookieData()
console.log(cookie)
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};

function Delete(value) {
    axios.post("https://xihui.luoxin.live/paper/del",{
        id: parseInt(value),
    },{
        headers: {
            "X-Session-Id": cookieData.token
        }
    }) .then(res =>{
        console.log(res.data.data)
        message.info("Success")
        window.location.reload()
    }).catch(error => console.log(error));
}

const columns = [
    {
        title: '试卷编号',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '考试人编号',
        dataIndex: 'examiner',
        key: 'examiner',
    },
    {
        title: '阅卷人编号',
        dataIndex: 'reviewer',
        key: 'reviewer',
    },
    {
        title: '成绩',
        dataIndex: 'grade',
        key: 'grade',
    },
    {
        title: '试卷图片',
        dataIndex: 'img',
        key: 'img',
        render: (text) => <Image
            width={50}
            src={text}
        />,
    },
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Space wrap>
                <Button type="link" onClick={()=>Delete(record.id)}>删除</Button>
            </Space>
        ),
    },
];


export default function Info () {
    const location = useLocation()
    const {state} = location
    console.log(location,state)


    const navigate = useNavigate()
    function back() {
        if (state != null) {
            navigate("/teacher/paper_list", {state: {exam_id: state.exam_id}})
        }else{
            navigate("/teacher/paper_list", {state: {exam_id: exam}})
        }
    }

    const [data,setData] = useState([])
    const onFinish = (values: any) => {
        console.log(values);
        axios.post("https://xihui.luoxin.live/paper/add",{
            exam_id: parseInt(state.exam_id),
            examiner_id: values.paper.examiner_id,
            reviewer_id: values.paper.reviewer_id,
            grade: parseInt(parseFloat(values.paper.grade)*100),
            img_url: path,
        },{
            headers: {
                "X-Session-Id": cookieData.token
            }
        }) .then(res =>{
            console.log(res.data.data)
            if (res.data.code !== -1) {
                window.location.replace("http://localhost:3000/teacher/paper_add?" + "pid=" + res.data.data.paper.id)
            }else{
                alert(res.data.msg)
            }
        }).catch(error => console.log(error));

    };

    const url = location.search;
    const [exam,setExam] = useState(0)
    useEffect(()=>{
        let pid = 0
        if (url.indexOf("?") != -1) {
            let str = url.substr(1);
            if (str.split("=")[0] === 'pid') {
                pid = parseInt(str.split("=")[1])
            }
        }
        console.log(pid)
        axios.post("https://xihui.luoxin.live/teacher/paper/get",{
            id: pid,
        },{
            headers: {
                "X-Session-Id": cookieData.token
            }
        }) .then(res =>{
            console.log(res.data.data)
            let da = []
            if (res.data.code !== -1) {
                alert("Success!")
                da.push({
                    key: '1',
                    id: res.data.data.paper.id,
                    examiner: res.data.data.paper.examiner_id,
                    reviewer: res.data.data.paper.reviewer_id,
                    grade: parseFloat(res.data.data.paper.grade/100),
                    img: res.data.data.paper.img_url,
                })
            }else{
                alert(res.data.msg)
            }
            setData(da)
            setExam(res.data.data.paper.exam_id)
        }).catch(error => console.log(error));

    },[])

    const [path,setPath] = useState('')
    function uploadImg () {
        const reader = new FileReader()
        const pic = document.getElementById("pic")
        console.log(pic.files[0])
        reader.readAsDataURL(pic.files[0])
        reader.onload=(e)=>{
            console.log(e)
            console.log(e.target.result.split(',')[1])
            axios.post("https://xihui.luoxin.live/resource/put",{
                body: e.target.result.split(',')[1],
            },{
                headers: {
                    "X-Session-Id": cookieData.token
                }
            }) .then(res =>{
                console.log(res.data)
                setPath("//xihui.luoxin.live"+res.data.data.path)
                console.log(path)
            }).catch(error => console.log(error));
        }
    }
    function showModel() {
        setPreviewOpen(true);
        setPreviewImage(path);
    }
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const handleCancel = () => setPreviewOpen(false);

    return (
        <div>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
            >
                <Form.Item name={['paper', 'examiner_id']} rules={[{ required: true, message: '请输入考试人编号!' }]} label="考试人编号">
                    <Input id='examiner_id' />
                </Form.Item>
                <Form.Item name={['paper', 'reviewer_id']} rules={[{ required: true,message: '请输入阅卷人编号!' }]} label="阅卷人编号">
                    <Input id='reviewer_id' />
                </Form.Item>
                <Form.Item name={['paper', 'grade']} rules={[{ required: true, message: '请输入成绩!' }]} label="成绩">
                    <Input id='grade' />
                </Form.Item>
                <Form.Item name={['paper', 'img']} label="图片">
                    <Button onClick={()=>{document.getElementById('pic').click()}}>浏览</Button>
                    <Button style={{marginLeft: '8px'}} onClick={uploadImg}>点击上传</Button>
                    <Button style={{marginLeft: '8px'}} onClick={showModel}>查看已上传的试卷图片</Button>
                    <Input type="file" id="pic" style={{opacity: 0,width: '0px',height: '0px'}} />
                    <Modal open={previewOpen} title="试卷图片" footer={null} onCancel={handleCancel}>
                        <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button style={{
                        marginRight:'20px',
                    }} type="primary" htmlType="submit">
                        提交
                    </Button>
                    <Button type="primary" onClick={back}>返回</Button>
                </Form.Item>
            </Form>
            <h1>上一条提交的试卷信息：</h1>
            <Table style={{
                marginLeft: '30px',
                marginTop: '20px',
            }} pagination={false} columns={columns} dataSource={data} />
        </div>
    )
}