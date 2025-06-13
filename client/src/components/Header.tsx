import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <Nav variant="tabs" defaultActiveKey="/">
            <Nav.Item>
                <Nav.Link as={Link} to="/" >Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/login" eventKey="/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/signup" eventKey="/signup">Sign Up</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}