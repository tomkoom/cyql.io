module Types {

  public type JobCounter = Nat;
  
  public type Job = {
    // position
    title: Text;
    category: Text;
    description: Text;
    compensation: Text;
    equity: Text;

    // company
    company_name: Text;
    company_logo_url: Text;
    company_website: Text;
    company_twitter: Text;

    // application
    application_url: Text;
    application_email: Text;
    application_twitter: Text;
    application_discord: Text;

    // meta
    submitted: Text;
    // edited: Text,
    publisher: Text;

    // FE state: icapps_assets/src/State/jobs/job.js
  };
};