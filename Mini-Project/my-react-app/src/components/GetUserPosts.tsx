import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Container, ListGroup } from "react-bootstrap";
import { GET_USER_POSTS } from "../queries/postQueries"; 

interface Comment {
    id: string;
    name: string;
    email: string;
    body: string;
};

interface Post {
    id: string;
    title: string;
    body: string;
    comments: {
        data: Comment[]
    }
};

interface UserPostsData {
    user: {
        id: string;
        name: string;
        posts: {
            data: Post[]
        }
    }
}

const GetUserPosts: React.FC = () => {

    const { userId } = useParams<{ userId: string }>();

    const { loading, error, data } = useQuery<UserPostsData>(GET_USER_POSTS, {
    variables: { userId },
});

    if (loading) return <Container><h3>Loading...</h3></Container>

    if (error) return <Container><h3>Error Loading Posts: {error.message}</h3></Container>

    const user = data?.user;
    if (!user) return <Container><h3>User not found</h3></Container>

    return(
        <Container>
            <h1>Post History for {user.name}</h1>
            <ListGroup>
            {user.posts.data.length === 0 ? (<h3>No posts found from this user</h3>): (
                user.posts.data.map((post) => (
                    <ListGroup.Item key={post.id}><h3>{post.title}</h3><br/>
                    <p>Body: {post.body}</p>
                    <div>
                        <h4>Comments:</h4>
                        {post.comments.data.length === 0 ? (
                            <p>No comments found</p>) : (
                                post.comments.data.map((comment) => (
                                    <div key={comment.id}>
                                        <p>Title: {comment.name}</p>
                                        <p>Email: {comment.email}</p>
                                        <p>Body: {comment.body}</p>
                                    </div>
                                ))
                            )}
                    </div>
                </ListGroup.Item>
            ))
        )}
        </ListGroup>
    </Container>

    );
};
export default GetUserPosts;