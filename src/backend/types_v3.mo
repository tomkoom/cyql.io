import Category "./categories";

module {

  public type ICP_ProjectId = Text;
  public type ChainId = Text;

  public type UserId = Text; // principal text
  public type UserV2 = {
    id : UserId;
    name : Text
  };

  // Resource link structure for project-related external content
  public type ResourceLink = {
    title : Text; // display name for the link (e.g., "Dfinity Forum Post", "CoinDesk Article")
    url : Text; // the actual URL
    description : Text; // optional description or summary of the content
    category : Text; // "news" | "tutorial" | "review" | "partnership" | "other"
  };

  public type ETH_Project = {
    id : Text;
    chainId : ChainId;
    name : Text;
    description : Text;
    category : [Category.CategoryId];
    tags : [Text];
    website : Text;
    logoUrl : Text;
    twitter : Text;
    discord : Text
  };

  // Unified Project Management System
  // This type handles both user-submitted projects (for review) and admin-curated projects (public display)
  // Status workflow: submitted -> approved/rejected -> curated (if approved)
  // Use listingStatus and isCurated fields to distinguish project states
  public type ICP_ProjectV3 = {
    id : ICP_ProjectId;
    chainId : ChainId;
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

    // relevant content links - external links to project-related content
    // Array-based structure for managing multiple resources with metadata
    newsLinks : [ResourceLink]; // news articles, announcements, or major updates
    resourceLinks : [ResourceLink]; // other relevant resources (tutorials, reviews, partnerships, etc.)

    // engagement metrics (counts derived from arrays for consistency)
    upvotedBy : [UserId];
    watchedBy : [UserId];

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
    featuredBy : Text;
    featuredAt : Text;

    // verification
    isVerified : Bool;
    verifiedBy : Text;
    verifiedAt : Text;

    // meta
    isActive : Bool;
    status : Text;
    listedBy : Text;
    createdAt : Text;
    updatedAt : Text;

    // unified listing/curation management
    listingStatus : Text; // "submitted" | "approved" | "rejected" | "draft"
    isCurated : Bool; // true when admin-approved for public display
    isUserSubmitted : Bool; // true when submitted by user (vs admin-created)
    reviewedBy : Text; // admin who reviewed the project
    reviewedAt : Text; // when the project was reviewed
    approvedAt : Text; // when the project was approved (if applicable)
    rejectionReason : Text; // reason for rejection (if applicable)
    submissionNotes : Text // user notes when submitting project
  }
}
