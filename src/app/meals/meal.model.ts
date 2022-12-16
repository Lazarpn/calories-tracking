export class Meal {
  public mealName: string;
  public calories: number;
  // fix this and later in constructor
  public date: any;
  public time: any;

  constructor(mealName: string, calories: number, date: any, time: any) {
    this.mealName = mealName;
    this.calories = calories;
    this.date = date;
    this.time = time;
  }
}
