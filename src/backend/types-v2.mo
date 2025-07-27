import Category "./categories";

module {

  public type UserId = Text;

  public type UserV2 = {
    id : UserId; // principal
    name : Text
  };

  public type ProjectV2 = {
    id : Text;
    name : Text;
    description : Text;
    category : [Category.CategoryId];
    tags : [Text];
    website : Text;
    logoUrl : Text;

    // social links
    twitter : Text;
    discord : Text;
    telegram : Text;
    github : Text;
    medium : Text;

    // ic links
    dscvr : Text;
    distrikt : Text;
    openchat : Text;
    taggr : Text;
    seers : Text;
    nuance : Text;
    catalyze : Text;
    funded : Text;

    // token ledger
    tokenCanisterId : Text;
    tokenStandard : Text;

    // nft ledger
    nftCanisterId : Text;
    nftStandard : Text;

    // canisters
    frontendCanisterId : Text;
    backendCanisterId : Text;

    // links
    dfinityForumShowcase : Text;
    nnsLaunchpadUrl : Text;
    app : Text;
    docs : Text;
    faq : Text;
    whitepaper : Text;

    // engagement metrics
    upvoteCount : Text;
    upvotedBy : [UserId];
    watchCount : Text;
    watchlistedBy : [UserId];

    // promotion
    isPromoted : Bool;
    promotedAt : Text;
    promoteUntil : Text;
    promotedBy : Text;

    // boosting
    isBoosted : Bool;
    boostedAt : Text;
    boostUntil : Text;
    boostedBy : Text;

    // featuring
    isFeatured : Bool;

    // verification
    isVerified : Bool;
    verifiedBy : Text;
    verifiedAt : Text;

    // meta
    isActive : Bool;
    status : Text;
    listedBy : Text;
    createdAt : Text;
    updatedAt : Text
  }
}
