const serialize = require("./serializer");

describe("serialize", () => {
  test("nullValue", () => {
    expect(
      serialize({
        field: null,
      })
    ).toEqual({ field: { nullValue: null } });
  });

  test("booleanValue", () => {
    expect(
      serialize({
        field: true,
      })
    ).toEqual({ field: { booleanValue: true } });
  });

  test("integerValue", () => {
    expect(serialize({ field: 5 })).toEqual({ field: { integerValue: "5" } });
  });

  test("doubleValue", () => {
    expect(
      serialize({
        field: 3.14,
      })
    ).toEqual({ field: { doubleValue: 3.14 } });
  });

  test("timestampValue", () => {
    expect(serialize({ field: "2021-01-01T00:00:00.000Z" })).toEqual({
      field: { timestampValue: "2021-01-01T00:00:00.000Z" },
    });
  });

  test("stringValue", () => {
    expect(
      serialize({
        field: "hello world",
      })
    ).toEqual({ field: { stringValue: "hello world" } });
  });

  test("referenceValue", () => {
    expect(
      serialize({
        field:
          "projects/local/databases/(default)/documents/someCollection/someDocument",
      })
    ).toEqual({
      field: {
        referenceValue:
          "projects/local/databases/(default)/documents/someCollection/someDocument",
      },
    });
  });

  test("geoPointValue", () => {
    expect(serialize({ field: { latitude: 5, longitude: 3.14 } })).toEqual({
      field: { geoPointValue: { latitude: 5, longitude: 3.14 } },
    });
  });

  test("arrayValue", () => {
    expect(serialize({ field: [0, "hello world"] })).toEqual({
      field: {
        arrayValue: {
          values: [{ integerValue: "0" }, { stringValue: "hello world" }],
        },
      },
    });
  });

  test("mapValue", () => {
    expect(serialize({ field: { zero: 0, hello: "world" } })).toEqual({
      field: {
        mapValue: {
          fields: {
            zero: {
              integerValue: "0",
            },
            hello: {
              stringValue: "world",
            },
          },
        },
      },
    });
  });

  test("nested", () => {
    expect(
      serialize({
        mapInArray: [{ zero: 0, hello: "world" }],
        arrayInMap: { inner: [0, "hello world"] },
      })
    ).toEqual({
      mapInArray: {
        arrayValue: {
          values: [
            {
              mapValue: {
                fields: {
                  zero: {
                    integerValue: "0",
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
                values: [{ integerValue: "0" }, { stringValue: "hello world" }],
              },
            },
          },
        },
      },
    });
  });
});
