import React from "react";
import FruitNinja from "./fruit_ninja";
import StroopTest from "./stroop_test";
import { useState } from "react";
import { Button } from "antd";
import fruitNinjaManager from "./fruit_ninja_manager";
import stroopTestManager from "./stroop_test_manager";
import axios from "axios";
import { store } from "../../redux";
import PushInfo from "./push_info";
function Games(props) {
    var [stage, setStage] = useState({ stage: 0, scores: [], fruit:1, stroop:1 });

  console.log(stage);

  var s1 = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  if (stage.stage== 0)
    return (
      <div style={{...s1}}>
        <Button onClick={() => setStage({...stage, stage:1})}>Start</Button>
      </div>
    );

    if ((stage.stage == 1 && props.order == 0) || (stage.stage == 3 && props.order == 1)) {
        return fruitNinjaManager(stage,setStage)   
    }



  if (stage.stage == 2)
    return (
      <div style={{ ...s1, flexDirection: 'column' }}>
        <div>Score is {stage.scores[0]}</div>
        <Button onClick={() => setStage({...stage, stage:3})}>Next game</Button>
      </div>
    );

   if ((stage.stage == 3 && props.order == 0) || (stage.stage == 1 && props.order == 1))
      return stroopTestManager(stage,setStage)

    if (stage.stage == 4) {
        return <PushInfo stage={stage} prp={props}/>
    }
  return null;
}

export default Games;
