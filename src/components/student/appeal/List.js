import {Button, Checkbox, Input, message, Pagination, PaginationProps, Space, Table, Tabs} from 'antd';
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import axios from "axios";
import GetCookieData from "../../../GetCookieData";

const cookie = GetCookieData()
console.log(cookie)

function Delete(value) {
        axios.post("https://xihui.luoxin.live/appeal/recall",{
            appeal_id: parseInt(value),
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            console.log(res.data)
            if (res.data.code >= 10007 && res.data.code <= 10010) {
                message.info(res.data.msg)
            }else{
                message.info("撤销成功")
            }
        }).catch(error => console.log(error));

}

const columnsOne = [
    {
        title: '申诉编号',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '试卷编号',
        dataIndex: 'paper_id',
        key: 'paper_id',
    },
    {
        title: '创建时间',
        dataIndex: 'create_at',
        key: 'create_at',
    },
    {
        title: '更新时间',
        dataIndex: 'update_at',
        key: 'update_at',
    },
    {
        title: '申诉状态',
        dataIndex: 'state',
        key: 'state',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space wrap>
                <Button type="link" onClick={()=>Detail(record)}>详情</Button>
                <Button type="link" onClick={()=>Delete(record.id)}>删除</Button>
            </Space>
        ),
    },
];
const columnsTwo = [
    {
        title: '申诉编号',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '试卷编号',
        dataIndex: 'paper_id',
        key: 'paper_id',
    },
    {
        title: '创建时间',
        dataIndex: 'create_at',
        key: 'create_at',
    },
    {
        title: '更新时间',
        dataIndex: 'update_at',
        key: 'update_at',
    },
    {
        title: '申诉状态',
        dataIndex: 'state',
        key: 'state',
    },
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Space wrap>
                <Button type="link" onClick={()=>Detail(record)}>详情</Button>
            </Space>
        ),
    },
];

let Detail = ''

export default function List () {
    const navigate = useNavigate()
    Detail = (value)=>{
        alert(value)
        console.log(value)
        navigate("/student/appeal_info",{state:{appeal: value,type: parseInt(key)}})
    }

    const location = useLocation()
    const {state} = location
    console.log(location,state)
    const [dataOne, setDataOne] = useState([]);
    const [dataTwo, setDataTwo] = useState([]);
    const [totalOne, setTotalOne] = useState(0);
    const [totalTwo, setTotalTwo] = useState(0);


    useEffect(()=>{
        let optionsSelect = []
        axios.post("https://xihui.luoxin.live/examiner/appeal/list",{
            options: {
                options: optionsSelect,
                offset: 0,
                limit: 6,
                show_total: true,
            },
            show_paper: false,
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            let da = []
            let state = ''
            console.log(res.data.data)
            for(let i = 0; i < res.data.data.list.length; i++){
                let d = res.data.data.list[i]
                setTotalOne(res.data.data.page.total)
                if (d.state === 1) {
                    state = '等待阅卷人处理'
                }
                if (d.state === 2) {
                    state = '等待教师处理'
                }
                if (d.state === 3) {
                    state = '已结束'
                }
                if (d.state === 4) {
                    state = '已取消'
                }
                da.push({
                    key: ''+(i+1)+'',
                    id: d.id,
                    paper_id: d.paper_id,
                    create_at: new Date(d.created_at *1000).toLocaleString(),
                    update_at: new Date(d.updated_at *1000).toLocaleString(),
                    state: state,
                })
                console.log(da)
            }
            setDataOne(da)
        }).catch(error => console.log(error));

        axios.post("https://xihui.luoxin.live/reviewer/appeal/list",{
            options: {
                options: optionsSelect,
                offset: 0,
                limit: 6,
                show_total: true,
            },
            show_paper: true,
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            let da = []
            let state = ''
            console.log(res.data.data)
            for(let i = 0; i < res.data.data.list.length; i++){
                let d = res.data.data.list[i]
                setTotalTwo(res.data.data.page.total)
                if (d.state === 1) {
                    state = '等待阅卷人处理'
                }
                if (d.state === 2) {
                    state = '等待教师处理'
                }
                if (d.state === 3) {
                    state = '已结束'
                }
                if (d.state === 4) {
                    state = '已取消'
                }
                da.push({
                    key: ''+(i+1)+'',
                    id: d.id,
                    paper_id: d.paper_id,
                    create_at: new Date(d.created_at *1000).toLocaleString(),
                    update_at: new Date(d.updated_at *1000).toLocaleString(),
                    state: state,
                })
                console.log(da)
            }
            setDataTwo(da)
        }).catch(error => console.log(error));
    },[])

    const changeOne: PaginationProps['onChange'] = (pageNumber) => {
        console.log('Page: ', pageNumber);
        let optionsSelect = []
        let state = ''
        let id = ''
        let paper = ''
        cond.map((element)=>{
            if (element === 6){
                state = document.getElementById("state").value
                if (state === '等待阅卷人处理') {
                    state = 1
                }
                if (state === '等待教师处理') {
                    state = 2
                }
                if (state === '已结束') {
                    state = 3
                }
                if (state === '已取消') {
                    state = 4
                }
                optionsSelect.push({
                    key: 6,
                    val: state,
                })
            }
            if (element === 5){
                id = document.getElementById("id").value
                optionsSelect.push({
                    key: 5,
                    val: parseInt(id),
                })
            }
            if (element === 4){
                paper = document.getElementById("paper").value
                console.log(paper)
                optionsSelect.push({
                    key: 4,
                    val: parseInt(paper),
                })
            }
        })

        axios.post("https://xihui.luoxin.live/examiner/appeal/list",{
            options: {
                options: optionsSelect,
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
            for(let i = 0; i < res.data.data.list.length; i++){
                let d = res.data.data.list[i]
                setTotalOne(res.data.data.page.total)
                if (d.state === 1) {
                    state = '等待阅卷人处理'
                }
                if (d.state === 2) {
                    state = '等待教师处理'
                }
                if (d.state === 3) {
                    state = '已结束'
                }
                if (d.state === 4) {
                    state = '已取消'
                }
                da.push({
                    key: ''+(i+1)+'',
                    id: d.id,
                    paper_id: d.paper_id,
                    create_at: new Date(d.created_at *1000).toLocaleString(),
                    update_at: new Date(d.updated_at *1000).toLocaleString(),
                    state: state,
                })
                console.log(da)
            }
            setDataOne(da)
        }).catch(error => console.log(error));
    }

const changeTwo: PaginationProps['onChange'] = (pageNumber) => {
    console.log('Page: ', pageNumber);
    let optionsSelect = []
    let state = ''
    let id = ''
    let paper = ''
    cond.map((element)=>{
        if (element === 6){
            state = document.getElementById("state").value
            if (state === '等待阅卷人处理') {
                state = 1
            }
            if (state === '等待教师处理') {
                state = 2
            }
            if (state === '已结束') {
                state = 3
            }
            if (state === '已取消') {
                state = 4
            }
            optionsSelect.push({
                key: 6,
                val: state,
            })
        }
        if (element === 5){
            id = document.getElementById("id").value
            optionsSelect.push({
                key: 5,
                val: parseInt(id),
            })
        }
        if (element === 4){
            paper = document.getElementById("paper").value
            console.log(paper)
            optionsSelect.push({
                key: 4,
                val: parseInt(paper),
            })
        }
    })
    axios.post("https://xihui.luoxin.live/reviewer/appeal/list",{
        options: {
            options: optionsSelect,
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
        console.log(res)
        for(let i = 0; i < res.data.data.list.length; i++){
            let d = res.data.data.list[i]
            console.log(d)
            setTotalTwo(res.data.data.page.total)
            if (d.state === 1) {
                state = '等待阅卷人处理'
            }
            if (d.state === 2) {
                state = '等待教师处理'
            }
            if (d.state === 3) {
                state = '已结束'
            }
            if (d.state === 4) {
                state = '已取消'
            }
            da.push({
                key: ''+(i+1)+'',
                id: d.id,
                paper_id: d.paper_id,
                create_at: new Date(d.created_at *1000).toLocaleString(),
                update_at: new Date(d.updated_at *1000).toLocaleString(),
                state: state,
            })
            console.log(da)
        }
        setDataTwo(da)
    }).catch(error => console.log(error));
    }

    const [cond,setCond] = useState([])
    const onSelect = (checkedValues) => {
        console.log('checked = ', checkedValues);
        setCond(checkedValues)
    };
    const items = [
        {
            key: '1',
            label: `提出的申诉`,
            children: (
                <div>
                    <Table pagination={false} columns={columnsOne} dataSource={dataOne} />
                    <div style={{
                        marginLeft: '800px',
                        marginTop: '30px',
                    }}>
                        <Pagination
                            total={totalOne}
                            defaultCurrent={1}
                            onChange={changeOne}
                            defaultPageSize={6}
                            showTotal={(total) => `共 ${totalOne} 条`}
                        />
                    </div>
                </div>),
        },
        {
            key: '2',
            label: `收到的申诉`,
            children: (
                <div>
                    <Table pagination={false} columns={columnsTwo} dataSource={dataTwo} />
                    <div style={{
                        marginLeft: '800px',
                        marginTop: '30px',
                    }}>
                        <Pagination
                            total={totalTwo}
                            defaultCurrent={1}
                            onChange={changeTwo}
                            defaultPageSize={6}
                            showTotal={(total) => `共 ${totalTwo} 条`}
                        />
                    </div>
                </div>
            ),
        },
    ];


    const [key,setKey] = useState(1)
    const onChange = (key) => {
        //通过key判断提出还是收到的
        console.log(key);
        setKey(key)
    };

    const options = [
        {
            label: '申诉状态',
            value: 6,
        },
        {
            label: '申诉编号',
            value: 5,
        },
        {
            label: '试卷编号',
            value: 4,
        },
    ];
    const onResult = () => {
        let optionsSelect = []
        let state = ''
        let id = ''
        let paper = ''
        cond.map((element)=>{
            if (element === 6){
                state = document.getElementById("state").value
                if (state === '等待阅卷人处理') {
                    state = 1
                }
                if (state === '等待教师处理') {
                    state = 2
                }
                if (state === '已结束') {
                    state = 3
                }
                if (state === '已取消') {
                    state = 4
                }
                optionsSelect.push({
                    key: 6,
                    val: state,
                })
            }
            if (element === 5){
                id = document.getElementById("id").value
                optionsSelect.push({
                    key: 5,
                    val: parseInt(id),
                })
            }
            if (element === 4){
                paper = document.getElementById("paper").value
                console.log(paper)
                optionsSelect.push({
                    key: 4,
                    val: parseInt(paper),
                })
            }
        })
        console.log(optionsSelect)
        console.log(key)
        console.log(key == 2)
        if (key == 1) {
            console.log(1)
            axios.post("https://xihui.luoxin.live/examiner/appeal/list",{
                options: {
                    options: optionsSelect,
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
                for(let i = 0; i < res.data.data.list.length; i++){
                    let d = res.data.data.list[i]
                    setTotalOne(res.data.data.page.total)
                    if (d.state === 1) {
                        state = '等待阅卷人处理'
                    }
                    if (d.state === 2) {
                        state = '等待教师处理'
                    }
                    if (d.state === 3) {
                        state = '已结束'
                    }
                    if (d.state === 4) {
                        state = '已取消'
                    }
                    da.push({
                        key: ''+(i+1)+'',
                        id: d.id,
                        paper_id: d.paper_id,
                        create_at: new Date(d.created_at *1000).toLocaleString(),
                        update_at: new Date(d.updated_at *1000).toLocaleString(),
                        state: state,
                    })
                    console.log(da)
                }
                setDataOne(da)
            }).catch(error => console.log(error));
        }
        if (key == 2) {
            console.log(2)
            axios.post("https://xihui.luoxin.live/reviewer/appeal/list",{
                options: {
                    options: optionsSelect,
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
                for(let i = 0; i < res.data.data.list.length; i++){
                    let d = res.data.data.list[i]
                    setTotalTwo(res.data.data.page.total)
                    if (d.state === 1) {
                        state = '等待阅卷人处理'
                    }
                    if (d.state === 2) {
                        state = '等待教师处理'
                    }
                    if (d.state === 3) {
                        state = '已结束'
                    }
                    if (d.state === 4) {
                        state = '已取消'
                    }
                    da.push({
                        key: ''+(i+1)+'',
                        id: d.id,
                        paper_id: d.paper_id,
                        create_at: new Date(d.created_at *1000).toLocaleString(),
                        update_at: new Date(d.updated_at *1000).toLocaleString(),
                        state: state,
                    })
                    console.log(da)
                }
                setDataTwo(da)
            }).catch(error => console.log(error));
        }


    }
    return (
        <div>
            <div style={{
                marginLeft: '30px',
            }}>
                <Checkbox.Group style={{marginLeft:'240px',marginRight:'20px',marginBottom:'20px'}} options={options} defaultValue={['State']} onChange={onSelect} />
                <Input style={{width:'150px',marginRight:'20px'}} id='state' placeholder="根据申诉状态查询"/>
                <Input style={{width:'150px',marginRight:'20px'}} id='id' placeholder="根据申诉编号查询"/>
                <Input style={{width:'150px',marginRight:'20px'}} id='paper' placeholder="根据试卷编号查询"/>
                <Button type='primary' onClick={onResult}>查询</Button>
            </div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )
}