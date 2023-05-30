export interface Donor {
  // public documentId: string,
  userId: string,
  password: string,
  fullName: string,
  gender: string,
  bloodType: string,
  phone: string,
  email: string,
  address: string,
  donorType: string,
  userLastLoginDate: Date
  donationTimes: number,
  // public userType: string{}
}
