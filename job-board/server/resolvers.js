import { GraphQLError } from "graphql";
import { getCompany } from "./db/companies.js";
import {
    createJob,
    deleteJob,
    getJob,
    getJobByCompany,
    getJobs,
    updateJob,
} from "./db/jobs.js";

export const resolvers = {
    Query: {
        jobs: () => {
            return getJobs();
        },
        job: (_root, args) => {
            return getJob(args.id);
        },
        company: async (_root, args) => {
            const company = await getCompany(args.id);
            if (!company) {
                throw new GraphQLError(`Company not found: ${args.id}`, {
                    extensions: { code: "NOT_FOUND" },
                });
            }
            return company;
        },
    },

    Mutation: {
        createJob: async (
            _root,
            { input: { title, description } },
            context
        ) => {
            if (!context.user) {
                throw new GraphQLError(`Not authorized`, {
                    extensions: { code: "UNAUTHORIZED" },
                });
            }
            const job = await createJob({
                companyId: context.user.companyId,
                title,
                description,
            });
            return job;
        },
        deleteJob: async (_root, { id }) => {
            const job = await getJob(id);
            if (!job) {
                throw new GraphQLError(`Job not found: ${id}`, {
                    extensions: { code: "NOT_FOUND" },
                });
            }
            await deleteJob(id);
            return job;
        },
        updateJob: async (_root, { input: { id, title, description } }) => {
            const job = await updateJob({ id, title, description });
            return job;
        },
    },

    Job: {
        date: (job) => {
            return job.createdAt;
        },
        company: (job) => {
            return getCompany(job.companyId);
        },
    },

    Company: {
        jobs: (company) => {
            return getJobByCompany(company.id);
        },
    },
};
