export const idlFactory = ({ IDL }) => {
  const Job = IDL.Record({
    'compensation' : IDL.Text,
    'company_twitter' : IDL.Text,
    'title' : IDL.Text,
    'submitted' : IDL.Text,
    'application_twitter' : IDL.Text,
    'publisher' : IDL.Text,
    'company_website' : IDL.Text,
    'company_name' : IDL.Text,
    'description' : IDL.Text,
    'category' : IDL.Text,
    'application_email' : IDL.Text,
    'application_discord' : IDL.Text,
    'equity' : IDL.Text,
    'application_url' : IDL.Text,
    'company_logo_url' : IDL.Text,
  });
  return IDL.Service({
    'addJob' : IDL.Func([Job], [Job], []),
    'getJobs' : IDL.Func([], [IDL.Vec(Job)], ['query']),
    'whoami' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
