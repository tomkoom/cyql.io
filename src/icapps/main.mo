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

import Types "types";

actor {
  var profiles = HashMap.HashMap<Principal, Types.Profile>(1, Principal.equal, Principal.hash);

  stable var jobCounter : Types.JobCounter = 0;
  // hash Nat
  let keyHash : (Nat) -> Hash.Hash = func(x) { Hash.hash(x) };
  var jobs = HashMap.HashMap<Types.JobCounter, Types.Job>(1, Nat.equal, keyHash);

  // PROFILE

  public query func userExists(id : Principal) : async Bool {
    switch (profiles.get(id)) {
      case (?profile) true;
      case (null) false;
    };
  };

  public shared ({ caller }) func createProfile(profile : Types.Profile) : async Result.Result<(), Types.ProfileErr> {
    let id = caller;
    if (Principal.isAnonymous(id)) {
      #err(#IsAnonymous);
    } else {
      profiles.put(id, profile);
      #ok;
    };
  };

  // JOBS

  // public shared({ caller }) func addJob(job: Types.Job) : async ?Types.Job {
  //     if (Principal.isAnonymous(caller)) {
  //         return null;
  //     } else {
  //         jobs.put(jobCounter, job);
  //         jobCounter += 1;
  //         return ?job;
  //     };
  // };

  public shared ({ caller }) func addJob(job : Types.Job) : async Types.Job {
    jobs.put(jobCounter, job);
    jobCounter += 1;
    return job;
  };

  public query func getJobs() : async [(Types.JobCounter, Types.Job)] {
    return Iter.toArray(jobs.entries());
  };

  public query func getJobsNum() : async Nat {
    return jobs.size();
  };

  // status
  public query func getCycleBalance() : async Nat {
    ExperimentalCycles.balance();
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

  system func preupgrade() {
    _canistergeekMonitorUD := ?canistergeekMonitor.preupgrade();
    _canistergeekLoggerUD := ?canistergeekLogger.preupgrade();
  };

  system func postupgrade() {
    canistergeekMonitor.postupgrade(_canistergeekMonitorUD);
    _canistergeekMonitorUD := null;

    canistergeekLogger.postupgrade(_canistergeekLoggerUD);
    _canistergeekLoggerUD := null;
    canistergeekLogger.setMaxMessagesCount(3000);

    canistergeekLogger.logMessage("postupgrade");
  };

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
};
