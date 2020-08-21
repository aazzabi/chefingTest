import {User} from './User';

export class Task {
  public _id: number;
  public title: string;
  public code: string;
  public description: string;
  public priority: string;
  public type: string;
  public status: string;
  public createdAt: Date;
  public openedAt: Date;
  public delegatedAt: Date;
  public resolvedAt: Date;
  public isFaq: boolean;
  public createdById: number;
  public responsible: User;
  public checked: boolean;

  public constructor(title: string, d: string, ty: string, p: string, uid: number) {
    this.title = title;
    this.description = d;
    this.type = ty;
    this.priority = p;
    this.createdById = uid;
  }
}
