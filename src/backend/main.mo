import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Text "mo:base/Text";

// ...
import T "types";
import U "utils";

actor {

  stable var projectsEntries : [(T.ProjectId, T.Project)] = [];
  let projects = HashMap.fromIter<T.ProjectId, T.Project>(projectsEntries.vals(), 10, Nat.equal, Hash.hash);

  stable var usersEntries : [(T.UserId, T.User)] = [];
  let users = HashMap.fromIter<T.UserId, T.User>(usersEntries.vals(), 10, Principal.equal, Principal.hash);

  // projects

  public shared ({ caller }) func addProject(project : T.Project) : async ?T.ProjectId {
    let projectId = projects.size();
    projects.put(projectId, { project with id = projectId });
    ?projectId
  };

  public shared ({ caller }) func editProject(projectId : T.ProjectId, project : T.Project) : async ?T.ProjectId {
    projects.put(projectId, project);
    ?projectId
  };

  public query func listProjects() : async [T.Project] {
    let iter : Iter.Iter<T.Project> = projects.vals();
    return Iter.toArray<T.Project>(iter)
  };

  public query func listProjectsPaginated() : async [T.Project] {
    let iter : Iter.Iter<T.Project> = projects.vals();
    let arr = Iter.toArray(iter);
    let reversed = Array.reverse(arr);
    return Iter.toArray<T.Project>(iter)
  };

  // project actions

  public shared ({ caller }) func updateUpvote(projectId : T.ProjectId) : async ?T.ProjectId {
    // add assert upvoter is user
    assert (not U.isAnon(caller));

    let userId = Principal.toText(caller);
    let ?p = projects.get(projectId) else return null;
    let upvotedByBuf = Buffer.fromArray<Text>(p.upvotedBy);
    let isAlreadyUpvoted = Buffer.contains<Text>(upvotedByBuf, userId, Text.equal);

    if (not isAlreadyUpvoted) {
      upvotedByBuf.add(userId)
    } else {
      let ?idx = Buffer.indexOf<Text>(userId, upvotedByBuf, Text.equal) else return null;
      let removed = upvotedByBuf.remove(idx)
    };

    projects.put(projectId, { p with upvotedBy = Buffer.toArray(upvotedByBuf) });
    return ?projectId
  };

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
    projectsEntries := Iter.toArray(projects.entries());
    usersEntries := Iter.toArray(users.entries())
  };

  system func postupgrade() {
    projectsEntries := [];
    usersEntries := []
  }
}
