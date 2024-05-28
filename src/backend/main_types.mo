module {

  // pagination

  public type GetProjectsArgs = {
    secret : Secret;

    // filter
    category : Text;
    openSource : ?Bool;
    onChain : ?Bool;

    // sort
    sort : SortOptions;

    // paginate
    page : Nat;
    pageSize : Nat
  };

  public type PaginatedResult = {
    data : [Project];

    // pagination
    selectedPage : Nat;
    itemsPerPage : Nat;
    startIndex : Nat;
    endIndex : Nat;
    totalItems : Nat;
    totalPages : Nat
  };

  public type GetProjectsResult = PaginatedResult and {
    // filter
    category : Text;
    openSource : ?Bool;
    onChain : ?Bool;

    // sort
    sort : SortOptions
  };

  public type SortOptions = {
    #newest_first;
    #oldest_first;
    #most_upvoted;
    #least_upvoted;
    #recently_updated
  };

  // ...

  public type Tokens = { e8s : Nat };
  public type Secret = Text;

  public type ProjectId = Nat;
  public type Project = {
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

    // ...
    // frontendCanisterUrl : Text
  }
}
