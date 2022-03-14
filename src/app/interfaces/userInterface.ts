interface IUser{
    id: number,
    name: string,
    password: string,
    address: string,
    comments: string | null,
    posts: string | null,
    likes: number | null,
    userTaggedPost: number | null,
    userTaggedComment: number | null
    }
    
    
    
    export default IUser