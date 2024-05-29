import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Array "mo:base/Array";

// ...
import T "./main_types";
import Constants "./_constants";
import Utils "./utils";
import Handle "./utils/handleProjects";

shared actor class _CURATED_PROJECTS() = Self {

  let adminPrincipal = Principal.fromText(Constants.adminId);
  let nodeAdminPrincipal = Principal.fromText(Constants.nodeAdminId);
  let frontendAdmin1Principal = Principal.fromText(Constants.frontendAdminId1);
  let frontendAdmin2Principal = Principal.fromText(Constants.frontendAdminId2);
  stable var secret : T.Secret = "";

  // maps

  // curated projects
  stable var projectsEntries : [(T.ProjectId, T.Project)] = [];
  let projects = HashMap.fromIter<T.ProjectId, T.Project>(projectsEntries.vals(), 100, Nat.equal, Hash.hash);

  // ...

  public shared ({ caller }) func addProjectNode(project : T.Project) : async ?T.ProjectId {
    assert (caller == nodeAdminPrincipal);
    projects.put(project.id, project);
    return ?project.id
  };

  public shared ({ caller }) func addProject(project : T.Project) : async ?T.ProjectId {
    assert (caller == frontendAdmin1Principal or caller == frontendAdmin2Principal);
    let projectId = Int.abs(Time.now());
    projects.put(projectId, { project with id = projectId });
    return ?projectId
  };

  public shared ({ caller }) func editProject(projectId : T.ProjectId, project : T.Project) : async ?T.ProjectId {
    assert (caller == frontendAdmin1Principal or caller == frontendAdmin2Principal);
    projects.put(projectId, project);
    return ?projectId
  };

  public shared ({ caller }) func removeProject(projectId : T.ProjectId) : async ?T.Project {
    assert Utils.isAdmin(caller);
    let removed = projects.remove(projectId);
    return removed
  };

  // query

  public query func listProjects(feSecret : T.Secret) : async [T.Project] {
    assert (secret == feSecret);
    let iter : Iter.Iter<T.Project> = projects.vals();
    return Iter.toArray<T.Project>(iter)
  };

  public query func getActiveProjectsNum(feSecret : T.Secret) : async Nat {
    assert (secret == feSecret);
    let activeProjects = _getActiveProjects();
    return activeProjects.size()
  };

  public query func getProjectById(feSecret : T.Secret, id : T.ProjectId) : async ?T.Project {
    assert (secret == feSecret);
    return projects.get(id)
  };

  // ...

  public shared ({ caller }) func updateUpvote(feSecret : T.Secret, projectId : T.ProjectId) : async Text {

    // verify
    assert (not Principal.isAnonymous(caller));
    if (secret != feSecret) {
      return "Wrong secret."
    };

    let userId = Principal.toText(caller);
    let ?p = projects.get(projectId) else return "Project not found.";
    let upvotedByBuf = Buffer.fromArray<Text>(p.upvotedBy);
    let isAlreadyUpvoted = Buffer.contains<Text>(upvotedByBuf, userId, Text.equal);

    if (not isAlreadyUpvoted) {
      upvotedByBuf.add(userId)
    } else {
      let ?idx = Buffer.indexOf<Text>(userId, upvotedByBuf, Text.equal) else return "User idx not found.";
      let _removed = upvotedByBuf.remove(idx)
    };

    projects.put(projectId, { p with upvotedBy = Buffer.toArray(upvotedByBuf) });
    return Nat.toText(projectId)
  };

  // filter, sort, paginate

  public query func getProjects(args : T.GetProjectsArgs) : async ?T.GetProjectsResult {
    assert (secret == args.secret);
    let { q; category; openSource; onChain; sort; selectedPage; itemsPerPage } = args;

    // get projectsV1
    let activeProjects = _getActiveProjects();

    // filter, sort, paginate
    let filteredByCategory = Handle.filterByCategory(activeProjects, category);
    let filteredByOpenSource = Handle.filterByOpenSource(filteredByCategory, openSource);
    let filteredByOnchain = Handle.filterByOnchain(filteredByOpenSource, onChain);
    let sorted = Handle.sort(filteredByOnchain, sort);
    let ?paginated = Handle.paginate(sorted, selectedPage, itemsPerPage) else return null;

    let res : T.GetProjectsResult = {
      paginated with
      q;
      category;
      openSource;
      onChain;
      sort
    };
    return ?res
  };

  // homepage

  public query func getNewProjects(feSecret : T.Secret, length : T.Length) : async [T.Project] {
    assert (secret == feSecret);
    let activeProjects = _getActiveProjects();
    let sorted = Handle.sort(activeProjects, #newest_first);
    let sliced = Array.slice(sorted, 0, length);
    return Iter.toArray<T.Project>(sliced)
  };

  public query func getHighlightedProjects(feSecret : T.Secret, category : T.Category, length : T.Length) : async [T.Project] {
    assert (secret == feSecret);
    let activeProjects = _getActiveProjects();
    let filteredByCategory = Handle.filterByCategory(activeProjects, category);
    let sorted = Handle.sort(filteredByCategory, #newest_first);
    let sliced = Array.slice(sorted, 0, length);
    return Iter.toArray<T.Project>(sliced)
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

  public shared query ({ caller }) func getAllProjectsNumAdmin() : async Nat {
    assert Utils.isAdmin(caller);
    return projects.size()
  };

  // utils

  private func _getActiveProjects() : [T.Project] {
    let iter : Iter.Iter<T.Project> = projects.vals();
    let allProjects = Iter.toArray<T.Project>(iter);
    let activeProjects = Array.filter<T.Project>(allProjects, func(p) { p.archived == false });
    return activeProjects
  };

  // test

  public shared query ({ caller }) func whoami() : async Text {
    return Principal.toText(caller)
  };

  // stable

  system func preupgrade() {
    projectsEntries := Iter.toArray(projects.entries())
  };

  system func postupgrade() {
    projectsEntries := []
  }
}
