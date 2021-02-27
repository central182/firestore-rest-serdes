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
  // TODO: use firestore Timestamp type
  if ("timestampValue" in value) {
    return value.timestampValue;
  }
  if ("stringValue" in value) {
    return value.stringValue;
  }
  // TODO: when is bytesValue used?
  if ("bytesValue" in value) {
    return null;
  }
  // TODO: use firestore DocumentReference type
  if ("referenceValue" in value) {
    return value.referenceValue;
  }
  // TODO: use firestore GeoPoint type
  if ("geoPointValue" in value) {
    return value.geoPointValue;
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
