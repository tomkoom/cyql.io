import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Array "mo:base/Array";
import Text "mo:base/Text";

// ...
import T "types";
import U "utils";

actor {

  stable var usersEntries : [(T.UserId, T.User)] = [];
  let users = HashMap.fromIter<T.UserId, T.User>(usersEntries.vals(), 10, Principal.equal, Principal.hash);

  // users

  public shared ({ caller }) func registerUser() : async ?Text {
    if (U.isAnon(caller)) return null;

    switch (users.get(caller)) {
      case (?u) return null;
      case null {
        users.put(caller, { id = Principal.toText(caller) });
        ?Principal.toText(caller)
      }
    }
  };

  // test

  public shared query ({ caller }) func whoami() : async Text {
    return Principal.toText(caller)
  };

  // stable

  system func preupgrade() {
    usersEntries := Iter.toArray(users.entries())
  };

  system func postupgrade() {
    usersEntries := []
  }
}
