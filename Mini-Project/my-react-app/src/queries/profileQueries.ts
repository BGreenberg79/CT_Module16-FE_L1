import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
    query GetUserProfiles($id: ID!) {
        user(id: $id) {
            name
            username
            email
            phone
            website
            address {
                street
                suite
                city
                zipcode
                geo {
                    lat
                    lng
                }  
            }
            company {
                name
                catchPhrase
                bs
            }
        }
    }
`;

// GraphQL query to fetch user's profile details
