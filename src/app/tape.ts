export class Tape {
  constructor (  
  public id: number,
  public title: string,
  public date?: string,
  public rating?: number,
  public description?: string,
  public photo?: string,
  public category?: string,
  public rent?: boolean){}
}