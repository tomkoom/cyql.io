export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Job = IDL.Record({
    'compensation' : IDL.Text,
    'title' : IDL.Text,
    'submitted' : Time,
    'edited' : Time,
    'applicationTwitter' : IDL.Text,
    'publisher' : IDL.Text,
    'description' : IDL.Text,
    'sourceUrl' : IDL.Text,
    'companyTwitter' : IDL.Text,
    'applicationUrl' : IDL.Text,
    'companyName' : IDL.Text,
    'category' : IDL.Text,
    'companyWebsite' : IDL.Text,
    'equity' : IDL.Text,
    'companyLogoUrl' : IDL.Text,
    'applicationDiscord' : IDL.Text,
    'applicationEmail' : IDL.Text,
  });
  const JobErr = IDL.Variant({ 'Err' : IDL.Null, 'IsAnonymous' : IDL.Null });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : JobErr });
  const JobId = IDL.Nat;
  const Profile = IDL.Record({
    'accountId' : IDL.Text,
    'lastVisit' : Time,
    'firstSignIn' : Time,
    'signInMethod' : IDL.Text,
  });
  const ProfileId = IDL.Principal;
  const ProfileErr = IDL.Variant({ 'IsAnonymous' : IDL.Null });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : ProfileErr });
  return IDL.Service({
    'addJob' : IDL.Func([Job], [Result_1], []),
    'addJobTest' : IDL.Func([Job], [], []),
    'deleteJob' : IDL.Func([JobId], [], []),
    'getJobs' : IDL.Func([], [IDL.Vec(IDL.Tuple(JobId, Job))], ['query']),
    'getJobsNum' : IDL.Func([], [IDL.Nat], ['query']),
    'getProfile' : IDL.Func([], [IDL.Opt(Profile)], ['query']),
    'getProfiles' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(ProfileId, Profile))],
        ['query'],
      ),
    'updateProfiles' : IDL.Func([Profile], [Result], []),
    'whoami' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
