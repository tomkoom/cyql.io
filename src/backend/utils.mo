import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Nat8 "mo:base/Nat8";
import Blob "mo:base/Blob";
import Int "mo:base/Int";

// ...
import C "_constants";
import T "types";
import Hex "./utils/hex";

module {

  public let daoParamsInitial : T.DaoParams = {
    // rm
    transferFee = { e8s = 0 };

    // the amount of tokens needed to vote "yes" to accept, or "no" to reject
    proposalVoteThreshold = 50;

    // the amount of tokens that will be temporarily deducted from the account of
    // a user that submits a proposal. If the proposal is Accepted, this deposit is returned,
    // otherwise it is lost. This prevents users from submitting superfluous proposals.
    proposalSubmissionDeposit = { e8s = 0 }
  };

  public func generateProposal(proposer : Principal, payload : T.ProjectData) : T.ProjectProposal {
    let proposal = {
      id = Int.abs(Time.now());
      createdAt = Time.now();
      updatedAt = null;
      proposer = Principal.toText(proposer);
      state = #open;

      // votes
      votersYes = 0;
      votersNo = 0;
      votesYes = 0;
      votesNo = 0;
      // votesYesTokens = { e8s = 0 };
      // votesNoTokens = { e8s = 0 };
      voters = [];

      // data
      payload
    };

    return proposal
  };

  public func isAnon(caller : Principal) : Bool {
    return Principal.isAnonymous(caller)
  };

  public func isMain(caller : Principal) : Bool {
    return caller == Principal.fromText(C.mainCanisterId)
  };

  public func isAdmin(caller : Principal) : Bool {
    return caller == Principal.fromText(C.admin)
  };

  // accounts

  public func principalToAccountHex(principal : Principal) : Text {
    let subAccount = null;
    let account = Principal.toLedgerAccount(principal, subAccount);
    return blobToHex(account)
  };

  public func blobToHex(blob : Blob) : Text {
    let arr = Blob.toArray(blob);
    return Hex.toHex(arr)
  };

  public func nat8ArrToHex(arr : [Nat8]) : Text {
    return Hex.toHex(arr)
  };

}
