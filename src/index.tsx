import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DragParent ,{DragChildData} from "./Commponents/Drag";
import './index.less'
import '../index.less'
import Detection from "./Commponents/Detection";
import Cookie from "./Commponents/Cookie"
/**
 * @Author: Training
 * @desc 自己造的轮子的测试界面
 */
/******************************************页面测试程序[START]************************************************/
/**
 * @Author: Training
 * @desc 页面测试
 * @params
 */

class App extends React.Component {
  constructor(props: any) {
    super(props);
  }
  public componentDidMount(): void {
    let canvas:any = document.getElementById("canvas_test");
    let gl = canvas.getContext("experimental-webgl");
    console.log(canvas);
  }

  public render() {
    return (
      <div>
        <canvas id={"canvas_test"} ref={'canvas'} />
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root') as HTMLElement);
