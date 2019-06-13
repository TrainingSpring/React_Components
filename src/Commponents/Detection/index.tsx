import * as React from 'react';
interface IProps {
  type?:"number"|"text"|"email"|"phone"|"tel"
  trigger?:"change"|"blur"
  children:any
}
class Detection extends React.Component {
  public props:IProps = {
    type:this.props.type||"text",
    trigger:this.props.trigger||"change",
    children:this.props.children
  };

  constructor(props:any) {
    super(props);
    this.props = props;
  }
  public inputDetection = ()=>{}
  public render() {
    let child = React.Children.map(this.props.children,(item)=>{

      console.log(item.props);
    });
    return <div className={"Detection"}>
      <div className="Detection_children">{this.props.children}</div>
    </div>;
  }
}

export default Detection;
