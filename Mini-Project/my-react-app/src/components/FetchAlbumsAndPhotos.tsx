import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALBUMS_AND_PHOTOS } from '../queries/albumQueries';
import { Container, Card, Form, Row, Col } from 'react-bootstrap';

const FetchAlbumsAndPhotos: React.FC = () => {
    const [userId, setUserId] = useState("1");

    const { loading, error, data } = useQuery(GET_ALBUMS_AND_PHOTOS, {
        variables: {
            userId: userId,
        },
    });

    // If there is no userId filtering all albums and photos will be displayed, if search bar is filled out it will filter

    if (loading) return <Container><h3>Loading...</h3></Container>
    if (error) return <Container><h3>Error: {error.message}</h3></Container>

    return (
        <Container>
            <h1>Photo Albums</h1>
            <Form>
                <Form.Label>Filter User ID:</Form.Label>
                <Form.Control
                type="text"
                placeholder="Filter by user id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                />
            </Form>
            <Row>
                {data.albums.data.map((album: any) => (
                    <Col key ={album.id} md={6} lg={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{album.title} by {album.user.name}</Card.Title>
                            </Card.Body>
                            <Row>
                                {album.photos.data.map((photo: any) => (
                                    <Col key={photo.id} xs={6} sm={4} md={3}>
                                        <Card>
                                            <Card.Img variant="top" src={photo.thumbnailUrl}/>
                                            <Card.Body>
                                                <Card.Text>{photo.title}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
};

export default FetchAlbumsAndPhotos;