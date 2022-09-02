// serialize bigint
const serialized = JSON.stringify(obj, (key, value) =>
  typeof value === "bigint" ? value.toString() + "n" : value
);
