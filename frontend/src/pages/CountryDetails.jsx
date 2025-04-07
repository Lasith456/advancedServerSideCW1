import { useState } from "react";
import axios from "axios";
import { Spinner, Card, Form, Button, Alert, Table } from "react-bootstrap";

export default function CountryDetails() {
  const [countries, setCountries] = useState([]);
  const [apikey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAllCountries = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/country",
        { apikey },
        {
          withCredentials: true,
        }
      );
      setCountries(response.data.data);
    } catch (err) {
      console.error("API Key Generation Error:", err);
      setError(err.response?.data?.message || "Failed to fetch countries");
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">All Countries</Card.Title>
        
        <Form className="mb-4">
          <Form.Group className="mb-3">
            <Form.Label>API Key</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your API Key"
              value={apikey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </Form.Group>
          
          <Button 
            variant="primary" 
            onClick={fetchAllCountries}
            disabled={loading}
            className="d-flex align-items-center"
          >
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
            )}
            Fetch Countries
          </Button>
        </Form>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        {countries.length > 0 ? (
          <div className="table-responsive">
            <Table striped hover className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Country</th>
                  <th>Currency</th>
                  <th>Capital</th>
                  <th>Languages</th>
                  <th>Flag</th>
                </tr>
              </thead>
              <tbody>
                {countries.map((country, idx) => (
                  <tr key={idx}>
                    <td className="fw-medium">{country.name.common}</td>
                    <td>
                      {country.currencies
                        ? Object.values(country.currencies)
                            .map((currency) => `${currency.name} (${currency.symbol})`)
                            .join(", ")
                        : "N/A"}
                    </td>
                    <td>{country.capital ? country.capital[0] : "N/A"}</td>
                    <td>
                      {country.languages
                        ? Object.values(country.languages).join(", ")
                        : "N/A"}
                    </td>
                    <td>
                      <img
                        src={country.flags?.png}
                        alt="Flag"
                        className="img-fluid"
                        style={{ maxWidth: "60px" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          !loading && <p className="text-muted mt-3">No countries to display. Please enter your API key and fetch countries.</p>
        )}
      </Card.Body>
    </Card>
  );
}