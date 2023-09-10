import { useEffect, useState } from "react";
import { useParams } from "react-router";
import JobList from "../components/JobList";
import { getCompany } from "../lib/grapqhl/queries";

function CompanyPage() {
    const { companyId } = useParams();
    const [company, setCompany] = useState(null);
    useEffect(() => {
        getCompany(companyId).then((company) => setCompany(company));
    }, [companyId]);

    if (!company) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1 className="title">{company.name}</h1>
            <div className="box">{company.description}</div>
            <JobList jobs={company.jobs} />
        </div>
    );
}

export default CompanyPage;
