import './header.css'

//Header of the app
const Header:React.FC= () => {
    return (
        <header className="header">
            <p>Header</p>
            <nav>
                <ul className='nav-header'>
                    <li>
                        Main
                    </li>
                    <li>
                        About
                    </li>
                    <li>
                        Contacts
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;