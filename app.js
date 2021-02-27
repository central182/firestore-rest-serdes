#!/usr/bin/env node
const deserialize = require("./deserializer")
const serialize = require("./serializer")
console.log(deserialize("hello world"))

const source = require("fs").readFileSync("source.json", "utf-8")
console.log(source)
