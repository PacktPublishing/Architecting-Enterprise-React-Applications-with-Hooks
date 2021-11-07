import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";

export default function Layout({ children }) {
  const { pathname } = useRouter();
  const localizedStrings = useContext(LocalizationContext);

  return (
    <>
      <Navbar
        variant="light"
        style={{ backgroundColor: "#dee2e6" }}
        className="mb-5"
      >
        <Container fluid style={{ maxWidth: "720px" }}>
          <Nav
            activeKey={pathname}
            style={{ marginLeft: "-0.5rem", marginRight: "-0.5rem" }}
          >
            <Link href="/" passHref>
              <Nav.Link>{localizedStrings.home}</Nav.Link>
            </Link>
            <Link href="/settings" passHref>
              <Nav.Link>{localizedStrings.settings}</Nav.Link>
            </Link>
          </Nav>
        </Container>
      </Navbar>

      <Container fluid style={{ maxWidth: "720px" }} className="mb-4">
        {children}
      </Container>
    </>
  );
}
