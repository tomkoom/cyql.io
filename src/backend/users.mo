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
import C "_constants";

actor {

  stable var usersEntries : [(T.UserId, T.User)] = [];
  let users = HashMap.fromIter<T.UserId, T.User>(usersEntries.vals(), 10, Principal.equal, Principal.hash);

  // users

  public shared ({ caller }) func registerUser(userId : T.UserId) : async ?Text {
    assert (not U.isAnon(caller));
    assert (U.isMain(caller));

    switch (users.get(userId)) {
      case (?u) return null;
      case null {
        let id = Principal.toText(userId);
        users.put(userId, { id });
        return ?id
      }
    }
  };

  private shared ({ caller }) func getUser(userId : T.UserId) : async ?T.User {
    assert (not U.isAnon(caller));
    assert (U.isMain(caller));
    return users.get(userId)
  };

  public shared query ({ caller }) func usersNum() : async Nat {
    assert (not U.isAnon(caller));
    return users.size()
  };

  public shared query ({ caller }) func listUsers() : async [T.User] {
    assert (U.isAdmin(caller));
    let iter : Iter.Iter<T.User> = users.vals();
    return Iter.toArray<T.User>(iter)
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
