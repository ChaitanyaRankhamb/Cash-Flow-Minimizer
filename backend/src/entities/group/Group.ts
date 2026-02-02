import { GroupId } from "./GroupId";
import { UserId } from "../user/UserId";

export class Group {
  constructor(
    public readonly id: GroupId,
    public name: string,
    public description: string,
    public createdBy: UserId,
    public isActive: boolean = true,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }
}
