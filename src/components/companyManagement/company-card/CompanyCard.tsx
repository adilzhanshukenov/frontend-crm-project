import { Company } from '../../../stores/companyStore/types';
import './companycard.css'

const CompanyCard = ({company}: {company:Company}) => {
    return (
        <div className="company-card">
            <p>{company.name}</p>
        </div>
    )
}

export default CompanyCard;