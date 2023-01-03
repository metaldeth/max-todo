export const txtDeCode = (inCodeProps: string, passCode: string) => {
  let b52 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let maxPC = 0;
  for (let i = 0; i < passCode.length; i++) maxPC += passCode.charCodeAt(i);
  let maxPcMod = maxPC;
  let ifPC = 0;
  //Разбиваем строку на массив, который будет состоять из каждого закодированного символа
  let inCode: any[] | null = inCodeProps.match(/\d+\w/g);
  if (!inCode) return null;
  let rexCode = "";
  let numPC = 0;
  for (let i = 0; i < inCode.length; i++) {
    if (numPC === passCode.length) numPC = 0;
    if (maxPcMod < 1) maxPcMod = maxPC + ifPC;
    ifPC += maxPcMod % passCode.charCodeAt(numPC);
    let isCode = maxPcMod % passCode.charCodeAt(numPC);
    //В отличии от фунции кодирования, тут дейтсвие происходит в обратную сторону
    let nCode =
      parseInt(inCode[i]) * 52 +
      parseInt(String(b52.indexOf(inCode[i].substr(-1))));
    maxPcMod -= passCode.charCodeAt(numPC);
    numPC++;
    //И в результате соответственно уже не сложение, а вычитание
    rexCode += String.fromCharCode(nCode - isCode);
  }
  //Уже можно вернуть return rexCode.
  //Но для корректного отображения в браузере, я преобразую некоторые символы во мнемоники, а урлы преобразую в ссылки.
  return rexCode;
};
