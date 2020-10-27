export function saveData(key: string, data: any) {
  if (localStorage) {
    let str = data;
    if (typeof data === "object") {
      str = JSON.stringify(data);
    }
    localStorage.setItem(key, str);
  }
}

export function getData(key:string) {
    if(localStorage) {
        let res:any = localStorage.getItem(key)
        try {
            res = JSON.parse(res)
        }
        catch {
            console.warn('JSON化失败!')
        }
        return res;
    }
}
