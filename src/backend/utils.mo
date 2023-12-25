import Principal "mo:base/Principal";

module {
  public func isAnon(caller : Principal) : Bool {
    Principal.isAnonymous(caller)
  }
}
