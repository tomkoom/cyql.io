import type { Principal } from '@dfinity/principal';
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
export interface _SERVICE {
  'addJob' : (arg_0: Job) => Promise<Job>,
  'getJobs' : () => Promise<Array<Job>>,
  'whoami' : () => Promise<string>,
}
