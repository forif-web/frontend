function getType(target: any) {
  return Object.prototype.toString.call(target).slice(8, -1);
}

function isNumber(target: any) {
  return getType(target) === "Number";
}

export { getType, isNumber };
