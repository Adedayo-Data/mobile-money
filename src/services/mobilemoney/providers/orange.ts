export class OrangeProvider {
  async requestPayment(phoneNumber: string, amount: string) {
    return { success: true };
  }

  async sendPayout(phoneNumber: string, amount: string) {
    return { success: true };
  }
}
