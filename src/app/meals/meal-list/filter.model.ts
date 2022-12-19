export class Filter {
  public dateStart: string;
  public dateEnd: string;
  public timeStart: string;
  public timeEnd: string;

  constructor(
    dateStart: string,
    dateEnd: string,
    timeStart: string,
    timeEnd: string
  ) {
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
  }
}
