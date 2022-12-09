export class Meal {
  public mealName: string;
  public calories: number;
  public date: any;
  // fix this and later in constructor

  constructor(mealName: string, calories: number, date: any) {
    this.mealName = mealName;
    this.calories = calories;
    this.date = date;
  }
}
