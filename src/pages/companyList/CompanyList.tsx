import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { companyStore } from "../../stores/companyStore/CompanyStore";
import { useNavigate } from 'react-router-dom';

const CompanyList = observer(() => {

    useEffect(() => {
        companyStore.fetchAllCompanies();
    }, [])

    const navigate = useNavigate();

    const handleCompanyClick = (companyId: string) => {
        navigate(`${companyId}/projects`)
    }

    const companyList = (
        <div>
            <ul>
                {companyStore.companyList?.map(company => (
                    <li key={company._id} onClick={() => handleCompanyClick(company._id)}>
                        Company ID:{company._id} <br />
                        Company Name:{company.name} <br />
                        Company Address: {company.address}<br />
                        Company Industry: {company.industry}
                    </li>
                    
                ))}
            </ul>
        </div>
    )

    return (
        <div>
            <h1>Company List</h1>
            {companyList}
        </div>
    )
})

export default CompanyList;