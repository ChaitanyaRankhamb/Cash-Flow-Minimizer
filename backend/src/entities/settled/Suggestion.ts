import { GroupId } from "../group/GroupId";
import { UserId } from "../user/UserId";
import { SuggestionId } from "./SuggestionId";

export class Suggestion {
  constructor(
    public readonly _id: SuggestionId,
    public readonly groupId: GroupId,
    public who: UserId,
    public whom: UserId,
    public amount: number,
    public isSettled: boolean = false,
    public readonly creditedAt: Date,
    public updatedAt: Date
  ) {}
}
