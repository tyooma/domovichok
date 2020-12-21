import { LANG } from './Consts';

export const getLocaleDT = (time, lang) => {
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const MM = month < 10 ? "0" + month : month.toString();
  const dd = day < 10 ? "0" + day : day.toString();

  const hh = hours < 10 ? "0" + hours : hours.toString();
  const mm = minutes < 10 ? "0" + minutes : minutes.toString();
  const ss = seconds < 10 ? "0" + seconds : seconds.toString();

  let output = undefined;
  switch(lang) {
    case LANG.en: output = `${MM}/${dd}/${year} ${hh}:${mm}:${ss}`; break;
    case LANG.ru: output = `${dd}.${MM}.${year} ${hh}:${mm}:${ss}`; break;
    default: output = `${dd}.${MM}.${year} ${hh}:${mm}:${ss}`;
  }
  return output;
}

//--------------------------------------------------------------------------------------------------------

export const getDispatchDT = (time) => {
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const MM = month < 10 ? "0" + month : month.toString();
  const dd = day < 10 ? "0" + day : day.toString();

  const hh = hours < 10 ? "0" + hours : hours.toString();
  const mm = minutes < 10 ? "0" + minutes : minutes.toString();
  const ss = seconds < 10 ? "0" + seconds : seconds.toString();

  const output = `${dd}.${MM}.${year} ${hh}:${mm}:${ss}`;
  return output;
}

export const getDT = () => {
  const newDT = new Date();
  const day = newDT.getDate();
  const month = newDT.getMonth() + 1;
  const year = newDT.getFullYear();
  const hours = newDT.getHours();
  const minutes = newDT.getMinutes();
  const seconds = newDT.getSeconds();

  const hh = hours < 10 ? "0" + hours : hours.toString();
  const mm = minutes < 10 ? "0" + minutes : minutes.toString();
  const ss = seconds < 10 ? "0" + seconds : seconds.toString();

  const dd = day < 10 ? "0" + day : day.toString();
  const MM = month < 10 ? "0" + month : month.toString();

  const output = `${dd}.${MM}.${year} ${hh}:${mm}:${ss}`;
  return output;
}

export const getFullDT = () => {
  const newDT = new Date();
  const day = newDT.getDate();
  const month = newDT.getMonth() + 1;
  const year = newDT.getFullYear();
  const hours = newDT.getHours();
  const minutes = newDT.getMinutes();
  const seconds = newDT.getSeconds();
  const mseconds = newDT.getMilliseconds();

  const hh = hours < 10 ? "0" + hours : hours.toString();
  const mm = minutes < 10 ? "0" + minutes : minutes.toString();
  const ss = seconds < 10 ? "0" + seconds : seconds.toString();

  const mss = mseconds < 10 ? "0" + mseconds : mseconds.toString();

  const dd = day < 10 ? "0" + day : day.toString();
  const MM = month < 10 ? "0" + month : month.toString();
  const output = `${dd}.${MM}.${year} ${hh}:${mm}:${ss}.${mss}`;
  return output;
}

export const getTime = () => {
  const newDT = new Date();
  const hours = newDT.getHours();
  const minutes = newDT.getMinutes();
  const seconds = newDT.getSeconds();

  const hh = hours < 10 ? "0" + hours : hours.toString();
  const mm = minutes < 10 ? "0" + minutes : minutes.toString();
  const ss = seconds < 10 ? "0" + seconds : seconds.toString();

  const output = `${hh}:${mm}:${ss}`;
  return output;
}

export const getFullTime = () => {
  const newDT = new Date();
  const hours = newDT.getHours();
  const minutes = newDT.getMinutes();
  const seconds = newDT.getSeconds();
  const mseconds = newDT.getMilliseconds();

  const hh = hours < 10 ? "0" + hours : hours.toString();
  const mm = minutes < 10 ? "0" + minutes : minutes.toString();
  const ss = seconds < 10 ? "0" + seconds : seconds.toString();
  const mss = mseconds < 10 ? "0" + mseconds : mseconds.toString();

  const output = `${hh}:${mm}:${ss}.${mss}`;
  return output;
}
