// serialize bigint
const serialize = JSON.stringify(obj, (key, value) =>
  typeof value === "bigint" ? Number(value) : value
);

// const serialized = JSON.stringify(obj, (key, value) =>
//   typeof value === "bigint" ? value.toString() + "n" : value
// );

// for (const [key, value] of Object.entries(el[1])) {
//   typeof value === "bigint" ? Number(value) : value;
// }
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

// export { serialize };
