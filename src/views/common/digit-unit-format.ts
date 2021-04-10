// function digitUnitFormat(number: any) {
//   // 以万为起始单位 处理数值 保留两位有效小数位
//   // let step = 10
//   // let unitStr = ["万", "十万", "百万", "千万", "亿", "十亿", "百亿", "千亿", "万亿"]
//   const step = 10000;
//   const unitStr = ['', '万', '亿', '万亿'];
//   const valueRange = [10000, 9999999999999999];
//   number = Number(number);
//   let result = number;
//   if (number <= valueRange[0]) {
//     result = number;
//   } else if (number >= valueRange[1]) {
//     // 科学记数法
//     const i = Math.floor(Math.log(number) / Math.LN10);
//     const value = (number * Math.pow(10, -i)).toFixed(2);
//     result = value + 'e' + i;
//   } else {
//     const i = Math.floor(Math.log(number) / Math.log(step));
//     let value = (number / Math.pow(step, i)).toFixed(2);
//     // 百位级别以上不保留小数位
//     if (String(value).length > 5) {
//       value = (number / Math.pow(step, i)).toFixed(0);
//     }
//     result = value + unitStr[i];
//   }
//   return result;
// }

// export { digitUnitFormat };
