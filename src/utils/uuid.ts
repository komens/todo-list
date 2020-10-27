export default function uuid(num: number = 5) {
  // 先取num位随机字符
  var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
  var res = "";
  for (var i = 0; i < num; i++) {
    res += x.charAt(Math.floor(Math.random() * x.length));
  }
  // 再根据时间得到唯一Key
  let date = new Date();
  res += date.valueOf().toString(16);
  return res;
}
