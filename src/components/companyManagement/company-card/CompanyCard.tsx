import { FormEvent } from 'react';
import { Company } from '../../../stores/companyStore/types';
import Button from '../../shared/button/Button';
import './companycard.css';

interface CompanyCardProps {
  company: Company;
  onEdit: () => void;
  onDelete: () => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onEdit, onDelete }) => {
  return (
    <div className="company-card">
      <p>{company.name}</p>
      <div>
        <Button
          title="Edit"
          onClick={(e: FormEvent) => {
            e.stopPropagation();
            onEdit();
          }}
        />

        <Button
          title="Delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      </div>
    </div>
  );
};

export default CompanyCard;
