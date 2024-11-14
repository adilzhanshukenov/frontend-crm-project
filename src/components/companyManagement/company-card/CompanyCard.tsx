import { FormEvent } from 'react';
import { Company } from '../../../stores/companyStore/types';
import Button from '../../shared/button/Button';
import './companycard.css';

interface CompanyCardProps {
  company: Company;
  onEdit: () => void;
  onDelete: () => void;
  onSettings: () => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onSettings, onEdit, onDelete }) => {
  return (
    <div className="company-card">
      <p>{company.name}</p>
      <div className="card-buttons">
        <Button
          title="Settings"
          onClick={(e: FormEvent) => {
            e.stopPropagation();
            onSettings();
          }}
        />

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
