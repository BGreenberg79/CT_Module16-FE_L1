import { gql } from "@apollo/client";

export const GET_TODOS = gql`
    query GetTodos($userId: ID, $completed: String, $sort: [SortOptions!]) {
        todos(options: {
            operators: [
                { kind: LIKE, field: "user.id", value: $userId },
                { kind: LIKE, field: "completed", value: $completed }
            ],
            sort: $sort
        }) {
            data {
                id
                title
                completed
                user {
                    id
                    name
                }
            }
        }
    }
`;