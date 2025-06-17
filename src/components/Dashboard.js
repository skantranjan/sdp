import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './Dashboard.css';

const DUMMY_DATA = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  cmCode: `CM${(i + 1).toString().padStart(3, '0')}`,
  cmDescription: `Description ${i + 1}`,
  status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Inactive' : 'Pending',
}));

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50];

const Dashboard = () => {
  const navigate = useNavigate();
  // Separate state for selected filters and applied filters
  const [selectedFilters, setSelectedFilters] = useState({
    cmCode: [],
    cmDescription: [],
    status: []
  });
  const [appliedFilters, setAppliedFilters] = useState({
    cmCode: [],
    cmDescription: [],
    status: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filtering logic now uses appliedFilters instead of selectedFilters
  const filteredData = useMemo(() => {
    return DUMMY_DATA.filter(row => {
      const cmCodeMatch =
        appliedFilters.cmCode.length === 0 ||
        appliedFilters.cmCode.some(option => option.value === row.cmCode);
      const cmDescriptionMatch =
        appliedFilters.cmDescription.length === 0 ||
        appliedFilters.cmDescription.some(option => option.value === row.cmDescription);
      const statusMatch =
        appliedFilters.status.length === 0 ||
        appliedFilters.status.some(option => option.value === row.status);
      return cmCodeMatch && cmDescriptionMatch && statusMatch;
    });
  }, [appliedFilters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Reset to first page when filters are applied or page size changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters, pageSize]);

  const handleFilterChange = (filterName, selectedOptions) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: selectedOptions || []
    }));
  };

  const handleSearch = () => {
    // Apply the selected filters
    setAppliedFilters(selectedFilters);
  };

  const handleReset = () => {
    // Reset both selected and applied filters
    setSelectedFilters({
      cmCode: [],
      cmDescription: [],
      status: []
    });
    setAppliedFilters({
      cmCode: [],
      cmDescription: [],
      status: []
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  const handleCMCodeClick = (cmCode) => {
    navigate(`/cm/${cmCode}`);
  };

  // Generate pagination numbers
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    items.push(
      <li key="prev" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
          ‹
        </button>
      </li>
    );

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    items.push(
      <li key="next" className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
          ›
        </button>
      </li>
    );

    return items;
  };

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, filteredData.length);

  return (
    <Container className="dashboard">
      <Row className="filters-section">
        <Col md={3}>
          <Select
            isMulti
            name="cmCode"
            options={DUMMY_DATA.map(d => ({ value: d.cmCode, label: d.cmCode }))}
            className="filter-select"
            placeholder="CM Code"
            value={selectedFilters.cmCode}
            onChange={(selected) => handleFilterChange('cmCode', selected)}
          />
        </Col>
        <Col md={3}>
          <Select
            isMulti
            name="cmDescription"
            options={DUMMY_DATA.map(d => ({ value: d.cmDescription, label: d.cmDescription }))}
            className="filter-select"
            placeholder="CM Description"
            value={selectedFilters.cmDescription}
            onChange={(selected) => handleFilterChange('cmDescription', selected)}
          />
        </Col>
        <Col md={3}>
          <Select
            isMulti
            name="status"
            options={['Active', 'Inactive', 'Pending'].map(s => ({ value: s, label: s }))}
            className="filter-select"
            placeholder="Status"
            value={selectedFilters.status}
            onChange={(selected) => handleFilterChange('status', selected)}
          />
        </Col>
        <Col md={3} className="filter-buttons">
          <Button variant="primary" className="me-2" onClick={handleSearch}>Search</Button>
          <Button variant="secondary" onClick={handleReset}>Reset</Button>
        </Col>
      </Row>

      <Row className="table-section">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>CM Code</th>
              <th>CM Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr><td colSpan="3" className="text-center">No data found</td></tr>
            ) : (
              paginatedData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <span
                      className="cm-code-link"
                      onClick={() => handleCMCodeClick(row.cmCode)}
                    >
                      {row.cmCode}
                    </span>
                  </td>
                  <td>{row.cmDescription}</td>
                  <td>{row.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Row>

      <div className="pagination-container">
        <div className="rows-per-page">
          <span>Rows per page:</span>
          <select value={pageSize} onChange={handlePageSizeChange}>
            {ROWS_PER_PAGE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="page-info">
          {startIndex} - {endIndex} of {filteredData.length}
        </div>
        <ul className="pagination">
          {renderPaginationItems()}
        </ul>
      </div>
    </Container>
  );
};

export default Dashboard; 