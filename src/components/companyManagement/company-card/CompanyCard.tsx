import { FormEvent } from 'react';
import { Company } from '../../../stores/companyStore/types';
import { Card, CardContent, CardHeader } from '@mui/material';
import EditIconButton from '../../shared/buttons/edit-icon-button/EditIconButton';
import SettingsIconButton from '../../shared/buttons/settings-icon-button/SettingsIconButton';
import './companycard.css';
import DeleteIconButton from '../../shared/buttons/delete-icon-button/DeleteIconButton';
import styled from '@emotion/styled';

interface CompanyCardProps {
  company: Company;
  onEdit: () => void;
  onDelete: () => void;
  onSettings: () => void;
  onClick: () => void;
}

const HoverCard = styled(Card)({
  backgroundColor: 'rgb(242, 242, 242)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)', // Slightly enlarge the card
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Add a shadow on hover
    cursor: 'pointer', // Indicate clickability
  },
});

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onSettings, onEdit, onDelete, onClick }) => {
  return (
    <HoverCard className="company-card" variant="outlined" onClick={onClick}>
      <CardHeader
        title={company.name}
        action={
          <div className="card-buttons">
            <SettingsIconButton
              title="Company settings"
              onClick={(e: FormEvent) => {
                e.stopPropagation();
                onSettings();
              }}
            />
            <EditIconButton
              title="Edit"
              onClick={(e: FormEvent) => {
                e.stopPropagation();
                onEdit();
              }}
            />
            <DeleteIconButton
              title="Delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            />
          </div>
        }
      />
      <CardContent className="company-card-content">
        <div className="company-text">
          Address:
          <p>{company.address}</p>
        </div>
        <div className="company-text">
          Industry:
          <p>{company.industry}</p>
        </div>
      </CardContent>
    </HoverCard>
  );
};

export default CompanyCard;
