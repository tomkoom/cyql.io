import Principal "mo:base/Principal";
import Constants "../constants";

module AdminAuth {

  public func verifyNodeAdmin(caller : Principal) : Bool {
    caller == Principal.fromText(Constants.nodeAdmin1)
  };

  public func verifyClientAdmin(caller : Principal) : Bool {
    caller == Principal.fromText(Constants.clientAdmin1) or caller == Principal.fromText(Constants.clientAdmin2)
  };

  public func verifyAnyAdmin(caller : Principal) : Bool {
    caller == Principal.fromText(Constants.admin1) or caller == Principal.fromText(Constants.nodeAdmin1) or caller == Principal.fromText(Constants.clientAdmin1) or caller == Principal.fromText(Constants.clientAdmin2)
  };

}
