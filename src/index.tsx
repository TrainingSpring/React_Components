import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DragParent ,{DragChildData} from "./Commponents/Drag";
import './index.less'
import '../index.less'
import Detection from "./Commponents/Detection";
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
  public dragChange = (t:any,last:any,data:any)=>{
    console.log(t,last,data);
  };
  public render() {

    return (
      <div>
        <Detection type={"number"}><input type="text"/></Detection>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root') as HTMLElement);
