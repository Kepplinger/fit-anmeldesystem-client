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

export function getMemberStatusHTML(status: MemberStatus): string {
  switch (status) {
    case MemberStatus.None:
      return `<i class="fa fa-fw mr-1 text-danger fa-times"></i>kein Mitglied`;
    case MemberStatus.Interested:
      return `<i class="fa fa-fw mr-1 text-muted fa-clock-o"></i>interessiert`;
    case MemberStatus.Small:
      return `<i class="fa fa-fw mr-1 text-warning fa-star-half-o"></i>kleines Mitglied`;
    case MemberStatus.Big:
      return `<i class="fa fa-fw mr-1 text-warning fa-star"></i>großes Mitglied`;
  }
}
