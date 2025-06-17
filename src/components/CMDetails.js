import React from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './CMDetails.css';

const CMDetails = () => {
  const { cmCode } = useParams();
  const navigate = useNavigate();

  // This would typically come from an API call based on cmCode
  const cmDetails = {
    cmCode: cmCode,
    description: `Description for ${cmCode}`,
    status: 'Active',
    createdDate: '2024-03-15',
    lastModified: '2024-03-16',
    assignedTo: 'John Doe',
    priority: 'High',
    category: 'Software',
    additionalDetails: 'Additional information about this CM code goes here.',
    relatedDocuments: [
      { id: 1, name: 'Requirements.doc', type: 'Document' },
      { id: 2, name: 'Technical_Spec.pdf', type: 'PDF' },
    ]
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container className="cm-details-container">
      <Row className="mb-4">
        <Col className="d-flex justify-content-between align-items-center">
          <h2>CM Code Details</h2>
          <Button variant="primary" onClick={handleBack}>
            Back to Dashboard
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="details-card">
            <Card.Header as="h3">{cmDetails.cmCode}</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Table borderless>
                    <tbody>
                      <tr>
                        <td className="field-label">Description:</td>
                        <td>{cmDetails.description}</td>
                      </tr>
                      <tr>
                        <td className="field-label">Status:</td>
                        <td>{cmDetails.status}</td>
                      </tr>
                      <tr>
                        <td className="field-label">Created Date:</td>
                        <td>{cmDetails.createdDate}</td>
                      </tr>
                      <tr>
                        <td className="field-label">Last Modified:</td>
                        <td>{cmDetails.lastModified}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col md={6}>
                  <Table borderless>
                    <tbody>
                      <tr>
                        <td className="field-label">Assigned To:</td>
                        <td>{cmDetails.assignedTo}</td>
                      </tr>
                      <tr>
                        <td className="field-label">Priority:</td>
                        <td>{cmDetails.priority}</td>
                      </tr>
                      <tr>
                        <td className="field-label">Category:</td>
                        <td>{cmDetails.category}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col>
                  <h4>Additional Details</h4>
                  <p>{cmDetails.additionalDetails}</p>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col>
                  <h4>Related Documents</h4>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Document Name</th>
                        <th>Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cmDetails.relatedDocuments.map(doc => (
                        <tr key={doc.id}>
                          <td>{doc.name}</td>
                          <td>{doc.type}</td>
                          <td>
                            <Button variant="primary" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CMDetails; 