/**
 * @Author: Training
 * @desc 拖拽排序插件
 * @params 看接口
 */
import * as React from 'react';
import Child from "./child"
import Space from "./space"
import './index.less'
/******************************************DragParent 对象 [START]************************************************/
/**
 * @Author: Training
 * @desc DragParent 的state接口
 * @params childData : 需要渲染的数据
 */
interface DragParentState {
  ChildData?:DragChildData[]
}
/**
 * @Author: Training
 * @desc DragParent 的props接口
 * @params childData : 需要渲染的数据
 */
interface DragParentProps {
  ChildData?: DragChildData[],
  onChange?:(target?: object, last?: object, data?: object) => void
  type?:"replace"|"insert"
}
/**
 * @Author: Training
 * @desc DragParent 所渲染的数据的接口
 * @params id  该子元素唯一的id(同时用作react的key值)
 *      index  该子元素的排序值  (值越小越靠前)
 *      render 子元素的渲染Dom
 */
export interface DragChildData {
  id:string|number|undefined
  index:number
  render:(item?:any)=>React.ReactNode
}
/**
 * @Author: Training
 * @desc DragParent 的state接口
 * @params DragPlace   :  一个Place容器的数组,用以存放所需数据
 */
export default class DragParent extends React.Component {
  public state: DragParentState = {};
  public props: DragParentProps = {
    type:this.props.type||"replace"
  };
  private dragType:"replace"|"insert"|undefined;
  private destination:any;
  private target:any;
  private lastSpace:any = undefined;
  constructor(props: DragParentProps) {
    super(props);
    this.props = props;
    this.state = {
      ChildData:this.sortData(this.props.ChildData)||[]
    };
    this.dragType = this.props.type||"replace";

  }
  public shouldComponentUpdate(nextProps: any, nextState: any, nextContext: any):boolean{
    return true
  }
  /**
   * @Author: Training
   * @desc 按照index排序(选择排序算法)
   */
  public sortData = (data:any)=>{
    let sort = [...data] || [];
    sort.forEach((item:any,index:number)=>{
      let min:any = item;
      for (let i = index+1; i < sort.length; i++) {
        if (sort[i].index <= min.index) {
          min = sort[i];
          sort[i] = sort[index];
          sort[index] = min;
        }
      }
    });
    return sort;
  };
  /**
   * @Author: Training
   * @desc 根据数据渲染出对应的视图,并交给state的DragPlace
   *    1. 对数据进行排序
   *
   * @params none
   */
  public renderPlace= () =>{
    let child:DragChildData[] = this.state.ChildData || [];
    return child.map((item:any,index:number)=>{
      return <Space key={item.id} childIndex={item.index} onEvent={this.onSpaceEvent} id={item.id} index={index} child={
        <Child index={item.index} spaceIndex={index}  onEvent={this.onChildEvent} id={item.id}>{item.render(item)}</Child>
      }/>
    })
  };
  /**
   * @Author: Training
   * @desc 更换数据的位置
   * @params data : 数据集合,toggle :  需要调换的数据位置 ,place  :  目的位置
   */
  public insertData=(data:any,toggle:number,place:number)=>{
    if (toggle === place) {return data; }
    let state:any = Object.assign([],data);
    const start:any = state[toggle];// 开始位置的数据储存
    const target:any= Object.assign({},state[place]);// 目的位置的数据储存
    state.splice(toggle,1);
    state.splice(place,0,Object.assign({},start));
    if (toggle > place) {
      for (let i = place;i<=toggle;i++){
        if (i === toggle) {
          state[toggle].index = start.index;
        }else{
          state[i].index = state[i+1].index;
        }
      }
    }else{
      for (let i = place;i>=toggle;i--){
        if (i === toggle) {
          state[toggle].index = start.index;
        }else if (i === place) {
          state[place].index = target.index;
        }else{
          state[i].index = state[i-1].index;
        }
      }
    }
    return state;

  }
  /**
   * @Author: Training
   * @desc 子元素拖动事件
   * @params type:事件名   event : 事件 child : 当前拖拽的对应的Child对象
   *  type :
   *      dragstart     拖拽开始
   *      drag          拖拽中
   *      dragend       拖拽结束
   */
  public onChildEvent = (type: string, event: any, child: Child) => {
    switch (type) {
      case "dragstart":
        this.target = {
          id:child.props.id,
          index:child.props.index,
          spaceIndex:child.props.spaceIndex
        };
        break;
    }
  };
  /**
   * @Author: Training
   * @desc 在对应位置(容器)中的拖拽事件
   * @params type:事件名   event : 事件 child : 当前拖拽进入的Space容器
   *    type:
   *        dragenter     拖拽进入
   *        dragover      在目标元素中拖拽
   *        drop          拖入完成
   */
  public onSpaceEvent= (type: string, event: any, space: Space)=>{
    switch (type) {
      case "drop":

        let state:any = this.state.ChildData;
        let jiezhi:any = state[this.destination.index];  // 介值
        let destinationIndex = jiezhi.index;
        let targetIndex = state[this.target.spaceIndex].index;
        if (this.dragType === "replace") {
          state[this.destination.index] = state[this.target.spaceIndex];
          state[this.destination.index].index = destinationIndex;
          state[this.target.spaceIndex] = jiezhi;
          state[this.target.spaceIndex].index = targetIndex;
          let re:any = space.refs.space;
          re.className = this.removeClass(re.className,'DragSpaceActive');
        }else{
          /*let jiezhi = state[this.target.spaceIndex];
          state.splice(this.target.spaceIndex,1);
          state.splice(this.destination.index,0,jiezhi);*/
          state = this.insertData(state,this.target.spaceIndex,this.destination.index);
          let re:any = this.lastSpace?this.lastSpace.refs.space:undefined;
          re.className = this.removeClass(re.className,'DragSpaceInsertActive');
          re.className = this.removeClass(re.className,'DragSpaceInsertActive_Bottom');

        }
        if (this.destination.index !== this.target.spaceIndex) {
          this.setState({
            ChildData:state
          });
        }


        this.props.onChange?this.props.onChange(state[this.destination.index],state[this.target.spaceIndex],state):undefined;
        break;
      case "dragover":
        let ref:any = space.refs.space;
        let newClassName;
        if (this.dragType === "replace") {
          newClassName = this.addClass(ref.className,'DragSpaceActive');
        } else{
          if(this.target.spaceIndex>this.destination.index || this.target.spaceIndex===this.destination.index){
            newClassName = this.addClass(ref.className,'DragSpaceInsertActive');
          } else if(this.target.spaceIndex<this.destination.index){
            newClassName = this.addClass(ref.className,'DragSpaceInsertActive_Bottom');
          }
        }
        ref.className = newClassName;

        break;
      case "dragenter":
        this.destination = {
          id:space.props.id,
          index:space.props.index,
          childIndex:space.props.childIndex
        };
        if (this.lastSpace!== undefined){
          let refs:any = this.lastSpace.refs.space;
          if (this.lastSpace !== space) {
            if (this.dragType === "replace") {
              refs.className = this.removeClass(refs.className,'DragSpaceActive');
            } else if (this.dragType === "insert") {
              refs.className = this.removeClass(refs.className,'DragSpaceInsertActive');
              refs.className = this.removeClass(refs.className,'DragSpaceInsertActive_Bottom');
            }
          }
        }
        this.lastSpace = space;
        break;
      case "dragleave":
        break;
    }


  };
  /**
   * @Author: Training
   * @desc 判断样式名是否存在
   * @params className  当前样式名   hasClassName 要检查的样式名
   */
  public hasClass= (className:any,hasClassName:string):boolean=>{
    return className.indexOf(hasClassName) !== -1;
  };
  /**
   * @Author: Training
   * @desc 给dom添加class
   * @params className  当前样式名,   addClassName  需要添加的样式名
   */
  public addClass = (className:any,addClassName:string)=>{
    if (!this.hasClass(className,addClassName)){
      className +=" "+addClassName;
    }
    return className;
  };
  /**
   * @Author: Training
   * @desc 删除dom中的样式名
   * @params className  当前样式名   removeClassName  要删除的样式名
   */
  public removeClass = (className:string,removeClassName:string)=>{
    if (className.indexOf(removeClassName) !== -1){
      // @ts-ignore
      className = className.replace(removeClassName,'');
    }
    return className;
  }
  public render = () => {
    return <div className={"DragParent"}>{this.renderPlace()}</div>;
  }
}
/******************************************DragParent 对象 [END]************************************************/










