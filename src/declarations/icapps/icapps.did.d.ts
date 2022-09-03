import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Job {
  'compensation' : string,
  'company_twitter' : string,
  'title' : string,
  'submitted' : string,
  'application_twitter' : string,
  'publisher' : string,
  'company_website' : string,
  'company_name' : string,
  'description' : string,
  'category' : string,
  'application_email' : string,
  'application_discord' : string,
  'equity' : string,
  'application_url' : string,
  'company_logo_url' : string,
}
export type JobCounter = bigint;
export interface _SERVICE {
  'addJob' : ActorMethod<[Job], [] | [Job]>,
  'getJobs' : ActorMethod<[], Array<[JobCounter, Job]>>,
  'getJobsNum' : ActorMethod<[], bigint>,
  'whoami' : ActorMethod<[], string>,
}
