import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Result "mo:base/Result";

import T "types";
import Err "errors";

actor {
  private stable var profilesEntries : [(T.ProfileId, T.Profile)] = [];
  private stable var jobsEntries : [(T.JobId, T.Job)] = [];

  var profiles = HashMap.HashMap<T.ProfileId, T.Profile>(1, Principal.equal, Principal.hash);

  stable var jobCounter : T.JobId = 0;
  // hash Nat
  let keyHash : (Nat) -> Hash.Hash = func(x) { Hash.hash(x) };
  var jobs = HashMap.HashMap<T.JobId, T.Job>(1, Nat.equal, keyHash);

  // profile

  public shared query ({ caller }) func getProfile() : async ?T.Profile {
    let id = caller;
    switch (profiles.get(id)) {
      case (?profile) ?profile;
      case (null) null;
    };
  };

  public query func getProfiles() : async [(T.ProfileId, T.Profile)] {
    // check canister id
    return Iter.toArray(profiles.entries());
  };

  public shared ({ caller }) func updateProfiles(profile : T.Profile) : async Result.Result<(), Err.ProfileErr> {
    let id = caller;
    if (Principal.isAnonymous(id)) {
      #err(#IsAnonymous);
    } else {
      profiles.put(id, profile);
      #ok;
    };
  };

  // jobs

  public shared ({ caller }) func addJob(job : T.Job) : async Result.Result<(), Err.JobErr> {
    if (Principal.isAnonymous(caller)) return #err(#IsAnonymous);

    let publisher = job.publisher;
    if (Principal.toText(caller) == publisher) {
      jobs.put(jobCounter, job);
      jobCounter += 1;
      #ok;
    } else {
      #err(#Err);
    };
  };

  public func addJobTest(job : T.Job) : async () {
    jobs.put(jobCounter, job);
    jobCounter += 1;
  };

  public query func getJobs() : async [(T.JobId, T.Job)] {
    Iter.toArray(jobs.entries());
  };

  public query func getJobsNum() : async Nat {
    jobs.size();
  };

  public shared ({ caller }) func deleteJob(id : T.JobId) : async () {
    jobs.delete(id);
  };

  // utils

  public shared query ({ caller }) func whoami() : async Text {
    return Principal.toText(caller);
  };

  // state
  system func preupgrade() {
    // profiles, jobs
    profilesEntries := Iter.toArray(profiles.entries());
    jobsEntries := Iter.toArray(jobs.entries());

  };

  system func postupgrade() {
    // profiles, jobs
    profilesEntries := [];
    jobsEntries := [];
  };
};
