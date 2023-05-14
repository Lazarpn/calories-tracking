export class Meal {
  id: number;
  name: string = 'Obrok';
  calories: number = 0;
  date: Date = new Date();
  constructor(id: number, name: string, calories: number, date: Date) {
    this.id = id;
    this.name = name;
    this.calories = calories;
    this.date = date;
  }
}
