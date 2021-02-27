function serialize(object) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      return [key, encode(value)];
    })
  );
}

function encode(value) {
  if (value === null) {
    return {
      nullValue: null,
    };
  }
  if (typeof value === "boolean") {
    return {
      booleanValue: value,
    };
  }
  if (typeof value === "number" && Number.isInteger(value)) {
    return {
      integerValue: String(value),
    };
  }
  if (typeof value === "number") {
    return {
      doubleValue: value,
    };
  }
  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{3})?Z$/.test(value)
  ) {
    return {
      timestampValue: value,
    };
  }
  if (
    typeof value === "string" &&
    /^projects\/.*\/databases\/.*\/documents\/.+/.test(value)
  ) {
    return {
      referenceValue: value,
    };
  }
  // There's no way to tell whether a seemingly base64-encoded string
  // is intended to be stored as a stringValue or a bytesValue.
  if (typeof value === "string") {
    return {
      stringValue: value,
    };
  }
  if (
    typeof value === "object" &&
    "latitude" in value &&
    "longitude" in value
  ) {
    return {
      geoPointValue: {
        latitude: value.latitude,
        longitude: value.longitude,
      },
    };
  }
  if (typeof value === "object" && Array.isArray(value)) {
    return {
      arrayValue: {
        values: value.map((item) => encode(item)),
      },
    };
  }
  if (typeof value === "object") {
    return {
      mapValue: {
        fields: serialize(value),
      },
    };
  }
  return {
    nullValue: null,
  };
}

module.exports = serialize;
