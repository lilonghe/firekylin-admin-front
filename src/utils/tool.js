export function stringToHexColor(str) {
  if (!str) {
      return "#000";
  }
  const arr = [];

  for (let i = 0; i < str.length; i++) {
      arr[i] = str.charCodeAt(i).toString(16).slice(-2);
  }

  let result = arr.join("");

  if (result.length > 6) {
      result = result.substring(0, 6);
  }
  while (result.length < 6) {
      result += "0";
  }

  return `#${result}`;
}
