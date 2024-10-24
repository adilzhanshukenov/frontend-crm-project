import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import { companyStore } from "../../stores/companyStore/CompanyStore";
import Modal from "../../components/shared/modal/Modal";
import CompanyCard from "../../components/companyManagement/company-card/CompanyCard";
import { CreateCompanyForm } from "../../components/companyManagement/create-company-form/CreateCompanyForm";
import { modalStore } from "../../stores/modalStore/ModalStore";
import './companylist.css'

const CompanyList: React.FC = observer(() => {

    const handleOpenModal = () => {
        modalStore.openModal();
    };

    useEffect(() => {
        companyStore.fetchAllCompanies();
    }, [])

    const navigate = useNavigate();

    const handleCompanyClick = (companyId: string | undefined) => {
        navigate(`${companyId}/projects`)
    }

    const companyList = (
        <div>
            <ul className="list-style">
                {companyStore.companyList?.map(company => (
                    <li key={company._id} onClick={() => handleCompanyClick(company._id)}>
                        <CompanyCard company={company}/>
                    </li>
                    
                ))}
            </ul>
        </div>
    )

    return (
        <div>
            <h1>Company List</h1>
            <button onClick={handleOpenModal}>Create New Company</button>
            <Modal title="Create Company">
                <CreateCompanyForm />
            </Modal>

            {companyList}
        </div>
    )
})

export default CompanyList;