import Principal "mo:base/Principal";
import C "_constants";
import T "types";

module {

  public let daoParamsInitial : T.DaoParams = {
    transferFee = { e8s = 0 };

    // the amount of tokens needed to vote "yes" to accept, or "no" to reject
    proposalVoteThreshold = 50;

    // the amount of tokens that will be temporarily deducted from the account of
    // a user that submits a proposal. If the proposal is Accepted, this deposit is returned,
    // otherwise it is lost. This prevents users from submitting superfluous proposals.
    proposalSubmissionDeposit = { e8s = 0 }
  };

  public func generateProposal(caller : Principal) : () {};

  public func isAnon(caller : Principal) : Bool {
    return Principal.isAnonymous(caller)
  };

  public func isMain(caller : Principal) : Bool {
    return caller == Principal.fromText(C.mainCanisterId)
  };

  public func isAdmin(caller : Principal) : Bool {
    return caller == Principal.fromText(C.admin)
  }
}
