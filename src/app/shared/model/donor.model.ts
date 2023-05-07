export class Donor {
  constructor(
    // public documentId: string,
    public userId: string,
    public password: string,
    public fullName: string,
    public gender: string,
    public bloodType: string,
    public phone: string,
    public email: string,
    public address: string,
    public donorType: string,
    public userLastLoginDate: Date
    // public userType: string
  ) {}
}
