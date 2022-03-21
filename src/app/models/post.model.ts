import { Like } from "./like.model";
import { User } from "./user.model";
import { Comment } from "./comment.model";
import { Tag } from "./tag.model";

export interface Post{
    id?: number;
    description: string;
    imageSorce: string;
    x_position: number;
    y_position: number;
    z_position: number;
    date: Date;
    user?: User;
    userId: number;
    likes?: Like[];
    comments?: Comment[];
    hashtags?: Tag[];

    
}