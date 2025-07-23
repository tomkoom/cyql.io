import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Order "mo:base/Order";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

import T "../types";

module {

  // filter by search q

  public func filteredBySearchQ(projects : [T.Project], searchQ : Text) : [T.Project] {
    func filter(p : T.Project) : Bool {
      let q = Text.toLowercase(searchQ);
      return Text.contains(Text.toLowercase(p.name), #text q)
    };

    return Array.filter(projects, filter)
  };

  // paginate

  public func paginate(projects : [T.Project], selectedPage : Nat, itemsPerPage : Nat) : ?T.PaginateResult {
    if (selectedPage < 1) return null;
    var page = selectedPage;

    // calculate total pages
    let totalItems = projects.size();

    // Avoid division by zero
    if (itemsPerPage == 0) return null;

    let totalPages = Int.abs(Float.toInt(Float.ceil(Float.fromInt(totalItems) / Float.fromInt(itemsPerPage))));

    // Ensure page is within bounds
    if (page > totalPages) {
      if (totalPages == 0) {
        page := 1
      } else {
        page := totalPages
      }
    };

    // Safe calculation of start and end indexes
    let startIndex = if (page > 1) (page - 1) * itemsPerPage else 0;
    let endIndex = Nat.min(page * itemsPerPage, totalItems);

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
        case (?_some) return true
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
