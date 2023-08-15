# cyql.io

[cyql.io](https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/#/) is a curated gallery of projects built on the [Internet Computer](https://internetcomputer.org/).

- fe canister id: n7ib3-4qaaa-aaaai-qagnq-cai
- be canister id: nrkmt-haaaa-aaaai-qagmq-cai
- live: [n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app](https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/)

### api

See [cyql api docs](https://github.com/tomkoom/cyql-api-docs) to query the data from the site.

- api canister: [htxcx-3iaaa-aaaal-acd2q-cai](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.ic0.app/?id=htxcx-3iaaa-aaaal-acd2q-cai)

### stack

- react.js
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

### custom domain configuration

https://internetcomputer.org/docs/current/developer-docs/production/custom-domain/#custom-domains-on-the-boundary-nodes
