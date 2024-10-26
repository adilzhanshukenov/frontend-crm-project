import { Company } from '../../../stores/companyStore/types';
import './companycard.css';

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <div className="company-card">
      <p>{company.name}</p>
      <button className="company-card-btn">Edit</button>
      <button className="company-card-btn">Delete</button>
    </div>
  );
};

export default CompanyCard;
