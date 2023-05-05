export class User {
  caloriesPreference: number = null;
  userPhoto: any = null;
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public id: string,
    caloriesPreference: number,
    userPhoto: any,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {
    this.caloriesPreference = caloriesPreference;
    this.userPhoto = userPhoto;
  }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}
