import '@testing-library/jest-dom';
import React from "react";
import { render, waitFor, screen } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import GetUserDetails from "../components/GetUserDetails"
import { GET_USER_PROFILE } from "../queries/profileQueries";
import { MemoryRouter, useParams } from "react-router-dom";
import { vi } from "vitest"


vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useParams: () => ({ userId: "1" }),
    MemoryRouter: vi.fn(({ children }) => <div>{children}</div>)
}));

const mockUserData = {
    request: {
        query: GET_USER_PROFILE,
        variables: { id: "1" },
    },
    result: {
        data: {
            user: {
                name: "Joe Smith",
                username: "joesmith",
                email: "joesmith@example.com",
                phone: "111-111-1111",
                website: "www.joesmith.com",
                address: {
                    street: "100 Broadway",
                    suite: "1A",
                    city: "Orlando",
                    zipcode: "30000",
                    geo: { lat: 10.1111, lng: 20.2222},
                },
                company: {
                    name: "Fake LLC",
                    catchPhrase: "Fake Phrase",
                    bs: "example",
                },
            },
        },
    },
};

describe("GetUserDetails Component", () => {
    it("renders an address as a location when fetching a query", async() => {
        render(
            <MemoryRouter>
                <MockedProvider mocks={[mockUserData]} addTypename={false}>
                    <GetUserDetails />
                </MockedProvider>
            </MemoryRouter>
        );

        await waitFor(() => screen.getByText("User Profile for Joe Smith"))

        expect(screen.getByText("Street: 100 Broadway")).toBeInTheDocument();
        expect(screen.getByText("Suite: 1A")).toBeInTheDocument();
        expect(screen.getByText("City: Orlando")).toBeInTheDocument();
        expect(screen.getByText("Zip Code: 30000")).toBeInTheDocument();
        expect(screen.getByText("Latitude: 10.1111")).toBeInTheDocument();
        expect(screen.getByText("Longitude: 20.2222")).toBeInTheDocument();
    })
})