const deserialize = require("./deserializer");

describe("deserialize", () => {
  test("nullValue", () => {
    expect(deserialize({ field: { nullValue: null } })).toEqual({
      field: null,
    });
  });

  test("booleanValue", () => {
    expect(deserialize({ field: { booleanValue: true } })).toEqual({
      field: true,
    });
  });

  test("integerValue", () => {
    expect(deserialize({ field: { integerValue: "5" } })).toEqual({ field: 5 });
  });

  test("doubleValue", () => {
    expect(deserialize({ field: { doubleValue: 3.14 } })).toEqual({
      field: 3.14,
    });
  });

  test("timestampValue", () => {
    expect(
      deserialize({ field: { timestampValue: "2021-01-01T00:00:00.000Z" } })
    ).toEqual({ field: "2021-01-01T00:00:00.000Z" });
  });

  test("stringValue", () => {
    expect(deserialize({ field: { stringValue: "hello world" } })).toEqual({
      field: "hello world",
    });
  });

  test("bytesValue", () => {
    expect(deserialize({ field: { bytesValue: "aGVsbG8gd29ybGQ=" } })).toEqual({
      field: "aGVsbG8gd29ybGQ=",
    });
  });

  test("referenceValue", () => {
    expect(
      deserialize({
        field: {
          referenceValue:
            "projects/local/databases/(default)/documents/someCollection/someDocument",
        },
      })
    ).toEqual({
      field:
        "projects/local/databases/(default)/documents/someCollection/someDocument",
    });
  });

  test("geoPointValue", () => {
    expect(
      deserialize({
        field: { geoPointValue: { latitude: 5, longitude: 3.14 } },
      })
    ).toEqual({ field: { latitude: 5, longitude: 3.14 } });
  });

  test("arrayValue", () => {
    expect(
      deserialize({
        field: {
          arrayValue: {
            values: [{ integerValue: "0" }, { stringValue: "hello world" }],
          },
        },
      })
    ).toEqual({ field: [0, "hello world"] });
  });

  test("mapValue", () => {
    expect(
      deserialize({
        field: {
          mapValue: {
            fields: {
              zero: {
                integerValue: 0,
              },
              hello: {
                stringValue: "world",
              },
            },
          },
        },
      })
    ).toEqual({ field: { zero: 0, hello: "world" } });
  });

  test("nested", () => {
    expect(
      deserialize({
        mapInArray: {
          arrayValue: {
            values: [
              {
                mapValue: {
                  fields: {
                    zero: {
                      integerValue: 0,
                    },
                    hello: {
                      stringValue: "world",
                    },
                  },
                },
              },
            ],
          },
        },
        arrayInMap: {
          mapValue: {
            fields: {
              inner: {
                arrayValue: {
                  values: [
                    { integerValue: "0" },
                    { stringValue: "hello world" },
                  ],
                },
              },
            },
          },
        },
      })
    ).toEqual({
      mapInArray: [{ zero: 0, hello: "world" }],
      arrayInMap: { inner: [0, "hello world"] },
    });
  });
});
