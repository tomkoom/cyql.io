import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";

// ...
import T "./users_types";
import U "../utils";

actor {

  // maps

  stable var usersEntries : [(T.UserId, T.User)] = [];
  let users = HashMap.fromIter<T.UserId, T.User>(usersEntries.vals(), 10, Principal.equal, Principal.hash);

  stable var usersNewEntries : [(T.UserIdNew, T.UserNew)] = [];
  let usersNew = HashMap.fromIter<T.UserIdNew, T.UserNew>(usersNewEntries.vals(), 10, Text.equal, Text.hash);

  // -- manage --

  public shared ({ caller }) func registerUser() : async ?Text {
    assert (not U.isAnon(caller));

    switch (users.get(caller)) {
      case (?u) return null;
      case null {
        let user = {
          id = Principal.toText(caller);
          registeredAt = Time.now();
          votedTimes = 0;
          totalVotingPowerApplied = 0
        };
        users.put(caller, user);
        return ?user.id
      }
    }
  };

  public query func getUser(userId : T.UserId) : async ?T.User {
    return users.get(userId)
  };

  // new

  public shared ({ caller }) func registerUserNew() : async ?Text {
    assert (not U.isAnon(caller));
    let userId = Principal.toText(caller);

    switch (usersNew.get(userId)) {
      case (?u) return null;
      case null {
        usersNew.put(
          userId,
          {
            id = userId;
            registeredAt = Time.now()
          },
        );
        return ?userId
      }
    }
  };

  public query func getUserNew(userId : T.UserIdNew) : async ?T.UserNew {
    return usersNew.get(userId)
  };

  // query

  public shared query ({ caller }) func listUsers() : async [T.UserNew] {
    assert (U.isAdmin(caller));
    let iter : Iter.Iter<T.UserNew> = usersNew.vals();
    return Iter.toArray<T.UserNew>(iter)
  };

  // test

  public shared query ({ caller }) func whoami() : async Text {
    return Principal.toText(caller)
  };

  // stable

  system func preupgrade() {
    usersEntries := Iter.toArray(users.entries());
    usersNewEntries := Iter.toArray(usersNew.entries())
  };

  system func postupgrade() {
    usersEntries := [];
    usersNewEntries := []
  }
}
