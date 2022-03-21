import { Tag } from "./tag.model";
import { User } from "./user.model";
import { UserTaggedPost } from "./userTaggedPost.model";

export interface PostsFilter{
    publishers: User[];
    startingDate?: Date;
    endingDate?: Date;
    hashtags: Tag[];
    taggesUsers: UserTaggedPost[];
}