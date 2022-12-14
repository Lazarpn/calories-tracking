export class Meal {
  public mealName: string;
  public calories: number;
  public date: any;
  // fix this and later in constructor
  public time: number;

  constructor(mealName: string, calories: number, date: any, time: number) {
    this.mealName = mealName;
    this.calories = calories;
    this.date = date;
    this.time = time;
  }
}
