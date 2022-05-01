function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export default function handleErrorMessage(msg: string) {
  let i;
  for (i = msg.length - 1; i >= 0; i--) {
    if (msg[i] === "/") break;
  }

  msg = msg.slice(i + 1);
  msg = msg.slice(0, msg.length - 2)

  msg = msg.replace(/-/g, " ")
  
  return toTitleCase(msg)
}
