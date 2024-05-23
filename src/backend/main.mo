import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";

// ...
import T "./types";
import U "./utils";
import C "./_constants";

shared actor class _CURATED_PROJECTS() = Self {

  let adminPrincipal = Principal.fromText(C.adminId);
  let frontendAdmin1Principal = Principal.fromText(C.frontendAdminId1);
  let frontendAdmin2Principal = Principal.fromText(C.frontendAdminId2);
  stable var secret : T.Secret = "";

  // maps

  // curated projects v1
  stable var projectsEntries : [(T.ProjectId, T.Project)] = [];
  let projects = HashMap.fromIter<T.ProjectId, T.Project>(projectsEntries.vals(), 10, Nat.equal, Hash.hash);

  // curated projects v2
  stable var curatedProjectsV2Entries : [(T.ProjectId, T.ProjectV2)] = [];
  let curatedProjectsV2 = HashMap.fromIter<T.ProjectId, T.ProjectV2>(curatedProjectsV2Entries.vals(), 100, Nat.equal, Hash.hash);

  // ...
  // curated projects v1

  public shared ({ caller }) func addProject(project : T.Project) : async ?T.ProjectId {
    // verify caller
    assert U.isAdmin(caller);
    let projectId = projects.size();
    projects.put(projectId, { project with id = projectId });
    ?projectId
  };

  public shared ({ caller }) func editProject(projectId : T.ProjectId, project : T.Project) : async ?T.ProjectId {
    // verify caller
    assert U.isAdmin(caller);
    projects.put(projectId, project);
    return ?projectId
  };

  public shared ({ caller }) func deleteProject(projectId : T.ProjectId) : async ?T.ProjectId {
    assert U.isAdmin(caller);
    projects.delete(projectId);
    return ?projectId
  };

  public query func listProjects() : async [T.Project] {
    let iter : Iter.Iter<T.Project> = projects.vals();
    return Iter.toArray<T.Project>(iter)
  };

  public shared ({ caller }) func updateUpvote(projectId : T.ProjectId) : async ?T.ProjectId {
    // verify caller
    assert (not U.isAnon(caller));

    let userId = Principal.toText(caller);
    let ?p = projects.get(projectId) else return null;
    let upvotedByBuf = Buffer.fromArray<Text>(p.upvotedBy);
    let isAlreadyUpvoted = Buffer.contains<Text>(upvotedByBuf, userId, Text.equal);

    if (not isAlreadyUpvoted) {
      upvotedByBuf.add(userId)
    } else {
      let ?idx = Buffer.indexOf<Text>(userId, upvotedByBuf, Text.equal) else return null;
      let _removed = upvotedByBuf.remove(idx)
    };

    projects.put(projectId, { p with upvotedBy = Buffer.toArray(upvotedByBuf) });
    return ?projectId
  };

  // ...
  // curated projects v2

  public shared ({ caller }) func addProjectV2(project : T.ProjectV2) : async ?T.ProjectId {
    assert (caller == frontendAdmin1Principal or caller == frontendAdmin2Principal);
    let projectId = Int.abs(Time.now());
    curatedProjectsV2.put(projectId, { project with id = projectId });
    return ?projectId
  };

  public shared ({ caller }) func editProjectV2(projectId : T.ProjectId, project : T.ProjectV2) : async ?T.ProjectId {
    assert (caller == frontendAdmin1Principal or caller == frontendAdmin2Principal);
    curatedProjectsV2.put(projectId, project);
    return ?projectId
  };

  public shared ({ caller }) func removeProjectV2(projectId : T.ProjectId) : async ?T.ProjectV2 {
    assert U.isAdmin(caller);
    let removed = curatedProjectsV2.remove(projectId);
    return removed
  };

  public shared ({ caller }) func deleteAllProjectsV2() : async () {
    assert U.isAdmin(caller);
    for (p in curatedProjectsV2.vals()) {
      curatedProjectsV2.delete(p.id)
    }
  };

  public shared ({ caller }) func getProjectV2(projectId : T.ProjectId) : async ?T.ProjectV2 {
    assert U.isAdmin(caller);
    return curatedProjectsV2.get(projectId)
  };

  public shared ({ caller }) func getAllProjectsNumV2() : async Nat {
    assert U.isAdmin(caller);
    return curatedProjectsV2.size()
  };

  public query func listProjectsV2() : async [T.ProjectV2] {
    let iter : Iter.Iter<T.ProjectV2> = curatedProjectsV2.vals();
    return Iter.toArray<T.ProjectV2>(iter)
  };

  public shared ({ caller }) func updateUpvoteV2(projectId : T.ProjectId) : async ?T.ProjectId {
    // verify caller
    assert (not Principal.isAnonymous(caller));

    let userId = Principal.toText(caller);
    let ?p = curatedProjectsV2.get(projectId) else return null;
    let upvotedByBuf = Buffer.fromArray<Text>(p.upvotedBy);
    let isAlreadyUpvoted = Buffer.contains<Text>(upvotedByBuf, userId, Text.equal);

    if (not isAlreadyUpvoted) {
      upvotedByBuf.add(userId)
    } else {
      let ?idx = Buffer.indexOf<Text>(userId, upvotedByBuf, Text.equal) else return null;
      let _removed = upvotedByBuf.remove(idx)
    };

    curatedProjectsV2.put(projectId, { p with upvotedBy = Buffer.toArray(upvotedByBuf) });
    return ?projectId
  };

  // admin

  public shared query ({ caller }) func showSecret() : async Text {
    assert (caller == adminPrincipal);
    return secret
  };

  public shared ({ caller }) func updateSecret(newSecret : T.Secret) : async Text {
    assert (caller == adminPrincipal);
    secret := newSecret;
    return "ok"
  };

  // test

  public shared query ({ caller }) func whoami() : async Text {
    return Principal.toText(caller)
  };

  // stable

  system func preupgrade() {
    projectsEntries := Iter.toArray(projects.entries());
    curatedProjectsV2Entries := Iter.toArray(curatedProjectsV2.entries())
  };

  system func postupgrade() {
    projectsEntries := [];
    curatedProjectsV2Entries := []
  }
}
