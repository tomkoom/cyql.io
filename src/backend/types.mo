import List "mo:base/List";

module {
  public type Tokens = { e8s : Nat };

  // users

  public type UserId = Principal;
  public type User = {
    id : Text
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
    // tokenCanister
    // sns url
    // forum url
  };

  // dao

  public type ProjectProposalId = Nat;
  public type Vote = { #no; #yes };
  public type VoteArgs = { vote : Vote; proposalId : Nat };
  public type Voter = { id : Text; votedAt : Int };
  public type ProposalState = {
    #failed : Text;
    #open;
    #rejected;
    #accepted
  };
  public type ProjectData = Text;

  public type ProjectProposal = {
    id : Nat;
    createdAt : Int;
    updatedAt : ?Int;
    proposer : Text; // principal
    state : ProposalState;

    // votes
    votersYes : Nat;
    votersNo : Nat;
    votesYes : Nat;
    votesNo : Nat;
    // votesYesTokens : Tokens;
    // votesNoTokens : Tokens;
    voters : [Voter];

    // data
    payload : ProjectData
  };

  // dao params

  public type DaoParams = {
    transferFee : Tokens;

    // the amount of tokens needed to vote "yes" to accept, or "no" to reject
    proposalVoteThreshold : Nat;

    // the amount of tokens that will be temporarily deducted from the account of a user that submits a proposal.
    // If the proposal is Accepted, this deposit is returned, otherwise it is lost. This prevents users from submitting superfluous proposals
    proposalSubmissionDeposit : Tokens
  };

}
