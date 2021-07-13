import { Button, Form, Input, Radio } from "antd";
import { useEffect, useState } from "react";
import Games from "../../components/Games";
import { machineId, machineIdSync } from "node-machine-id";
import { store } from "../../redux";
import {
  dequeueUserData,
  setUserData,
} from "../../redux/actions/userdata.action";
import { useSelector } from "react-redux";
import axios from "axios";
//remove in mobile app
const { ipcRenderer, remote } = window.require("electron");

function MainScreen() {
  useEffect(() => {
    setInterval(() => {
      store.getState().userdata.pastQueue.forEach((ob) => {
        axios
          .post("https://thepallab.com/api/games/store", ob)
          .then(() => {
            store.dispatch(dequeueUserData(ob));
          })
          .catch(console.log);
      });
    }, 1000);
  });

  var [stage, setStage] = useState({ stage: "form" });
  const [errorVal, setErrorVal] = useState("");
  var un = useSelector((state) => state.userdata.email);
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  var onSubmit = async (val) => {
    //replace in mobile app
    //var uid = document.getElementById('device_unique_id').innerHTML
    let password = val.password;
    let username = val.username;
    const userVal = await axios.post("https://thepallab.com/api/user/loginid", {
      password,
      email: username,
    });
    if (userVal.data.error) {
      setErrorVal(userVal.data.message);
    } else {
      store.dispatch(setUserData(userVal.data.userInfo));
      setStage({ stage: "game" });
    }
    console.log("look", userVal);
  };
  console.log(store.getState());
  if (stage.stage === "form" && un.length == 0) {
    return (
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onSubmit}
        initialValues={{
          "input-number": 3,
          "checkbox-group": ["A", "B"],
          rate: 3.5,
        }}
      >
        <Form.Item
          label="Email"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>
        {errorVal.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <p style={{ marginTop: "1%", color: "red", alignItems: "center" }}>
              {errorVal}
            </p>
          </div>
        )}
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Begin
          </Button>
        </Form.Item>
      </Form>
    );
  } else {
    var order = Math.floor(Math.random() * 2);
    return (
      <Games
        order={order}
        onComplete={() => {
          //remove in mobile app
          remote.getCurrentWindow().close();
        }}
      />
    );
  }
}

export default MainScreen;
