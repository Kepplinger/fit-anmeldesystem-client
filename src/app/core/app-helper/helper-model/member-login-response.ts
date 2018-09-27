export interface MemberLoginResponse {
  entity: MemberEntity;
  authToken: string;
}

export interface MemberEntity {
  graduate: any;
  oldBooking: any;
  currentBooking: any;
  adminBooking: any;
  company: any;
}
