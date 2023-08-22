export interface User {
  email: string;
  firstName: string;
  lastName: string;
  emailConfirmed: boolean;
  dateVerificationCodeExpires: Date;
  caloriesPreference: number;
}
