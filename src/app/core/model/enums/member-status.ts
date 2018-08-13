export enum MemberStatus {
  None = 0,
  Interested = 1,
  Small = 2,
  Big = 3,
}

export function getOrderedMemberStatus() {
  return [
    MemberStatus.None,
    MemberStatus.Interested,
    MemberStatus.Small,
    MemberStatus.Big
  ];
}
