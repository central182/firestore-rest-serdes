# firestore-rest-serdes

The Firestore REST API has a unique way of representing [Documents](https://firebase.google.com/docs/firestore/reference/rest/v1/projects.databases.documents#Document) and this module is here to provide a serializer and a deserializer that convert between ordinary JSON objects and those compatible with the Firestore REST API.

## Why bother with the REST API at all?

It is not possible for the [Node.js Admin SDK](https://firebase.google.com/docs/reference/admin/node) to make Firestore requests on behalf of a user (that is, using the ID token of a user and triggering the security rules).

In a typical scenario where

- Firestore security rules have been set up as a means of authorization
- making Firestore requests at the front end is not appropriate

we can call the Firestore REST API at the back end (e.g. Cloud Functions), with the ID token of a user and hence triggering the security rules.

## How to use this module

```js
const { serialize, deserialize } = require("this_module");
```

### Deserialization

Suppose the response of a read request contains a document like:

```js
{
  // Other key-value pairs that we don't care
  fields: {
    hello: {
      stringValue: "world"
    },
    zero: {
      integerValue: "0"
    }
  }
}
```

Calling `deserialize` on the value of `fields` gives us:

```js
{
  hello: "world",
  zero: 0
}
```

### Serialization

Suppose we want to save the following object as a document:

```js
{
  hello: "world",
  zero: 0
}
```

Calling `serialize` on this object gives us:

```js
{
  hello: {
    stringValue: "world"
  },
  zero: {
    integerValue: "0"
  }
}
```

And then we can put the resultative object in the body of a write request.
