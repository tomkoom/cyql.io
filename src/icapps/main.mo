import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Prim "mo:prim";
import Principal "mo:base/Principal";

import Types "jobs/types";

actor {
    stable var jobCounter : Types.JobCounter = 0;
    let keyHash: (Nat) -> Hash.Hash = func(x) { Hash.hash(x) }; // hash Nat
    var mapOfJobs = HashMap.HashMap<Types.JobCounter, Types.Job>(1, Nat.equal, keyHash); 

    // public shared({ caller }) func addJob(job: Types.Job) : async ?Types.Job {
    //     if (Principal.isAnonymous(caller)) {
    //         return null;
    //     } else {
    //         mapOfJobs.put(jobCounter, job);
    //         jobCounter += 1;
    //         return ?job;
    //     };
    // };

    public shared({ caller }) func addJob(job: Types.Job) : async Types.Job {
        mapOfJobs.put(jobCounter, job);
        jobCounter += 1;
        return job;
    };

    // query
    public query func getJobs() : async [(Types.JobCounter, Types.Job)] {
        return Iter.toArray(mapOfJobs.entries());
    };
    
    public query func getJobsNum() : async Nat {
        return mapOfJobs.size();
    };

    // utils
    public shared query({ caller }) func whoami() : async Text {
    return Principal.toText(caller);
  };
};
