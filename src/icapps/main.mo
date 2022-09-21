import ExperimentalCycles "mo:base/ExperimentalCycles";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Prelude "mo:base/Prelude";
import Prim "mo:prim";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";

import Canistergeek "mo:canistergeek/canistergeek";

import T "types";
import Err "errors";

actor {
  private stable var profilesEntries : [(T.ProfileId, T.Profile)] = [];
  private stable var jobsEntries : [(T.JobCounter, T.Job)] = [];

  var profiles = HashMap.HashMap<T.ProfileId, T.Profile>(1, Principal.equal, Principal.hash);

  stable var jobCounter : T.JobCounter = 0;
  // hash Nat
  let keyHash : (Nat) -> Hash.Hash = func(x) { Hash.hash(x) };
  var jobs = HashMap.HashMap<T.JobCounter, T.Job>(1, Nat.equal, keyHash);

  // PROFILE

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

  // JOBS

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

  public query func getJobs() : async [(T.JobCounter, T.Job)] {
    Iter.toArray(jobs.entries());
  };

  public query func getJobsNum() : async Nat {
    jobs.size();
  };

  public shared ({ caller }) func deleteJob(id : T.JobCounter) : async () {
    jobs.delete(id);
  };

  // UTILS

  public shared query ({ caller }) func whoami() : async Text {
    return Principal.toText(caller);
  };

  // CANISTERGEEK https://github.com/usergeek/canistergeek-ic-motoko

  stable var _canistergeekMonitorUD : ?Canistergeek.UpgradeData = null;
  private let canistergeekMonitor = Canistergeek.Monitor();

  stable var _canistergeekLoggerUD : ?Canistergeek.LoggerUpgradeData = null;
  private let canistergeekLogger = Canistergeek.Logger();

  private let adminPrincipal : Text = "frr2p-iyhp3-ioffo-ysh2e-babmd-f6gyf-slb4h-whtia-5kg2n-5ix4u-dae";

  public query ({ caller }) func getCanisterMetrics(parameters : Canistergeek.GetMetricsParameters) : async ?Canistergeek.CanisterMetrics {
    validateCaller(caller);
    canistergeekMonitor.getMetrics(parameters);
  };

  public shared ({ caller }) func collectCanisterMetrics() : async () {
    validateCaller(caller);
    canistergeekMonitor.collectMetrics();
  };

  public query ({ caller }) func getCanisterLog(request : ?Canistergeek.CanisterLogRequest) : async ?Canistergeek.CanisterLogResponse {
    validateCaller(caller);
    return canistergeekLogger.getLog(request);
  };

  private func validateCaller(principal : Principal) : () {
    //data is available only for specific principal
    if (not (Principal.toText(principal) == adminPrincipal)) {
      Prelude.unreachable();
    };
  };

  public shared ({ caller }) func doThis() : async () {
    canistergeekMonitor.collectMetrics();
    canistergeekLogger.logMessage("doThis");
    // rest part of the your method...
  };

  public shared ({ caller }) func doThat() : async () {
    canistergeekMonitor.collectMetrics();
    canistergeekLogger.logMessage("doThat");
    // rest part of the your method...
  };

  public query ({ caller }) func getThis() : async Text {
    "this";
  };

  public query ({ caller }) func getThat() : async Text {
    "that";
  };

  // STATE
  system func preupgrade() {
    // profiles, jobs
    profilesEntries := Iter.toArray(profiles.entries());
    jobsEntries := Iter.toArray(jobs.entries());

    // canistergeek
    _canistergeekMonitorUD := ?canistergeekMonitor.preupgrade();
    _canistergeekLoggerUD := ?canistergeekLogger.preupgrade();
  };

  system func postupgrade() {
    // profiles, jobs
    profilesEntries := [];
    jobsEntries := [];

    // canistergeek
    canistergeekMonitor.postupgrade(_canistergeekMonitorUD);
    _canistergeekMonitorUD := null;

    canistergeekLogger.postupgrade(_canistergeekLoggerUD);
    _canistergeekLoggerUD := null;
    canistergeekLogger.setMaxMessagesCount(3000);

    canistergeekLogger.logMessage("postupgrade");
  };
};
