import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Order "mo:base/Order";
import Text "mo:base/Text";

// ...
import T "../main_types";

module {

  // paginate

  public func paginate(projects : [T.Project], page : Nat, pageSize : Nat) : ?T.PaginatedResult {
    if (page < 1) return null;

    // calculate the start and end indexes for the requested page
    let startIndex = (page - 1) * pageSize;
    var endIndex = page * pageSize;

    let totalItems = projects.size();
    if (endIndex > totalItems) {
      endIndex := totalItems
    };

    // slice array based on the indexes
    let slice = Array.slice<T.Project>(projects, startIndex, endIndex);
    let paginatedProjects = Iter.toArray<T.Project>(slice);

    // calculate total pages
    let totalPages = Float.ceil(Float.fromInt(totalItems) / Float.fromInt(pageSize));

    // send the paginated response
    let res : T.PaginatedResult = {
      data = paginatedProjects;
      selectedPage = page;
      itemsPerPage = pageSize;
      startIndex;
      endIndex;
      totalItems;
      totalPages = Int.abs(Float.toInt(totalPages))
    };
    return ?res
  };

  // sort

  public func sort(projects : [T.Project], sortOption : T.SortOptions) : [T.Project] {

    switch sortOption {
      case (#newest_first) {
        return Array.sort<T.Project>(projects, sortNewestFirst)
      };
      case (#oldest_first) {
        return Array.sort<T.Project>(projects, sortOldestFirst)
      };
      case (#most_upvoted) {
        return Array.sort<T.Project>(projects, sortMostUpvoted)
      };
      case (#least_upvoted) {
        return Array.sort<T.Project>(projects, sortLeastUpvoted)
      };
      case (#recently_updated) {
        return Array.sort<T.Project>(projects, sortRecentlyUpdated)
      }
    };

    return []
  };

  // sort utils

  let sortNewestFirst = func(a : T.Project, b : T.Project) : Order.Order {
    if (b.createdAt > a.createdAt) return #greater;
    if (b.createdAt < a.createdAt) return #less;
    return #equal
  };

  let sortOldestFirst = func(a : T.Project, b : T.Project) : Order.Order {
    if (b.createdAt > a.createdAt) return #less;
    if (b.createdAt < a.createdAt) return #greater;
    return #equal
  };

  let sortMostUpvoted = func(a : T.Project, b : T.Project) : Order.Order {
    if (b.upvotedBy.size() > a.upvotedBy.size()) return #greater;
    if (b.upvotedBy.size() < a.upvotedBy.size()) return #less;
    return #equal
  };

  let sortLeastUpvoted = func(a : T.Project, b : T.Project) : Order.Order {
    if (b.upvotedBy.size() > a.upvotedBy.size()) return #less;
    if (b.upvotedBy.size() < a.upvotedBy.size()) return #greater;
    return #equal
  };

  let sortRecentlyUpdated = func(a : T.Project, b : T.Project) : Order.Order {
    if (b.updatedAt > a.updatedAt) return #greater;
    if (b.updatedAt < a.updatedAt) return #less;
    return #equal
  };

  // filter

  public func filterByCategory(projects : [T.Project], value : Text) : [T.Project] {
    if (Text.toLowercase(value) == "all") return projects;

    func filter(project : T.Project) : Bool {
      let _ = Array.find<Text>(project.category, func(category) { Text.toLowercase(category) == Text.toLowercase(value) }) else return false;
      return true
    };

    return Array.filter<T.Project>(projects, filter)
  };

  public func filterByOpenSource(projects : [T.Project], value : ?Bool) : [T.Project] {
    switch value {
      case (null) return projects;
      case (?true) return Array.filter<T.Project>(projects, func(p) { p.github != "" });
      case (?false) return Array.filter<T.Project>(projects, func(p) { p.github == "" })
    }
  };

  public func filterByOnchain(projects : [T.Project], value : ?Bool) : [T.Project] {
    switch value {
      case (null) return projects;
      case (?true) return Array.filter<T.Project>(projects, func(p) { p.frontendCanisterId != "" });
      case (?false) return Array.filter<T.Project>(projects, func(p) { p.frontendCanisterId == "" })
    }
  }
}
