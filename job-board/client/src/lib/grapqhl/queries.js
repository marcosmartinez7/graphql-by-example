import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:9000/graphql");
export async function getJobs() {
    const query = gql`
        {
            jobs {
                id
                date
                title
                company {
                    id
                    name
                }
            }
        }
    `;
    const { jobs } = await client.request(query);
    return jobs;
}

export async function getJob(id) {
    const query = gql`
        query Job($id: ID!) {
            job(id: $id) {
                id
                date
                title
                description
                company {
                    id
                    name
                }
            }
        }
    `;
    const { job } = await client.request(query, { id });
    return job;
}

export async function getCompany(id) {
    const query = gql`
        query Company($id: ID!) {
            company(id: $id) {
                id
                name
                description
                jobs {
                    id
                    title
                    date
                }
            }
        }
    `;
    const { company } = await client.request(query, { id });
    return company;
}
