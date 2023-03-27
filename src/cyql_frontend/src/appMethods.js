// state
import store from "./State/_store";
import { setProfiles as setProfilesAction } from "./State/profiles/profiles";
import { setJobs as setJobsAction } from "./State/jobs/jobs";

// backend
import { Actor, HttpAgent } from "@dfinity/agent";
import {
  canisterId as cyql_canister_id,
  idlFactory as cyql_idl_factory,
} from "../../declarations/cyql_backend/index";

// host
import { localhost } from "./Context/host";
const cyqlBackendCanIdLocal = "rrkah-fqaaa-aaaaa-aaaaq-cai";

const addUserToDb = async (actor, accountIdStr, signInMethod) => {
  const timestamp = Date.now();
  const profile = await actor.getProfile().catch((err) => console.log(err));

  if (profile === undefined || profile.length === 0) {
    const newProfile = {
      accountId: accountIdStr,
      firstSignIn: timestamp,
      lastVisit: timestamp,
      signInMethod,
    };
    await actor.updateProfiles(newProfile).catch((err) => console.log(err));
  } else {
    await actor
      .updateProfiles({ ...profile[0], lastVisit: timestamp }) // profile is an array [{…}]
      .catch((err) => console.log(err));
  }
};

// profiles
const setProfiles = async (actor) => {
  await actor
    .getProfiles()
    .then((res) => {
      const profiles = [];
      res.forEach((el) => {
        let profile = {};
        // bigint to num
        for (const [key, value] of Object.entries(el[1])) {
          if (typeof value === "bigint") {
            profile = { ...profile, [key]: Number(value) };
          } else {
            profile = { ...profile, [key]: value };
          }
        }
        profiles.push({ id: el[0].toText(), ...profile });
      });
      store.dispatch(setProfilesAction(profiles));
    })
    .catch((err) => console.log(err));
};

// jobs
const setJobs = async (defaultActor) => {
  await defaultActor
    .getJobs()
    .then((jobs) => {
      const jobsArr = [];
      jobs.forEach((el) => {
        const id = typeof el[0] === "bigint" ? Number(el[0]) : el[0]; // convert bigint to num
        const job = el[1];
        job.submitted = Number(job.submitted);
        job.edited = Number(job.edited);
        jobsArr.push({ id, ...job });
      });
      store.dispatch(setJobsAction(jobsArr));
    })
    .catch((err) => console.log(err));
};

const setJobsTest = async () => {
  const testActor = Actor.createActor(cyql_idl_factory, {
    agent: new HttpAgent({ localhost }),
    canisterId: cyqlBackendCanIdLocal,
  });
  await testActor
    .getJobs()
    .then((jobs) => {
      const jobsArr = [];
      jobs.forEach((el) => {
        const id = typeof el[0] === "bigint" ? Number(el[0]) : el[0]; // convert bigint to num
        const job = el[1];
        job.submitted = Number(job.submitted);
        job.edited = Number(job.edited);
        jobsArr.push({ id, ...job });
      });
      store.dispatch(setJobsAction(jobsArr));
    })
    .catch((err) => console.log(err));
};

export { addUserToDb, setProfiles, setJobs, setJobsTest };
