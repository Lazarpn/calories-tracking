export class Filter {
  public dateStart: Date | '';
  public dateEnd: Date | '';
  public timeStart: string;
  public timeEnd: string;

  constructor(
    dateStart: Date | '',
    dateEnd: Date | '',
    timeStart: string,
    timeEnd: string
  ) {
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
  }
}
