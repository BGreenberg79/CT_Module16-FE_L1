import React from "react";
import { Container } from "react-bootstrap";

const Home: React.FC = () => {
    return(
        <Container className="my-5 py-5">
            <h1>Welcome to your personal Dashboard App!</h1>
            <p>To access the User Posts and User Details page please pass through the apprioriate user ID number into the url. For User Posts structure the end of the url with "/user-posts/:userId". For User Details structure the end of the url with "/user-details/:userId".</p>
        </Container>
    )
}

export default Home;