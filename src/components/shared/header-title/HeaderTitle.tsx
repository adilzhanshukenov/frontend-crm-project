interface HeaderTitleProps {
    title: string;
}

const HeaderTitle = ({title} : HeaderTitleProps) => {
    return (
        <h1>{title}</h1>
    )
}

export default HeaderTitle