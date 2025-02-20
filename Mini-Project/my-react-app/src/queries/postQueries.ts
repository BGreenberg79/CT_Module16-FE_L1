import { gql } from "@apollo/client";

export const GET_USER_POSTS = gql`
    query GetUserPosts($userId: ID!) {
        user(id: $userId) {
            id
            name
            posts {
                data {
                    id
                    title
                    body
                    comments {
                        data {
                            id
                            name
                            email
                            body
                        }
                    }
                }
            }
        }  
    }
`