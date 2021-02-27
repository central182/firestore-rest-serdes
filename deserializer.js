function deserialize(fields) {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => {
      return [key, decode(value)];
    })
  );
}

function decode(value) {
  if ("stringValue" in value) {
    return value.stringValue;
  }
}

module.exports = deserialize;
