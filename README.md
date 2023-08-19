# cyql.io

[cyql.io](https://cyql.io/) is a curated gallery of projects built on the [Internet Computer](https://internetcomputer.org/).

### API

See the [API guide](https://docs.cyql.io/) to query the data from the site.

### Stack

- react.js
- styled components
- webpack
- [internet computer sdk](https://internetcomputer.org/docs/current/home)
- [juno](https://juno.build/) for storing data

```
npm install
dfx start --clean
dfx canister create --all
dfx deploy
npm start
```

- frontend canister id: n7ib3-4qaaa-aaaai-qagnq-cai
- custom domain: cyql.io
