export class User {
  caloriesPreference: number = 0;
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public id: string,
    public role: string,
    caloriesPreference: number,
    private _token: string,
    public _tokenExpirationDate: Date
  ) {
    this.caloriesPreference = caloriesPreference;
  }

  get token() {
    // if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
    //   return null;
    // }

    return this._token;
  }
}
