export class Meal {
  id: number;
  name: string = 'Obrok';
  calories: number = 0;
  date: any = new Date();
  time: any = new Date(Date.now()).getTime();
  constructor(
    id: number,
    name: string,
    calories: number,
    date: any,
    time: any
  ) {
    this.id = id;
    this.name = name;
    this.calories = calories;
    this.date = date;
    this.time = time;
  }
}
