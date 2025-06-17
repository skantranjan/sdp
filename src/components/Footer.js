import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col md={4} className="footer-section">
            <h5>About SDP Portal</h5>
            <p>A comprehensive system for managing and tracking CM codes and their descriptions.</p>
          </Col>
          <Col md={4} className="footer-section">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/help">Help</a></li>
            </ul>
          </Col>
          <Col md={4} className="footer-section">
            <h5>Contact Info</h5>
            <ul>
              <li>Email: support@sdpportal.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 SDP Street, Tech City</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="footer-bottom">
            <p>&copy; {currentYear} SDP Portal. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 