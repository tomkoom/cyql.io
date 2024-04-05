import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Nat8 "mo:base/Nat8";
import Blob "mo:base/Blob";
import Int "mo:base/Int";

// ...
import C "_constants";
import PPT "./project_proposals/project_proposals_types";
import Hex "./utils/hex";

module {

  public func generateProposal(proposer : Principal, payload : PPT.Payload) : PPT.Proposal {
    let proposal = {
      id = Int.abs(Time.now());
      createdAt = Time.now();
      updatedAt = null;
      proposer = Principal.toText(proposer);
      state = #open;
      upvotes = [];

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
