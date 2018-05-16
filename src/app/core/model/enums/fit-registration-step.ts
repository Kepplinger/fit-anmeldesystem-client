export enum FitRegistrationStep {
  GeneralData = 1,
  DetailedData = 2,
  FitAppearance = 3,
  PackagesAndLocation = 4,
  ContactAndRemarks = 5
}

export function getOrderedFitRegistrationSteps() {
  return [
    FitRegistrationStep.GeneralData,
    FitRegistrationStep.DetailedData,
    FitRegistrationStep.FitAppearance,
    FitRegistrationStep.PackagesAndLocation,
    FitRegistrationStep.ContactAndRemarks
  ];
}
