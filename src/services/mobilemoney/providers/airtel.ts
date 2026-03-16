export class AirtelProvider {
  async requestPayment(phoneNumber: string, amount: string) {
    return { success: true };
  }

  async sendPayout(phoneNumber: string, amount: string) {
    return { success: true };
  }
}
