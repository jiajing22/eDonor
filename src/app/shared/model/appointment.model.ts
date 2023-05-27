export class Appointment {

  constructor
  (
    public appointmentId: string,
    public appmntDate: string,
    public timeslot: string,
    public appmntLocation: number,
    public aStatus: string,
    public donorId: string
  ) {
  }


}
