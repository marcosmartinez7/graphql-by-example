import { getJobs } from "./db/jobs.js";
export const resolvers = {
    Query: {
        jobs: () => {
            return getJobs();
        },
    },

    Job: {
        date: (job) => {
            return job.createdAt;
        },
    },
};
