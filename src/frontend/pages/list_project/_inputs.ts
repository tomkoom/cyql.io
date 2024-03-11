export type Input = {
  id: string
  label: string
  placeholder: string
  required: boolean
}

export const primary: Input[] = [
  { id: "name", label: "Project / dApp name", placeholder: "...", required: true },
  {
    id: "description",
    label: "Description [up to 140 symbols]",
    placeholder: "...",
    required: true,
  },
  { id: "domain", label: "Domain", placeholder: "app.io", required: false },
  {
    id: "frontendCanisterId",
    label: "Frontend canister id",
    placeholder: "n7ib3-4qaaa-aaaai-qagnq-cai",
    required: false,
  },
  {
    id: "backendCanisterId",
    label: "Backend canister id",
    placeholder: "nrkmt-haaaa-aaaai-qagmq-cai",
    required: false,
  },
]

export const token: Input[] = [
  {
    id: "tokenLedgerId",
    label: "Token ledger id",
    placeholder: "ryjl3-tyaaa-aaaaa-aaaba-cai",
    required: false,
  },
]

export const web2Links: Input[] = [
  { id: "x", label: "X/Twitter", placeholder: "twitter.com/app", required: false },
  { id: "discord", label: "Discord", placeholder: "...", required: false },
  { id: "telegram", label: "telegram", placeholder: "t.me/app", required: false },
  { id: "github", label: "GitHub", placeholder: "github.com/app", required: false },
]

export const web3Links: Input[] = [
  { id: "taggr", label: "#TAGGR", placeholder: "...", required: false },
  { id: "openchat", label: "OpenChat", placeholder: "...", required: false },
  { id: "dscvr", label: "DSCVR", placeholder: "...", required: false },
  { id: "funded", label: "Funded", placeholder: "...", required: false },
]

export const extra: Input[] = [
  {
    id: "dfinityForumShowcase",
    label: "DFINITY forum [showcase] url",
    placeholder: "...",
    required: false,
  },
  {
    id: "nnsProjectUrl",
    label: "NNS project url",
    placeholder: "nns.ic0.app/project/?project=...",
    required: false,
  },
]

export const extra2: Input[] = [
  { id: "docs", label: "Docs", placeholder: "docs.app.io", required: false },
  { id: "whitepaper", label: "Whitepaper", placeholder: "app.io/whitepaper", required: false },
]

// ...

export const inputs = {
  primary,
  token,
  web2Links,
  web3Links,
  extra,
  extra2,
}
