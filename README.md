# firestore-rest-serdes

The Firestore REST API has a unique way of representing [Documents](https://firebase.google.com/docs/firestore/reference/rest/v1/projects.databases.documents#Document) and this repository is here to provide a serializer and a deserializer that convert between ordinary JSON objects and those compatible with the Firestore REST API.

## Why bother with the REST API at all?
It is not possible for the [Node.js Admin SDK](https://firebase.google.com/docs/reference/admin/node) to make Firestore requests on behalf of a user (that is, using the ID token of a user and triggering the security rules).

In a typical scenario where
- Firestore security rules have been set up as a means of authorization
- making Firestore requests at the front end is not appropriate

we can call the Firestore REST API at Cloud Functions, with the ID token of a user and hence triggering the security rules.

## Deserialization


## Serialization
