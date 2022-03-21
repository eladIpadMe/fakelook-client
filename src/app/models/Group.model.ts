import { User } from "./user.model";

export interface Group{
    id: number;
    groupName: string;
    users: User[];
}