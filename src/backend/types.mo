module {
  public type Tokens = { e8s : Nat };

  // users

  public type UserId = Principal;
  public type User = {
    id : Text;
    // totalVotes : Nat;
    // totalVotingPower : Nat
  };

  // curated projects

  public type ProjectId = Nat;
  public type Project = {
    id : Nat;
    // id : Text;
    submittedBy : Text;
    createdAt : Text;
    updatedAt : Text;
    name : Text;
    description : Text;
    category : [Text];
    logo : Text;
    website : Text;
    canister : Text;
    twitter : Text;
    discord : Text;
    telegram : Text;
    github : Text;
    medium : Text;
    dscvr : Text;
    distrikt : Text;
    openchat : Text;
    taggr : Text;
    seers : Text;
    nuance : Text;
    catalyze : Text;
    funded : Text;
    app : Text;
    docs : Text;
    faq : Text;
    whitepaper : Text;
    grantee : Bool;
    archived : Bool;
    nftSaleDate : Text;
    nftSaleUrl : Text;
    nftUnits : Text;
    nftUnitPrice : Text;
    nftMarketEntrepot : Text;
    nftMarketCcc : Text;
    nftMarketYumi : Text;
    nftRarityDgdg : Text;
    nftStatsNftgeek : Text;
    nftImg1 : Text;
    nftImg2 : Text;
    nftImg3 : Text;
    nftImg4 : Text;
    upvotedBy : [Text]

    // to add:
    // frontend canister
    // backend canister
    // sns url
    // forum url

    // token
    // tokenCanister
  };

  public type Project2 = {
    // main
    id : Nat;
    name : Text;
    description : Text;
    category : [Text];
    website : Text;

    // logo
    logoUrl : Text;
    logoDataUrl : Text;

    // links web2
    twitter : Text;
    discord : Text;
    telegram : Text;
    github : Text;
    medium : Text;

    // links web3
    dscvr : Text;
    distrikt : Text;
    openchat : Text;
    taggr : Text;
    seers : Text;
    nuance : Text;
    catalyze : Text;
    funded : Text;

    // nft
    nftSaleDate : Text;
    nftSaleUrl : Text;
    nftUnits : Text;
    nftUnitPrice : Text;
    nftMarketEntrepot : Text;
    nftMarketCcc : Text;
    nftMarketYumi : Text;
    nftRarityDgdg : Text;
    nftStatsNftgeek : Text;
    nftImg1 : Text;
    nftImg2 : Text;
    nftImg3 : Text;
    nftImg4 : Text;

    // ...
    app : Text;
    docs : Text;
    faq : Text;
    whitepaper : Text;

    // canisters
    canister : Text;
    frontendCanisterId : Text;
    backendCanisterId : Text;

    // ...
    dfinityForumShowcase : Text;
    nnsLaunchpadUrl : Text;

    // token
    tokenCanisterId : Text;
    tokenStandard : Text;

    // meta
    archived : Bool;
    createdAt : Text;
    updatedAt : Text;
    submittedBy : Text;
    upvotedBy : [Text]
  };

}
