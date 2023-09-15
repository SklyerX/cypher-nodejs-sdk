# Javscript Client SDK for Cypher

For the full documentation please visit [cypher.skylerx.ir/docs](https://cypher.skylerx.ir/docs)
<br>
To get started please visist [cypher.skylerx.ir](https://cypher.skylerx.ir)

Cypher SDK to encrypt data in client-side JavaScript applications

## Info

the difference between this SDK and the other one is that this one won't save to the audit log making it more friendly to use in your nextjs client components. This way your client secret doesn't get leaked to the public upon making a request.

## Install

`npm i @skylerx/cypher-client` or `yarn add @skylerx/cypher-client`

## Import

```js
import Cypher from "@skylerx/cypher-client";
```

## Initialize

Initialize the SDK with your `APP_ID` and `APP_SECRET`:

```js
const cypher = new Cypher({
  appId: APP_ID,
  appSecret: APP_SECRET,
  JWT_SECRET: JWT_SECRET,
});
```

Note that the JWT secret must be the same one that is given to you in the developer console (web platform) because that's what is used to encode, decode, verify, and add to audit log

## Usage

```js
const ciphertext = await cypher.encrypt("hello world");
```

## Development

### Install dependencies

`npm install`

### Build

`npm run build`

### Run tests

`npm test`

## Contributing 🤝

If you'd like to contribute to this application, I appreciate your interest! Here's how you can get involved:

- Report any issues or bugs by creating a new issue in the repository. 🐛
- Suggest improvements or new features by creating a new issue and describing your ideas. 💡
- Fork the repository, make changes, and submit a pull request for review. 🛠️

## License 📄

The Cypher project is licensed under the [GNU Affero General Public License version 3 (AGPL-3.0)](LICENSE).
