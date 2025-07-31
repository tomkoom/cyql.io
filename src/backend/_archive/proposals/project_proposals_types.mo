import Principal "mo:base/Principal";

module {
  public type Tokens = { amount_e8s : Nat };
  public type ProposalId = Nat;
  public type Vote = { #no; #yes };
  public type VoteArgs = { vote : Vote; proposalId : Nat };
  public type Voter = { id : Text; votedAt : Int };

  public type ProposalState = {
    #failed : Text;
    #open;
    #rejected;
    #accepted
  };
  public type Payload = Text; // project metadata
  public type Upvote = { upvoter : Principal; timestamp : Int };

  public type Proposal = {
    id : ProposalId;
    createdAt : Int;
    updatedAt : ?Int;
    proposer : Text; // principal
    state : ProposalState;
    upvotes : [Upvote];

    // votes
    votersYes : Nat;
    votersNo : Nat;
    votesYes : Nat;
    votesNo : Nat;
    // votesYesTokens : Tokens;
    // votesNoTokens : Tokens;
    voters : [Voter];

    // data
    payload : Payload
  };

  public type SystemParams = {
    transferFee : Tokens;

    // the amount of tokens needed to vote "yes" to accept, or "no" to reject
    proposalVoteThreshold : Nat;

    // the amount of tokens that will be temporarily deducted from the account of a user that submits a proposal.
    // If the proposal is Accepted, this deposit is returned, otherwise it is lost. This prevents users from submitting superfluous proposals
    proposalSubmissionDeposit : Tokens
  };

  public type DaoStableStorage = {
    // accounts : [Principal];
    // proposals : [Proposal];
    systemParams : SystemParams
  };

}
