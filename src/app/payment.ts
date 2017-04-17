export class Payment {
  constructor(
    public broken: boolean,
    public rewind: boolean,
    public delay: boolean,
    public sum: number
  ) { }
}