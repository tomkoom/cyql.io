// serialize bigint
const serialized = JSON.stringify(balance, (key, value) =>
  typeof value === "bigint" ? value.toString() + "n" : value
);
