const admin = require("firebase-admin");

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
    return admin.firestore.Timestamp.fromDate(new Date(value.timestampValue));
  }
  if ("stringValue" in value) {
    return value.stringValue;
  }
  if ("bytesValue" in value) {
    return Buffer.from(value.bytesValue, "base64");
  }
  if ("referenceValue" in value) {
    // The DocumentReference can't be recovered without the reference
    // to the related Firestore instance.
    // For brevity, only the path of the document is returned here.
    return value.referenceValue;
  }
  if ("geoPointValue" in value) {
    const { latitude, longitude } = value.geoPointValue;
    return new admin.firestore.GeoPoint(latitude, longitude);
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
