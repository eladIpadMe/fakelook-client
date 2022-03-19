import { Tag } from "./tag.model";
import { User } from "./user.model";
import { UserTaggedComment } from "./userTaggedComment";

export interface Comment{
    id: number;
    content: string;
    user: User;
    hashtags: Tag[];
    usersTagged: UserTaggedComment[];
}