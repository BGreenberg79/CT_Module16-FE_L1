import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { GET_USER_PROFILE } from "../queries/profileQueries"; 

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: number; lng: number;};
};

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
};

interface User {
    name: string;
    email: string;
    phone: string;
    username: string;
    website: string;
    address: Address;
    company: Company;
}


const GetUserDetails: React.FC = () => {

    const { userId } = useParams<{ userId: string }>();

    const { loading, error, data } = useQuery<{ user: User }>(GET_USER_PROFILE, {
    variables: { id: userId },
});

    if (loading) return <Container><h3>Loading...</h3></Container>

    if (error) return <Container><h3>Error Loading Profiles: {error.message}</h3></Container>

    const user = data?.user;
    if (!user) return <Container><h3>User not found</h3></Container>

    return(
        <Container>
            <h1>User Profile for {user.name}</h1>
            <div>
                <h3>User Details</h3>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Username: {user.username}</p>
                <p>Website: {user.website}</p>
            </div>
            <div>
                <h3>Company Details</h3>
                <p>Name: {user.company.name}</p>
                <p>Catch Phrase: {user.company.catchPhrase}</p>
            </div>
            <div>
                <h3>Address Details</h3>
                <p>Street: {user.address.street}</p>
                <p>Suite: {user.address.suite}</p>
                <p>City: {user.address.city}</p>
                <p>Zip Code: {user.address.zipcode}</p>
                <p>Latitue: {user.address.geo.lat}</p>
                <p>Longitude: {user.address.geo.lng}</p>
            </div>
        </Container>

    )
}
export default GetUserDetails