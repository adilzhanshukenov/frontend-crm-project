import './companycard.css'

const CompanyCard = (props: string) => {
    return (
        <div className="company-card">
            <div className="company-image"></div>
            <p>{props}</p>
        </div>
    )
}

export default CompanyCard;