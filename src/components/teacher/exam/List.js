import React, {useEffect, useState} from "react";
import {Alert, Button, Checkbox, message, Pagination, Space, Table} from 'antd';
import {Input} from 'antd';
import axios from "axios";
import './List.css'
import GetCookieData from "../../../GetCookieData";
import {useNavigate} from "react-router";
import Modal from "antd/es/modal/Modal";
import {PaginationProps} from "antd";

const cookie = GetCookieData()
console.log(cookie)

const columns = [
    {
        title: '考试编号',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '创建时间',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Space wrap>
                <Button style={{marginLeft:'30px'}} type="link" onClick={()=>Detail(record.id)}>详情</Button>
                <Button style={{marginLeft:'30px'}} type="link" onClick={()=>Edit(record)}>编辑</Button>
                <Button style={{marginLeft:'30px'}} type="primary" onClick={()=>Delete(record.id)}>删除</Button>
            </Space>
        ),
    },
]


let Detail = ''
let Edit = ''

function  Delete(value) {
    axios.post("https://xihui.luoxin.live/exam/del",{
        id: value,
    },{
        headers: {
            "X-Session-Id": cookie.token
        }
    }) .then(res =>{
        if (res.data.code !== -1){
            message.info(`成功`);
            window.location.reload();
        }else{
            alert(res.data.msg)
        }

    }).catch(error => console.log(error));
}

export default function List () {
    const navigate = useNavigate()
    Detail = (value)=>{
        alert(value)
        console.log(value)
        navigate("/teacher/paper_list",{state:{exam_id: value}})
    }

    Edit = (value)=>{
        alert(value)
        console.log(value)
        navigate("/teacher/exam_info",{state:{exam: value}})
    }

    const [total,setTotal] = useState(0)
    const [data,setData] = useState([])
    useEffect(()=>{
        axios.post("https://xihui.luoxin.live/exam/list",{
            options: {
                options: [],
                offset: 0,
                limit: 6,
                show_total: true,
            }
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            let da = []
            for(let i = 0; i < res.data.data.exams.length; i++){
                let d = res.data.data.exams[i]
                let time =  new Date(d.created_at *1000).toLocaleString()
                console.log(time)
                setTotal(res.data.data.page.total)
                da.push({
                    key: ''+(i+1)+'',
                    id: d.id,
                    name: d.name,
                    time: time,
                })
                console.log(da)
            }
            setData(da)
        }).catch(error => console.log(error));
    },[])

    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        console.log('Page: ', pageNumber);
        //let name = document.getElementById("name").value
        let options = []
        /*if (name != null) {
            options.push({
                key: 2,
                val: name,
            })
        }*/
        axios.post("https://xihui.luoxin.live/exam/list",{
            options: {
                options: options,
                offset: 6*(pageNumber-1),
                limit: 6,
                show_total: true,
            }
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            let da = []
            for(let i = 0; i < res.data.data.exams.length; i++){
                let d = res.data.data.exams[i]
                let time =  new Date(d.created_at *1000).toLocaleDateString()
                setTotal(res.data.data.page.total)
                da.push({
                    key: ''+(i+1)+'',
                    id: d.id,
                    name: d.name,
                    time: time,
                })
                console.log(da)
            }
            setData(da)
        }).catch(error => console.log(error));
    };

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        let exam = document.getElementById("exam").value
        console.log(exam)

        axios.post("https://xihui.luoxin.live/exam/add",{
            exam: {
                name: exam,
            }
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
                window.location.reload()
            }else{
                alert(res.data.msg)
            }

        }).catch(error => console.log(error));
    };
    const handleCancel = () => {
        setOpen(false);
    };


    const onResult = () => {
        let name = document.getElementById("name").value
        let options = []
        if (name != null) {
            options.push({
                key: 2,
                val: name,
            })
        }
        axios.post("https://xihui.luoxin.live/exam/list",{
            options: {
                options: options,
                offset: 0,
                limit: 6,
                show_total: true,
            }
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            let da = []
            for(let i = 0; i < res.data.data.exams.length; i++){
                let d = res.data.data.exams[i]
                let time =  new Date(d.created_at *1000).toLocaleDateString()
                setTotal(res.data.data.page.total)
                da.push({
                    key: ''+(i+1)+'',
                    id: d.id,
                    name: d.name,
                    time: time,
                })
                console.log(da)
            }
            setData(da)
        }).catch(error => console.log(error));

    }
    return (
        <div>
            <div style={{
                marginLeft: '30px',
            }}>
                <Button type="primary" onClick={showModal}>
                    添加
                </Button>
                <Modal
                    title="新增考试信息"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <label>名称:</label>
                    <Input id="exam"/>
                </Modal>
                <Input style={{width:'220px',marginRight:'20px',marginLeft:'540px',}} id='name' placeholder="根据考试名称查询"/>
                <Button type='primary' onClick={onResult}>查询</Button>
            </div>
            <Table style={{
                marginLeft: '30px',
                marginTop: '20px',
            }} pagination={false} columns={columns} dataSource={data} />
            <div style={{
                marginLeft: '800px',
                marginTop: '30px',
            }}>
                <Pagination
                    total={total}
                    defaultCurrent={1}
                    onChange={onChange}
                    defaultPageSize={6}
                    showTotal={(total) => `共 ${total} 条`}
                />
            </div>

        </div>
    )
}