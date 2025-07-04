import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useEffect, useState, type MouseEvent } from 'react';
import Auth from '../utils/auth';
import type { tabs } from '../utils/interfaces';


export default function Header() {
    const [currentTab, setCurrentTab] = useState<tabs>('/')
    const [loggedIn] = useState(() => Auth.loggedIn())

    const checkHref = () => {
        const currentUrl: tabs = '/' + window.location.href.split('/').at(-1) as tabs;
        setCurrentTab(currentUrl)
    }

    useEffect(checkHref, [])

    const logout = (e: MouseEvent) => {
        e.preventDefault();
        Auth.logout()
        checkHref();
    }
    return (
        <Nav variant="underline" fill={true} activeKey={currentTab}>
            {
                loggedIn ?
                    (<>
                        <Nav.Item onClick={checkHref}>
                            <Nav.Link as={Link} to="/" >Profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </Nav.Item>
                    </>)
                    :
                    (<>
                        <Nav.Item onClick={checkHref}>
                            <Nav.Link as={Link} to="/login" eventKey="/login">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick={checkHref}>
                            <Nav.Link as={Link} to="/signup" eventKey="/signup">Sign Up</Nav.Link>
                        </Nav.Item>
                    </>
                    )
            }
        </Nav>
    );
}