import { Tag } from "./tag.model";
import { User } from "./user.model";
import { UserTaggedComment } from "./userTaggedComment.model";

export interface Comment{
    id?: number;
    user?: User;
    content: string;
    userId: number;
    postId: number;
    tags?: Tag[];
    userTaggedComment?: UserTaggedComment[];
}