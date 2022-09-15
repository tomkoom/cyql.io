export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Job = IDL.Record({
    'contactDiscord' : IDL.Text,
    'compensation' : IDL.Text,
    'title' : IDL.Text,
    'submitted' : Time,
    'edited' : Time,
    'publisher' : IDL.Text,
    'description' : IDL.Text,
    'sourceUrl' : IDL.Text,
    'companyTwitter' : IDL.Text,
    'contactTwitter' : IDL.Text,
    'applicationUrl' : IDL.Text,
    'contactEmail' : IDL.Text,
    'companyName' : IDL.Text,
    'category' : IDL.Text,
    'companyWebsite' : IDL.Text,
    'equity' : IDL.Text,
    'companyLogoUrl' : IDL.Text,
  });
  const AddJobErr = IDL.Variant({ 'Err' : IDL.Null, 'IsAnonymous' : IDL.Null });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : AddJobErr });
  const JobCounter = IDL.Nat;
  const GetLogMessagesFilter = IDL.Record({
    'analyzeCount' : IDL.Nat32,
    'messageRegex' : IDL.Opt(IDL.Text),
    'messageContains' : IDL.Opt(IDL.Text),
  });
  const Nanos = IDL.Nat64;
  const GetLogMessagesParameters = IDL.Record({
    'count' : IDL.Nat32,
    'filter' : IDL.Opt(GetLogMessagesFilter),
    'fromTimeNanos' : IDL.Opt(Nanos),
  });
  const GetLatestLogMessagesParameters = IDL.Record({
    'upToTimeNanos' : IDL.Opt(Nanos),
    'count' : IDL.Nat32,
    'filter' : IDL.Opt(GetLogMessagesFilter),
  });
  const CanisterLogRequest = IDL.Variant({
    'getMessagesInfo' : IDL.Null,
    'getMessages' : GetLogMessagesParameters,
    'getLatestMessages' : GetLatestLogMessagesParameters,
  });
  const CanisterLogFeature = IDL.Variant({
    'filterMessageByContains' : IDL.Null,
    'filterMessageByRegex' : IDL.Null,
  });
  const CanisterLogMessagesInfo = IDL.Record({
    'features' : IDL.Vec(IDL.Opt(CanisterLogFeature)),
    'lastTimeNanos' : IDL.Opt(Nanos),
    'count' : IDL.Nat32,
    'firstTimeNanos' : IDL.Opt(Nanos),
  });
  const LogMessagesData = IDL.Record({
    'timeNanos' : Nanos,
    'message' : IDL.Text,
  });
  const CanisterLogMessages = IDL.Record({
    'data' : IDL.Vec(LogMessagesData),
    'lastAnalyzedMessageTimeNanos' : IDL.Opt(Nanos),
  });
  const CanisterLogResponse = IDL.Variant({
    'messagesInfo' : CanisterLogMessagesInfo,
    'messages' : CanisterLogMessages,
  });
  const MetricsGranularity = IDL.Variant({
    'hourly' : IDL.Null,
    'daily' : IDL.Null,
  });
  const GetMetricsParameters = IDL.Record({
    'dateToMillis' : IDL.Nat,
    'granularity' : MetricsGranularity,
    'dateFromMillis' : IDL.Nat,
  });
  const UpdateCallsAggregatedData = IDL.Vec(IDL.Nat64);
  const CanisterHeapMemoryAggregatedData = IDL.Vec(IDL.Nat64);
  const CanisterCyclesAggregatedData = IDL.Vec(IDL.Nat64);
  const CanisterMemoryAggregatedData = IDL.Vec(IDL.Nat64);
  const HourlyMetricsData = IDL.Record({
    'updateCalls' : UpdateCallsAggregatedData,
    'canisterHeapMemorySize' : CanisterHeapMemoryAggregatedData,
    'canisterCycles' : CanisterCyclesAggregatedData,
    'canisterMemorySize' : CanisterMemoryAggregatedData,
    'timeMillis' : IDL.Int,
  });
  const NumericEntity = IDL.Record({
    'avg' : IDL.Nat64,
    'max' : IDL.Nat64,
    'min' : IDL.Nat64,
    'first' : IDL.Nat64,
    'last' : IDL.Nat64,
  });
  const DailyMetricsData = IDL.Record({
    'updateCalls' : IDL.Nat64,
    'canisterHeapMemorySize' : NumericEntity,
    'canisterCycles' : NumericEntity,
    'canisterMemorySize' : NumericEntity,
    'timeMillis' : IDL.Int,
  });
  const CanisterMetricsData = IDL.Variant({
    'hourly' : IDL.Vec(HourlyMetricsData),
    'daily' : IDL.Vec(DailyMetricsData),
  });
  const CanisterMetrics = IDL.Record({ 'data' : CanisterMetricsData });
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
    'collectCanisterMetrics' : IDL.Func([], [], []),
    'deleteJob' : IDL.Func([JobCounter], [], []),
    'doThat' : IDL.Func([], [], []),
    'doThis' : IDL.Func([], [], []),
    'getCanisterLog' : IDL.Func(
        [IDL.Opt(CanisterLogRequest)],
        [IDL.Opt(CanisterLogResponse)],
        ['query'],
      ),
    'getCanisterMetrics' : IDL.Func(
        [GetMetricsParameters],
        [IDL.Opt(CanisterMetrics)],
        ['query'],
      ),
    'getJobs' : IDL.Func([], [IDL.Vec(IDL.Tuple(JobCounter, Job))], ['query']),
    'getJobsNum' : IDL.Func([], [IDL.Nat], ['query']),
    'getProfile' : IDL.Func([], [IDL.Opt(Profile)], ['query']),
    'getProfiles' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(ProfileId, Profile))],
        ['query'],
      ),
    'getThat' : IDL.Func([], [IDL.Text], ['query']),
    'getThis' : IDL.Func([], [IDL.Text], ['query']),
    'updateProfiles' : IDL.Func([Profile], [Result], []),
    'whoami' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
