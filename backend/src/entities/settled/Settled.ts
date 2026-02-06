import { GroupId } from "../group/GroupId";
import { UserId } from "../user/UserId";
import { SettledId } from "./SettledId";

export class Settled {
  constructor(
    public readonly _id: SettledId,
    public readonly groupId: GroupId,
    public who: UserId,
    public whom: UserId,
    public amount: number,
    public isSettled: boolean = false,
    public readonly creditedAt: Date,
    public updatedAt: Date
  ) {}
}
