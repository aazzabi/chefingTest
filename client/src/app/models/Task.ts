export class Task {
  public _id: number;
  public title: string;
  public description: string;
  public type: string;
  public status: string;
  public createdAt: Date;
  public checked: boolean;
  public editContent: boolean;

  public constructor(title: string, d: string, ty: string, p: string) {
    this.title = title;
    this.description = d;
    this.type = ty;
  }
}
