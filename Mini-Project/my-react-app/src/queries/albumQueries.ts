import { gql } from "@apollo/client";

export const GET_ALBUMS_AND_PHOTOS = gql`
    query GetAlbumsAndPhotos($userId: ID) {
        albums(options: { 
            operators: [
                { kind: LIKE, field: "user.id", value: $userId }
            ]    
        }) {
            data {
                id
                title
                user {
                    id
                    name
                }
                photos {
                    data {
                        id
                        title
                        url
                        thumbnailUrl
                    }
                }    
            }
        }
    }
`;