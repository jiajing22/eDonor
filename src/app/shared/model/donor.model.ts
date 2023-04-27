export class Donor {
  constructor(
    // public documentId: string,
    public donorId: string,
    public donorType: string,
    public bloodType: string,
    public address: string,
    public userId: string,
    public fullName: string,
    public gender: string,
    public userLastLoginDate: Date
    // public userType: string
  ) {}
}
