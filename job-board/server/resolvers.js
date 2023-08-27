export const resolvers = {
    Query: {
        jobs: () => {
            return (
                [
                    {
                        description: "Sw engineer job description",
                        title: "Software Engineer",
                        company: "Google",
                        id: "1",
                    },
                ],
                null
            );
        },
    },
};
