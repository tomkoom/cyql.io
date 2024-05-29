import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Order "mo:base/Order";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

// ...
import T "../main_types";

module {

  // paginate

  public func paginate(projects : [T.Project], selectedPage : Nat, itemsPerPage : Nat) : ?T.PaginateResult {
    if (selectedPage < 1) return null;
    var page = selectedPage;

    // calculate total pages
    let totalItems = projects.size();
    let totalPages = Int.abs(Float.toInt(Float.ceil(Float.fromInt(totalItems) / Float.fromInt(itemsPerPage))));

    // ...
    if (page > totalPages) {
      if (totalPages == 0) {
        page := 1
      } else {
        page := totalPages
      }
    };

    // calculate the start and end indexes for the requested page
    let startIndex = (page - 1) * itemsPerPage;
    var endIndex = page * itemsPerPage;

    if (endIndex > totalItems) {
      endIndex := totalItems
    };

    // slice array based on the indexes
    let slice = Array.slice<T.Project>(projects, startIndex, endIndex);
    let paginatedProjects = Iter.toArray<T.Project>(slice);

    // send the paginated response
    let res : T.PaginateResult = {
      data = paginatedProjects;
      selectedPage = page;
      totalPages;
      itemsPerPage;
      startIndex;
      endIndex;
      totalItems
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

    func filter(p : T.Project) : Bool {
      switch (Array.find<Text>(p.category, func(category) { Text.toLowercase(category) == Text.toLowercase(value) })) {
        case (null) return false;
        case (?some) return true
      }
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
