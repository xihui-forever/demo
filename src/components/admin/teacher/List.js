import {Button, Form, Input, message, Pagination, PaginationProps, Space, Table} from 'antd';
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import axios from "axios";
import GetCookieData from "../../../GetCookieData";
import { Checkbox } from 'antd';


const cookie = GetCookieData()
console.log(cookie)

function Delete(value) {
    axios.post("https://xihui.luoxin.live/admin/teacher/del",{
        id: parseInt(value),
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

const columns = [
    {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '工号',
        dataIndex: 'teacher_id',
        key: 'teacher_id',
        render: (text) => <p>{text}</p>,
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Space wrap>
                <Button type="link" onClick={()=>Reset(record.teacher_id)}>重置密码</Button>
                <Button type="link" onClick={()=>Detail(record)}>详情</Button>
                <Button type="link" onClick={()=>Delete(record.id)}>删除</Button>
            </Space>
        ),
    },
];

let Reset = ''
let Detail = ''

export default function List () {
    const navigate = useNavigate()
    Detail = (value)=>{
        alert(value)
        console.log(value)
        navigate("/admin/teacher_info",{state:{teacher: value}})
    }

    const [total,setTotal] = useState(0)
    const [data,setData] = useState([])
    useEffect(()=>{
        axios.post("https://xihui.luoxin.live/admin/teacher/list",{
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
            for(let i = 0; i < res.data.data.teachers.length; i++){
                let d = res.data.data.teachers[i]
                setTotal(res.data.data.page.total)
                da.push({
                    key: ''+(i+1)+'',
                    id: d.id,
                    teacher_id: d.teacher_id,
                    name: d.name,
                    email: d.email,
                })
                console.log(da)
            }
            setData(da)
        }).catch(error => console.log(error));
    },[])
    console.log(data);

    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        console.log('Page: ', pageNumber);
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
        axios.post("https://xihui.luoxin.live/admin/teacher/list",{
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
            for(let i = 0; i < res.data.data.teachers.length; i++){
                let d = res.data.data.teachers[i]
                setTotal(res.data.data.page.total)
                da.push({
                    key: ''+(i+1)+'',
                    id: d.id,
                    teacher_id: d.teacher_id,
                    name: d.name,
                    email: d.email,
                })
                console.log(da)
            }
            setData(da)
        }).catch(error => console.log(error));
    };

    const AddPaper= () => {
        navigate("/admin/teacher_add")
    }

    function onImport() {
        const reader = new FileReader()
        const pic = document.getElementById("pic")
        console.log(pic.files[0])
        reader.readAsDataURL(pic.files[0])
        reader.onload=(e)=>{
            console.log(e)
            console.log(e.target.result.split(',')[1])
            axios.post("https://xihui.luoxin.live/admin/teacher/batch_import",{
                file_body: e.target.result.split(',')[1],
            },{
                headers: {
                    "X-Session-Id": cookie.token
                }
            }) .then(res =>{
                console.log(res.data)
                message.info("成功添加"+parseInt(res.data.data.count)+"名教师")
            }).catch(error => console.log(error));
        }
    }

    const options = [
        {
            label: '工号',
            value: 1,
        },
        {
            label: '姓名',
            value: 2,
        },
        {
            label: '邮箱',
            value: 3,
        },
    ];
    const [cond,setCond] = useState([])
    const onSelect = (checkedValues) => {
        console.log('checked = ', checkedValues);
        setCond(checkedValues)
    };
    const onResult = () => {
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
        axios.post("https://xihui.luoxin.live/admin/teacher/list",{
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
            for(let i = 0; i < res.data.data.teachers.length; i++){
                let d = res.data.data.teachers[i]
                setTotal(res.data.data.page.total)
                da.push({
                    key: ''+(i+1)+'',
                    id: d.id,
                    teacher_id: d.teacher_id,
                    name: d.name,
                    email: d.email,
                })
                console.log(da)
            }
            setData(da)
        }).catch(error => console.log(error));

    }


    Reset = (value) => {
        axios.post("https://xihui.luoxin.live/reset/password",{
            role_type: 2,
            username: value,


        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            console.log(2)
            if (res.data.code !== -1){
                console.log(res.data.data)
                message.info(`成功`);
                window.location.reload()
            }else{
                alert(res.data.msg)
            }

        }).catch(error => console.log(error));
    };
    /*const [psw,setPsw] = useState("")
    function genPsd() {
        const str = '0123456789abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 25; i > 0; i--)
            result += str[Math.floor(Math.random() * str.length)];
        console.log(result)
        setPsw(result)
    }*/

    return (
        <div>
            {/*<Modal
                title="新密码"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Input style={{
                    width:'320px',
                    marginRight:'10px',
                }} id="password" value={psw}/>
                <Button type="primary" onClick={genPsd}>生成</Button>
            </Modal>*/}
            <Button style={{marginLeft:'30px'}} onClick={()=>{document.getElementById('pic').click()}}>浏览</Button>
            <Input type="file" id="pic" style={{opacity: 0,width: '0px',height: '0px'}} />
            <Button style={{marginLeft:'5px'}} type='primary' onClick={onImport}>导入</Button>
            <Button style={{marginLeft:'15px'}} type='primary' onClick={AddPaper}>添加</Button>
            <Checkbox.Group style={{marginLeft:'200px',marginRight:'20px',marginBottom:'20px'}} options={options} defaultValue={['Id']} onChange={onSelect} />
            <Input style={{width:'120px',marginRight:'20px'}} id='id' placeholder="根据工号查询"/>
            <Input style={{width:'120px',marginRight:'20px'}} id='name' placeholder="根据姓名查询"/>
            <Input style={{width:'180px',marginRight:'20px'}} id='email' placeholder="根据邮箱查询"/>
            <Button type='primary' onClick={onResult}>查询</Button>
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