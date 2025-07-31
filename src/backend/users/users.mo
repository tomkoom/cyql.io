import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Order "mo:base/Order";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";

import Types "../types";
import Users_Types "./users_types";
import Utils "../utils";
import Constants "../constants";

persistent actor {

  private var secret : Types.ApiKey = "";
  transient let adminPrincipal = Principal.fromText(Constants.admin1);

  // maps

  var usersEntries : [(Users_Types.UserId, Users_Types.User)] = [];
  transient let users = HashMap.fromIter<Users_Types.UserId, Users_Types.User>(usersEntries.vals(), 10, Principal.equal, Principal.hash);

  var usersNewEntries : [(Users_Types.UserIdNew, Users_Types.UserNew)] = [];
  transient let usersNew = HashMap.fromIter<Users_Types.UserIdNew, Users_Types.UserNew>(usersNewEntries.vals(), 10, Text.equal, Text.hash);

  // -- manage --

  public shared ({ caller }) func register(apiKey : Types.ApiKey) : async ?Text {
    assert (not Utils.isAnon(caller));
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

  public query func getById(apiKey : Types.ApiKey, userId : Users_Types.UserIdNew) : async ?Users_Types.UserNew {
    assert (secret == apiKey);
    return usersNew.get(userId)
  };

  // query

  public query func listUsers(apiKey : Types.ApiKey) : async [Users_Types.UserNew] {
    assert (secret == apiKey);
    let iter : Iter.Iter<Users_Types.UserNew> = usersNew.vals();
    let usersArray = Iter.toArray<Users_Types.UserNew>(iter);

    // Sort by registeredAt descending (newest first)
    Array.sort<Users_Types.UserNew>(
      usersArray,
      func(a : Users_Types.UserNew, b : Users_Types.UserNew) : Order.Order {
        Int.compare(b.registeredAt, a.registeredAt)
      },
    )
  };

  // admin

  public shared query ({ caller }) func showApiKey() : async Text {
    assert (caller == adminPrincipal);
    return secret
  };

  public shared ({ caller }) func updateApiKey(newApiKey : Types.ApiKey) : async Text {
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
