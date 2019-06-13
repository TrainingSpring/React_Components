import * as React from 'react';
/******************************************Child 对象 [START]************************************************/
/**
 * @Author: Training
 * @desc 子元素容器的Props接口
 * @params
 *      id    一个唯一的值
 *      index  排序值  越小越靠前
 *      children 子容器包含的内容
 *      onEvent  拖动子元素触发的事件集合
 *      spaceIndex 父元素的index值(父元素的index值代表的是下标值)
 */
interface ChildProps {
  id: string | undefined
  index: number
  children?: any
  onEvent?: any
  spaceIndex?:number
}

/**
 * @Author: Training
 * @desc 子元素
 * @params
 */
export default class Child extends React.Component {
  public props: ChildProps;

  constructor(props: any) {
    super(props);
    this.props = props;
  }

  public componentDidMount(): void {
    let self = this;
    let child: any = this.refs.child;
    child.addEventListener("dragstart", function (event: any) {
      // 存储拖拽数据和拖拽效果...
      self.props.onEvent?self.props.onEvent("dragstart", event, self):undefined;
    }, false);
    child.addEventListener("drag", function (event: any) {
      // 拖拽中
      self.props.onEvent?self.props.onEvent("drag", event, self):undefined;
    }, false);
    child.addEventListener("dragend", function (event: any) {
      // 拖拽结束
      self.props.onEvent?self.props.onEvent("dragend", event, self):undefined;
    }, false);
  }

  public render() {
    return <div className={'DragChild'} id={this.props.id} draggable={true} ref={"child"}>{this.props.children}</div>
  }

}
/******************************************Child 对象 [END]************************************************/

