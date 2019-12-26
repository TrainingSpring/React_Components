/**
 * @Author: Training
 * @desc 自定义cookie组件
 * @params
 */
export default class Cookie {
  private _cookie_json:any;

  public getCookieVal(){
    let cookie:any = document.cookie;
    cookie = cookie.match(/\w+=([\u4e00-\u9fa5]|(?!;).)+/g);
    let toJson:any = {};
    if (!cookie){
      return {}
    };
    for (let i = 0,tem:any,isObj, len = cookie.length; i < len; i++) {
      tem = cookie[i].split("=");
      try {
        isObj = JSON.parse(tem[1]);
      }catch (e) {
        isObj = tem[1]
      }
      toJson[tem[0]] = isObj;
    }
    return toJson;
  }
  public setCookie(data:any,date?:Date){
      this._cookie_json = data;
      let validity:any = date?"expires="+date.toUTCString():"";
    console.log(data);
    for (let i in data) {
        if (typeof data[i] !== "string") {
          data[i] = JSON.stringify(data[i]);
        }
        document.cookie = `${i}=${data[i]}; `+validity;
      }
  }
  public removeCookie(key:string){
    let date = new Date().getTime()-1000;
    date = new Date(date).getUTCDate();
    document.cookie = key+"="+"; expires="+date;
    delete this._cookie_json[key];
  }
}