import { Button, Form, Input, Radio } from "antd";
import { useEffect, useState } from "react";
import Games from "../../components/Games";
import { machineId, machineIdSync } from 'node-machine-id';
import { store } from "../../redux";
import { dequeueUserData, setUserData } from "../../redux/actions/userdata.action";
import { useSelector } from "react-redux";
import axios from "axios";
//remove in mobile app
const { ipcRenderer, remote } = window.require('electron');


function MainScreen() {
    useEffect(() => {
        setInterval(() => {
            store.getState().userdata.pastQueue.forEach(ob => {
                axios.post('https://thepallab.com/api/games/store', ob).then(()=>
                    {
                        store.dispatch(dequeueUserData(ob))
                    }
                ).catch(console.log)
            })
        }, 1000)
    })


    var [stage, setStage] = useState({ stage: 'form' })
    var un = useSelector((state)=>state.userdata.uname)
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    var onSubmit = (val) => {
        var uid = (ipcRenderer.sendSync('synchronous-message', 'ping'))         
        //replace in mobile app
        //var uid = document.getElementById('device_unique_id').innerHTML
        var did = val.deviceid
        var uname = val.username
        store.dispatch(setUserData({uid:uid, did:did, uname:uname}))
        setStage({stage: 'game'})
    }
    console.log(store.getState())
    if (stage.stage === "form" && un.length==0) {
        return <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onSubmit}
            initialValues={{
                'input-number': 3,
                'checkbox-group': ['A', 'B'],
                rate: 3.5,
            }}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Deviceid"
                name="deviceid"
                rules={[{ required: true, message: 'Please input your device id!' }]}
            >
                <Input />
            </Form.Item>



            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit">
                    Begin
        </Button>
            </Form.Item>
        </Form>

    } 

    else {
        var order = Math.floor(Math.random() * 2)
        return <Games order={order} onComplete={() => {            
            //remove in mobile app
            remote.getCurrentWindow().close()
        }} />
    }



}

export default MainScreen;