export default (utcSeconds: number) => {
  const d = new Date(utcSeconds);
  const date =
    ("0" + d.getDate()).slice(-2) +
    " / " +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    " / " +
    d.getFullYear();
  return date;
};
