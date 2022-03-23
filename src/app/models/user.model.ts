import { Group } from "./Group.model";
import { Like } from "./like.model";
import { Post } from "./post.model";
import { UserTaggedComment } from "./userTaggedComment.model";
import { UserTaggedPost } from "./userTaggedPost.model";

export interface User{
    id?: number | undefined;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    address: string;
    comments: Comment[];
    posts: Post[];
    likes: Like[];
    userTaggedPost: UserTaggedPost[];
    userTaggedComment: UserTaggedComment[];
    userGroups: Group[];
}