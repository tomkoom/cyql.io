// import Principal "mo:base/Principal";
// import Buffer "mo:base/Buffer";

module {
  public type Tokens = { amount_e8s : Nat };
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
  public type Payload = Text;

  public type Proposal = {
    id : ProjectProposalId;
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
