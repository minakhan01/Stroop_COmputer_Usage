import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./redux";

import "antd/dist/antd.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Games from "./components/Games";
import MainScreen from "./screens/MainScreen/MainScreen";
function App() {
    return (
        <Provider store={store}>
            <MainScreen/>
    </Provider>
  );
}

export default App;
