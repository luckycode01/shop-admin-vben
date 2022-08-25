export const dateFormat = (time) => {
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  return `${year}-${month}-${day} ${hours}:${min}:${sec}`;
};
