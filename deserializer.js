function deserialize(fields) {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => {
      return [key, decode(value)];
    })
  );
}

function decode(value) {
  if ("nullValue" in value) {
    return null;
  }
  if ("booleanValue" in value) {
    return value.booleanValue;
  }
  if ("integerValue" in value) {
    return parseInt(value.integerValue);
  }
  if ("doubleValue" in value) {
    return value.doubleValue;
  }
  if ("timestampValue" in value) {
    return value.timestampValue;
  }
  if ("stringValue" in value) {
    return value.stringValue;
  }
  if ("bytesValue" in value) {
    return value.bytesValue;
  }
  if ("referenceValue" in value) {
    return value.referenceValue;
  }
  if ("geoPointValue" in value) {
    const { latitude, longitude } = value.geoPointValue;
    return { latitude, longitude };
  }
  if ("arrayValue" in value) {
    return value.arrayValue.values.map((value) => decode(value));
  }
  if ("mapValue" in value) {
    return deserialize(value.mapValue.fields);
  }
  return null;
}

module.exports = deserialize;
