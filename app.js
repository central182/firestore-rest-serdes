#!/usr/bin/env node
const deserialize = require("./deserializer");
const serialize = require("./serializer");

const source = JSON.parse(require("fs").readFileSync("source.json", "utf-8"));
const obj = deserialize(source);
console.log(JSON.stringify(obj, null, 2));
