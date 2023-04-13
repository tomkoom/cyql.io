import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Job {
  'compensation' : string,
  'title' : string,
  'submitted' : Time,
  'edited' : Time,
  'applicationTwitter' : string,
  'publisher' : string,
  'description' : string,
  'sourceUrl' : string,
  'companyTwitter' : string,
  'applicationUrl' : string,
  'companyName' : string,
  'category' : string,
  'companyWebsite' : string,
  'equity' : string,
  'companyLogoUrl' : string,
  'applicationDiscord' : string,
  'applicationEmail' : string,
}
export type JobErr = { 'Err' : null } |
  { 'IsAnonymous' : null };
export type JobId = bigint;
export interface Profile {
  'accountId' : string,
  'lastVisit' : Time,
  'firstSignIn' : Time,
  'signInMethod' : string,
}
export type ProfileErr = { 'IsAnonymous' : null };
export type ProfileId = Principal;
export type Result = { 'ok' : null } |
  { 'err' : ProfileErr };
export type Result_1 = { 'ok' : null } |
  { 'err' : JobErr };
export type Time = bigint;
export interface _SERVICE {
  'addJob' : ActorMethod<[Job], Result_1>,
  'addJobTest' : ActorMethod<[Job], undefined>,
  'deleteJob' : ActorMethod<[JobId], undefined>,
  'getJobs' : ActorMethod<[], Array<[JobId, Job]>>,
  'getJobsNum' : ActorMethod<[], bigint>,
  'getProfile' : ActorMethod<[], [] | [Profile]>,
  'getProfiles' : ActorMethod<[], Array<[ProfileId, Profile]>>,
  'updateProfiles' : ActorMethod<[Profile], Result>,
  'whoami' : ActorMethod<[], string>,
}
