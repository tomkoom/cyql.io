import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";

// ...
import T "./types";
import U "./utils";

actor {

  // maps

  stable var usersEntries : [(T.UserId, T.User)] = [];
  let users = HashMap.fromIter<T.UserId, T.User>(usersEntries.vals(), 10, Principal.equal, Principal.hash);

  // -- manage --

  public shared ({ caller }) func registerUser(userId : T.UserId) : async ?Text {
    assert (not U.isAnon(caller));
    assert (U.isMain(caller));

    switch (users.get(userId)) {
      case (?u) return null;
      case null {
        let user = {
          id = Principal.toText(userId);
          registeredAt = Time.now();
          votedTimes = 0;
          totalVotingPowerApplied = 0
        };
        users.put(userId, user);
        return ?user.id
      }
    }
  };

  public func getUser(userId : T.UserId) : async ?T.User {
    return users.get(userId)
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
