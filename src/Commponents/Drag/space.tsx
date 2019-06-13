import  * as React from "react";
/******************************************Space 对象 [START]************************************************/
/**
 * @Author: Training
 * @desc Space容器的Props
 * @params
 *    child       容器中的子元素(包含Child对象的元素)
 *    id          唯一的值, 作为key和id使用(一般与子元素无异)
 *    index       下标值,在循环渲染的时候,根据数据顺序,生成的下标值(无需自己设置)!
 *    onEvent     当子元素移动到此处,会触发相应的事件(拖入,拖放,在容器内移动等),这里是事件集合
 *    childIndex  子元素的index值,该值是数据中设置的!
 */
interface SpaceProps {
  child?: React.ReactNode
  id: string | undefined | number
  index: number
  onEvent?: any
  childIndex?:number
}

/**
 * @Author: Training
 * @desc 实例化空位
 */
export default class Space extends React.Component {
  public props: SpaceProps;

  constructor(props: any) {
    super(props);
    this.props = props;
  }

  public componentDidMount(): void {
    let space: any = this.refs.space;
    let self = this;
    space.addEventListener("dragenter", function (event: any) {
      // 进入拖拽
      // 阻止浏览器默认事件
      event.preventDefault();
      self.props.onEvent?self.props.onEvent('dragenter',event,self):null;
    }, false);
    space.addEventListener("dragover", function (event: any) {
      // "在目标元素中拖拽";
      // 阻止浏览器默认事件
      event.preventDefault();
      self.props.onEvent?self.props.onEvent('dragover',event,self):undefined;
    }, false);

    space.addEventListener("drop", function (event: any) {
      // 拖入
      // 阻止浏览器默认事件
      event.preventDefault();
      self.props.onEvent?self.props.onEvent('drop',event,self):undefined;
    }, false);
    space.addEventListener("dragleave",function (event: any) {
      // 离开space容器
      event.preventDefault();
      self.props.onEvent?self.props.onEvent('dragleave',event,self):undefined;
    })
  }

  public render() {
    let child = this.props.child;
    return <div className={'DragSpace'} ref={"space"}>{child}</div>
  }
}

/******************************************Space 对象 [END]************************************************/
