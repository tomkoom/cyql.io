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
import Bool "mo:base/Bool";
import Order "mo:base/Order";

// ...
import T "./main_types";
import Constants "./_constants";
import Category "./_categories";
import Utils "./utils";
import Handle "./utils/handleProjects";

shared actor class _CURATED_PROJECTS() = Self {

  private stable var secret : T.ApiKey = "";
  // private stable var apiKeys : [T.ApiKey] = [];
  let adminPrincipal = Principal.fromText(Constants.adminId);
  let nodeAdminPrincipal = Principal.fromText(Constants.nodeAdminId);
  let frontendAdmin1Principal = Principal.fromText(Constants.frontendAdminId1);
  let frontendAdmin2Principal = Principal.fromText(Constants.frontendAdminId2);

  // ...
  let categories = Category.categories;

  // maps

  // curated projects
  stable var projectsEntries : [(T.ProjectId, T.Project)] = [];
  let projects = HashMap.fromIter<T.ProjectId, T.Project>(projectsEntries.vals(), 100, Nat.equal, Hash.hash);

  // update

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

  public shared ({ caller }) func updateUpvote(apiKey : T.ApiKey, projectId : T.ProjectId) : async Text {

    // verify
    assert (not Principal.isAnonymous(caller));
    if (secret != apiKey) {
      return "Wrong secret."
    };

    let userId = Principal.toText(caller);
    let ?p = projects.get(projectId) else return "Project not found.";
    let upvotedByBuf = Buffer.fromArray<Text>(p.upvotedBy);
    let isAlreadyUpvoted = Buffer.contains<Text>(upvotedByBuf, userId, Text.equal);

    if (not isAlreadyUpvoted) {
      upvotedByBuf.add(userId);
      projects.put(projectId, { p with upvotedBy = Buffer.toArray(upvotedByBuf) });
      return "Upvoted."
    } else {
      let ?idx = Buffer.indexOf<Text>(userId, upvotedByBuf, Text.equal) else return "User idx not found.";
      let _ = upvotedByBuf.remove(idx);
      projects.put(projectId, { p with upvotedBy = Buffer.toArray(upvotedByBuf) });
      return "Upvote removed."
    }
  };

  // query

  public query func getActiveProjectsNum(apiKey : T.ApiKey) : async Nat {
    assert (secret == apiKey);
    let activeProjects = _getActiveProjects();
    return activeProjects.size()
  };

  public query func getProjectById(apiKey : T.ApiKey, id : T.ProjectId) : async ?T.Project {
    assert (secret == apiKey);
    return projects.get(id)
  };

  public query func getAllProjects(apiKey : T.ApiKey) : async [T.Project] {
    assert (secret == apiKey);
    let iter : Iter.Iter<T.Project> = projects.vals();
    let allProjects = Iter.toArray<T.Project>(iter);
    return Handle.sort(allProjects, #newest_first)
  };

  public query func getCategories(apiKey : T.ApiKey) : async [Category.Category] {
    assert (secret == apiKey);
    return categories
  };

  public query func getCategoriesWithSize(apiKey : T.ApiKey) : async [Category.CategoryWithSize] {
    assert (secret == apiKey);

    let activeProjects = _getActiveProjects();
    let buff = Buffer.Buffer<Category.CategoryWithSize>(categories.size());

    for (category in categories.vals()) {
      if (category.id == "all") {
        buff.add({ category; size = activeProjects.size() })

      } else {
        let filter = func(p : T.Project) : Bool {
          let exists = Array.find<Category.CategoryLabel>(p.category, func(x) { x == category.lbl });

          switch (exists) {
            case (null) return false;
            case (?some) return true
          }
        };

        let filtered = Array.filter(activeProjects, filter);
        buff.add({ category; size = filtered.size() })
      }
    };
    return Buffer.toArray(buff)
  };

  public shared query ({ caller }) func getUserUpvotedProjects(apiKey : T.ApiKey) : async [T.Project] {
    assert (secret == apiKey);
    let sortedByNewest = Handle.sort(_getActiveProjects(), #newest_first);
    let userId = Principal.toText(caller);

    let filter = func(x : T.Project) : Bool {
      let idx = Array.indexOf<Text>(userId, x.upvotedBy, func(a : Text, b : Text) : Bool { a == b });
      switch (idx) {
        case (null) return false;
        case (?some) return true
      }
    };

    return Array.filter(sortedByNewest, filter)
  };

  // filter, sort, paginate

  public query func getProjects(args : T.GetProjectsArgs) : async ?T.GetProjectsResult {
    assert (secret == args.secret);
    let { q; category; openSource; onChain; sort; selectedPage; itemsPerPage } = args;

    // get projects
    let activeProjects = _getActiveProjects();
    var result : [T.Project] = [];

    // search query
    if (q != "") {
      result := Handle.filteredBySearchQ(activeProjects, q)
    } else {
      result := activeProjects
    };

    // filter, sort, paginate
    let filteredByCategory = Handle.filterByCategory(result, category);
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

  // Helper function to safely take items from array
  private func safeTake<A>(arr : [A], n : Nat) : [A] {
    let len = arr.size();
    if (n >= len) {
      arr
    } else {
      let sliced = Array.slice(arr, 0, n);
      Iter.toArray<A>(sliced)
    }
  };

  public query func getHomepageData(
    apiKey : T.ApiKey,
    categories : [Text],
    itemsPerCategory : Nat,
    newProjectsCount : Nat,
    mostUpvotedCount : Nat,
  ) : async T.HomepageData {
    assert (secret == apiKey);

    let activeProjects = _getActiveProjects();

    // Get new projects
    let sortedByNewest = Handle.sort(activeProjects, #newest_first);
    let newProjects = safeTake(sortedByNewest, newProjectsCount);

    // Get most upvoted projects
    let sortedByMostUpvoted = Handle.sort(activeProjects, #most_upvoted);
    let mostUpvoted = safeTake(sortedByMostUpvoted, mostUpvotedCount);

    // Get highlighted projects by category
    let highlighted = Array.map<Text, T.CategoryProjects>(
      categories,
      func(categoryLabel : Text) : T.CategoryProjects {
        // Use the category label directly for filtering since that's what projects store
        let filteredByCategory = Handle.filterByCategory(activeProjects, categoryLabel);
        let sortedByNewest = Handle.sort(filteredByCategory, #newest_first);
        let projects = safeTake(sortedByNewest, itemsPerCategory);

        // Find the category ID from the categories array for the response
        let categoryId = switch (Array.find<Category.Category>(Category.categories, func(cat) = cat.lbl == categoryLabel)) {
          case (?cat) cat.id;
          case null Text.toLowercase(categoryLabel); // fallback to lowercase label if ID not found
        };

        {
          categoryId = categoryId;
          categoryLabel = categoryLabel;
          projects = projects
        }
      },
    );

    {
      new = newProjects;
      mostUpvoted = mostUpvoted;
      highlighted = highlighted
    }
  };

  public query func getNewProjects(apiKey : T.ApiKey, length : T.Length) : async [T.Project] {
    assert (secret == apiKey);
    let activeProjects = _getActiveProjects();
    let sortedByNewest = Handle.sort(activeProjects, #newest_first);
    return safeTake(sortedByNewest, length)
  };

  public query func getHighlightedProjects(apiKey : T.ApiKey, category : Category.CategoryLabel, length : T.Length) : async [T.Project] {
    assert (secret == apiKey);
    let activeProjects = _getActiveProjects();
    let filteredByCategory = Handle.filterByCategory(activeProjects, category);
    let sortedByNewest = Handle.sort(filteredByCategory, #newest_first);
    return safeTake(sortedByNewest, length)
  };

  public query func getMultipleHighlightedProjects(apiKey : T.ApiKey, categories : [Category.CategoryLabel], length : T.Length) : async [T.CategoryProjects] {
    assert (secret == apiKey);
    let activeProjects = _getActiveProjects();

    let highlighted = Array.map<Category.CategoryLabel, T.CategoryProjects>(
      categories,
      func(categoryLabel : Category.CategoryLabel) : T.CategoryProjects {
        let filteredByCategory = Handle.filterByCategory(activeProjects, categoryLabel);
        let sortedByNewest = Handle.sort(filteredByCategory, #newest_first);
        let projects = safeTake(sortedByNewest, length);

        // Find the category ID from the categories array for the response
        let categoryId = switch (Array.find<Category.Category>(Category.categories, func(cat) = cat.lbl == categoryLabel)) {
          case (?cat) cat.id;
          case null Text.toLowercase(categoryLabel); // fallback to lowercase label if ID not found
        };

        {
          categoryId = categoryId;
          categoryLabel = categoryLabel;
          projects = projects
        }
      },
    );

    return highlighted
  };

  public query func getMostUpvotedProjects(apiKey : T.ApiKey, length : T.Length) : async [T.Project] {
    assert (secret == apiKey);
    let activeProjects = _getActiveProjects();
    let sortedByMostUpvoted = Handle.sort(activeProjects, #most_upvoted);
    return safeTake(sortedByMostUpvoted, length)
  };

  // project

  public query func getRelatedProjects(apiKey : T.ApiKey, projectId : T.ProjectId, length : T.Length) : async [T.Project] {
    assert (secret == apiKey);
    let activeProjects = _getActiveProjects();
    let ?project = projects.get(projectId) else return [];
    let categories = project.category;
    let buf = Buffer.Buffer<T.Project>(10);

    for (c in categories.vals()) {
      let filtered = Handle.filterByCategory(activeProjects, c);
      buf.append(Buffer.fromArray<T.Project>(filtered))
    };

    let compare = func(a : T.Project, b : T.Project) : Order.Order {
      if (a.id > b.id) return #greater;
      if (a.id < b.id) return #less;
      return #equal
    };

    Buffer.removeDuplicates<T.Project>(buf, compare);
    return Buffer.toArray<T.Project>(buf)
  };

  // admin

  public query func getProjectsBySearchQ(apiKey : T.ApiKey, searchQ : Text) : async [T.Project] {
    assert (secret == apiKey);
    let allProjects = Iter.toArray<T.Project>(projects.vals());
    let sortedByNewest = Handle.sort(allProjects, #newest_first);
    let q = Text.toLowercase(searchQ);
    return Array.filter<T.Project>(sortedByNewest, func(x) { Text.contains(Text.toLowercase(x.name), #text q) })
  };

  public shared query ({ caller }) func showApiKey() : async Text {
    assert (caller == adminPrincipal);
    return secret
  };

  public shared ({ caller }) func updateApiKey(newApiKey : T.ApiKey) : async Text {
    assert (caller == adminPrincipal);
    secret := newApiKey;
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
