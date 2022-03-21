import { Tag } from "./tag.model";
import { User } from "./user.model";
import { UserTaggedComment } from "./userTaggedComment.model";

export interface Comment{
    id?: number;
    content: string;
    userId: number;
    user?: User;
    postId: number;
    hashtags?: Tag[];
    usersTagged?: UserTaggedComment[];
}