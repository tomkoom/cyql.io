import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";

// ...
import UT "./users_types";
import U "../utils";

actor {

  // maps

  stable var usersEntries : [(UT.UserId, UT.User)] = [];
  let users = HashMap.fromIter<UT.UserId, UT.User>(usersEntries.vals(), 10, Principal.equal, Principal.hash);

  // -- manage --

  public shared ({ caller }) func registerUser(userId : UT.UserId) : async ?Text {
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

  public func getUser(userId : UT.UserId) : async ?UT.User {
    return users.get(userId)
  };

  public shared query ({ caller }) func listUsers() : async [UT.User] {
    assert (U.isAdmin(caller));
    let iter : Iter.Iter<UT.User> = users.vals();
    return Iter.toArray<UT.User>(iter)
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
