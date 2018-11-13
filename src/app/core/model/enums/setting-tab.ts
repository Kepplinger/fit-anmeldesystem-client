export enum SettingTab {
  EmailSMTP = 'SM',
  AdminAccounts = 'AA',
  DataTags = 'DT',
  DataMemberStatus = 'DMS',
  DataBranches = 'DB',
  DataResources = 'DS',
  DataPackages = 'DP',
  FitLockedPage = 'LP'
}

export function getSettingTabs() {
  return [
    SettingTab.EmailSMTP,
    SettingTab.AdminAccounts,
    SettingTab.DataTags,
    SettingTab.DataMemberStatus,
    SettingTab.DataBranches,
    SettingTab.DataResources,
    SettingTab.DataPackages,
    SettingTab.FitLockedPage
  ];
}
