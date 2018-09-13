export enum SettingTab {
  EmailSMTP = 'SM',
  AdminAccounts = 'AA',
  DataTags = 'DT',
  DataBranches = 'DB',
  DataResources = 'DS',
  DataPackages = 'DP'
}

export function getSettingTabs() {
  return [
    SettingTab.EmailSMTP,
    SettingTab.AdminAccounts,
    SettingTab.DataTags,
    SettingTab.DataBranches,
    SettingTab.DataResources,
    SettingTab.DataPackages
  ];
}
