import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST, UPDATE_POST, DELETE_POST } from '../mutations/postMutations';
import { Button, Container, Form } from 'react-bootstrap';

const ManagePosts: React.FC = () => {
    const[ postForm, setPostForm] = useState({
        title: "",
        body: "",
    });

    const [editForm, setEditForm] = useState({
        id: "",
        title: "",
        body: "",
    })

    const [deleteId, setDeleteID] = useState("")

    const [createPost] = useMutation(CREATE_POST);
    const [updatePost] = useMutation(UPDATE_POST);
    const [deletePost] = useMutation(DELETE_POST)

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await createPost({
                variables: {
                    input: postForm
                }
            });
            console.log("Post Created", data.createPost)
            setPostForm({title:"", body:""});
        } catch (error) {
            console.error(error)
        }
    }

    const handleUpdatePosts = async (e:React.FormEvent) =>{
        e.preventDefault();
        try{
            const { data } = await updatePost({
                variables: {
                    id: editForm.id,
                    input: {
                        title: editForm.title,
                        body: editForm.body,
                    }
                } 
            })
            console.log("Post Updated", data.updatePost);
            setEditForm({ id:"", title: "", body:""})
        } catch (error) {
            console.error(error)
        }
    };

    const handleDeletePost = async (e:React.FormEvent) =>{
        e.preventDefault();
        try {
            const { data } = await deletePost({
                variables: { id: deleteId },
            });
            console.log("Post Deleted", data.deletePost);
            setDeleteID("");
            } catch (error) {
                console.error(error);
            }
    };

    return (
        <Container>
            <h1>Manage Posts</h1>
            <div>
                <h3>Create Post</h3>
                <Form onSubmit={handleCreatePost}>
                    <Form.Group>
                        <Form.Label>Post Title:</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder='Enter title here...'
                        required
                        value={postForm.title}
                        onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Post Body:</Form.Label>
                        <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder='Enter body here...'
                        required
                        value={postForm.body}
                        onChange={(e) => setPostForm({...postForm, body: e.target.value})}
                        />
                    </Form.Group>
                    <Button type="submit" variant="success">Create Post</Button>
                </Form>
            </div>
            <div>
                <h3>Update Post</h3>
                <Form onSubmit={handleUpdatePosts}>
                    <Form.Group>
                        <Form.Label>Post ID:</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder='Enter post ID here'
                        required
                        value={editForm.id}
                        onChange={(e) => setEditForm({...editForm, id: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Post Title:</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder='Enter title here...'
                        required
                        value={editForm.title}
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Post Body:</Form.Label>
                        <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder='Enter body here...'
                        required
                        value={editForm.body}
                        onChange={(e) => setEditForm({...editForm, body: e.target.value})}
                        />
                    </Form.Group>
                    <Button type="submit" variant="warning">Update Post</Button>
                </Form>
            </div>
            <div>
                <h3>Delete Post</h3>
                <Form onSubmit={handleDeletePost}>
                    <Form.Group>
                        <Form.Label>Delete Post ID:</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder='Enter post id to delete here'
                        required
                        value={deleteId}
                        onChange={(e) => setDeleteID(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" variant='danger'>Delete Post</Button>
                </Form>
            </div>
        </Container>
    )

}
export default ManagePosts;