import Principal "mo:base/Principal";
import C "_constants";

module {

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
