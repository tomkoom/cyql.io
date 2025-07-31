import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";

import T "../types";
import UT "./users_types";
import U "../utils";
import Constants "../constants";

persistent actor {

  private stable var secret : T.ApiKey = "";
  transient let adminPrincipal = Principal.fromText(Constants.admin1);

  // maps

  stable var usersEntries : [(UT.UserId, UT.User)] = [];
  transient let users = HashMap.fromIter<UT.UserId, UT.User>(usersEntries.vals(), 10, Principal.equal, Principal.hash);

  stable var usersNewEntries : [(UT.UserIdNew, UT.UserNew)] = [];
  transient let usersNew = HashMap.fromIter<UT.UserIdNew, UT.UserNew>(usersNewEntries.vals(), 10, Text.equal, Text.hash);

  // -- manage --

  public shared ({ caller }) func register(apiKey : T.ApiKey) : async ?Text {
    assert (not U.isAnon(caller));
    assert (secret == apiKey);

    let userId = Principal.toText(caller);

    switch (usersNew.get(userId)) {
      case (?_u) return null;
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

  public query func getById(apiKey : T.ApiKey, userId : UT.UserIdNew) : async ?UT.UserNew {
    assert (secret == apiKey);
    return usersNew.get(userId)
  };

  // query

  public query func listUsers(apiKey : T.ApiKey) : async [UT.UserNew] {
    assert (secret == apiKey);
    let iter : Iter.Iter<UT.UserNew> = usersNew.vals();
    return Iter.toArray<UT.UserNew>(iter)
  };

  // admin

  public shared query ({ caller }) func showApiKey() : async Text {
    assert (caller == adminPrincipal);
    return secret
  };

  public shared ({ caller }) func updateApiKey(newApiKey : T.ApiKey) : async Text {
    assert (caller == adminPrincipal);
    secret := newApiKey;
    return "ok"
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
