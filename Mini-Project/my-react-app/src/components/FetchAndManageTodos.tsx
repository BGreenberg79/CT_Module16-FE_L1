import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TODOS } from "../queries/todoQueries";
import { TOGGLE_TODO, DELETE_TODO } from "../mutations/todoMutations";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";

const FetchAndManageTodos: React.FC = () => {

    const [userId, setUserId] = useState("1");
    const [completed, setCompleted] = useState<string | null>("true");
    const [sortCompleted, setSortCompleted] = useState<"ASC" | "DESC" | null>("ASC");

    const sortOptions = sortCompleted ? [{ field: "completed", order: sortCompleted }] : [];

    const { loading, error, data, refetch } = useQuery(GET_TODOS, {
        variables: {
            userId: userId || undefined,
            completed: completed === null ? "" : completed,
            sort: sortOptions, 
        },
    });

    const [toggleTodo] = useMutation(TOGGLE_TODO, {
        onCompleted: () => refetch(),
    });

    const [deleteTodo] = useMutation(DELETE_TODO, {
        onCompleted: () => refetch(),
    });

    if (loading) return <Container><h3>Loading...</h3></Container>;

    if (error) return <Container><h3>Error: {error.message}</h3></Container>;

    return(
        <Container>
            <h1>Todo List</h1>

            <Form>
                <Form.Group>
                    <Form.Label>Filter by User ID:</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Filter by User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Filter By Completion Status:</Form.Label>
                    <Form.Select
                    value={completed || ""}
                    onChange={(e) => setCompleted(e.target.value || null)}
                    >
                        <option value="">All</option>
                        <option value="true">Completed</option>
                        <option value="false">Incomplete</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sort by Completion Status:</Form.Label>
                    <Form.Select
                    value={sortCompleted || ""}
                    onChange={(e) => setSortCompleted(e.target.value === "" ? null : e.target.value as "ASC" | "DESC")}
                    >
                        <option value="">None</option>
                        <option value="ASC">Ascending</option>
                        <option value="DESC">Descending</option>
                    </Form.Select>
                </Form.Group>
            </Form>

            <Row>
                {data.todos.data.map((todo: any) => (
                    <Col key={todo.id} md={6} lg={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{todo.title}</Card.Title>
                                <Card.Text>
                                    Task For: {todo.user.name}
                                    <br />
                                    Status: {todo.completed ? "Completed" : "Incomplete"}            
                                </Card.Text>
                                <Button variant={todo.completed ? "outline-danger":"outline-success"}
                                onClick={() => toggleTodo({ variables: { id: todo.id, completed: !todo.completed } })}>
                                    {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                                </Button>
                                <Button 
                                variant="danger"
                                onClick={() => deleteTodo({ variables: { id: todo.id } })}
                                >Delete Task</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FetchAndManageTodos;