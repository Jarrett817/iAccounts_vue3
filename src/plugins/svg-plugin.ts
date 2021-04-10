import { readFileSync, readdirSync } from "fs";
import { Plugin } from "vite";
// id 前缀
let idPerfix = "";

// 识别svg标签的属性
const svgTitle = /<svg([^>+].*?)>/;

// 有一些svg文件的属性会定义height和width，要把它清除掉
const clearHeightWidth = /(width|height)="([^>+].*?)"/g;

// 没有viewBox的话就利用height和width来新建一个viewBox
const hasViewBox = /(viewBox="[^>+].*?")/g;

// 清除换行符
const clearReturn = /(\r)|(\n)/g;

/**
 * @param dir 路径
 */
function findSvgFile(dir: string): string[] {
  const svgRes: string[] = [];
  const dirents = readdirSync(dir, {
    withFileTypes: true
  });
  for (const dirent of dirents) {
    const path = dir + dirent.name;
    if (dirent.isDirectory()) {
      svgRes.push(...findSvgFile(path + "/"));
    } else {
      const svg = readFileSync(path)
        .toString()
        .replace(clearReturn, "")
        .replace(svgTitle, ($1, $2) => {
          let width = 0;
          let height = 0;
          let content = $2.replace(clearHeightWidth, (s1, s2, s3) => {
            s3 = s3.replace("px", "");
            if (s2 === "width") {
              width = s3;
            } else if (s2 === "height") {
              height = s3;
            }
            return "";
          });
          if (!hasViewBox.test($2)) {
            content += `viewBox="0 0 ${width} ${height}"`;
          }
          return `<symbol id="${idPerfix}-${dirent.name.replace(".svg", "")}" ${content}>`;
        })
        .replace("</svg>", "</symbol>");
      svgRes.push(svg);
    }
  }
  return svgRes;
}

export const svgBuilder = (path: string, perfix = "icon"): Plugin => {
  if (path === "") return;
  idPerfix = perfix;
  const res = findSvgFile(path); //引用上面的
  return {
    name: "svg-transform",
    transformIndexHtml(html): string {
      return html.replace(
        "<body>",
        `
            <body>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
                ${res.join("")}
              </svg>
          `
      );
    }
  };
};
