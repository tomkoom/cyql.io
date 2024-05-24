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
import T "./main_types";
import T_ARCHIVE "./types";
import U "./utils";
import C "./_constants";

shared actor class _CURATED_PROJECTS() = Self {

  let adminPrincipal = Principal.fromText(C.adminId);
  let frontendAdmin1Principal = Principal.fromText(C.frontendAdminId1);
  let frontendAdmin2Principal = Principal.fromText(C.frontendAdminId2);
  stable var secret : T.Secret = "";

  // maps

  // curated projects v1
  stable var projectsEntries : [(T_ARCHIVE.ProjectId, T_ARCHIVE.Project)] = [];
  let projects = HashMap.fromIter<T_ARCHIVE.ProjectId, T_ARCHIVE.Project>(projectsEntries.vals(), 10, Nat.equal, Hash.hash);

  // curated projects v2
  stable var curatedProjectsV2Entries : [(T.ProjectId, T.Project)] = [];
  let curatedProjectsV2 = HashMap.fromIter<T.ProjectId, T.Project>(curatedProjectsV2Entries.vals(), 100, Nat.equal, Hash.hash);

  // ...
  // curated projects v2

  public shared ({ caller }) func addProjectV2(project : T.Project) : async ?T.ProjectId {
    assert (caller == frontendAdmin1Principal or caller == frontendAdmin2Principal);
    let projectId = Int.abs(Time.now());
    curatedProjectsV2.put(projectId, { project with id = projectId });
    return ?projectId
  };

  public shared ({ caller }) func editProjectV2(projectId : T.ProjectId, project : T.Project) : async ?T.ProjectId {
    assert (caller == frontendAdmin1Principal or caller == frontendAdmin2Principal);
    curatedProjectsV2.put(projectId, project);
    return ?projectId
  };

  public shared ({ caller }) func removeProjectV2(projectId : T.ProjectId) : async ?T.Project {
    assert U.isAdmin(caller);
    let removed = curatedProjectsV2.remove(projectId);
    return removed
  };

  public shared ({ caller }) func getProjectV2(projectId : T.ProjectId) : async ?T.Project {
    assert U.isAdmin(caller);
    return curatedProjectsV2.get(projectId)
  };

  public shared ({ caller }) func getAllProjectsNumV2() : async Nat {
    assert U.isAdmin(caller);
    return curatedProjectsV2.size()
  };

  // query

  public query func listProjectsV2(feSecret : T.Secret) : async [T.Project] {
    assert (secret == feSecret);

    let iter : Iter.Iter<T.Project> = curatedProjectsV2.vals();
    return Iter.toArray<T.Project>(iter)
  };

  public shared ({ caller }) func updateUpvoteV2(feSecret : T.Secret, projectId : T.ProjectId) : async Text {

    // verify
    assert (not Principal.isAnonymous(caller));
    if (secret != feSecret) {
      return "Wrong secret."
    };

    let userId = Principal.toText(caller);
    let ?p = curatedProjectsV2.get(projectId) else return "Project not found.";
    let upvotedByBuf = Buffer.fromArray<Text>(p.upvotedBy);
    let isAlreadyUpvoted = Buffer.contains<Text>(upvotedByBuf, userId, Text.equal);

    if (not isAlreadyUpvoted) {
      upvotedByBuf.add(userId)
    } else {
      let ?idx = Buffer.indexOf<Text>(userId, upvotedByBuf, Text.equal) else return "User idx not found.";
      let _removed = upvotedByBuf.remove(idx)
    };

    curatedProjectsV2.put(projectId, { p with upvotedBy = Buffer.toArray(upvotedByBuf) });
    return Nat.toText(projectId)
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
