import { useState } from "react";
import axios from "axios";
import { Card, Form, Button, Alert, Spinner, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";

export default function GenerateApiKey() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateApiKey = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/genarateApiKey",
        { email, password },
        {
          withCredentials: true,
        }
      );
      setApiKey(response.data.APIKey);
    } catch (err) {
      console.error("API Key Generation Error:", err);
      setError(err.response?.data?.message || "Failed to generate API Key");
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">Generate API Key</Card.Title>
        
        <Form className="mb-4">
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button 
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>
          
          <Button 
            variant="success" 
            onClick={generateApiKey}
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
            Generate API Key
          </Button>
        </Form>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        {apiKey && (
          <Card className="bg-light mt-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong className="text-muted">Your API Key:</strong>
                  <p className="mb-0 user-select-all font-monospace">{apiKey}</p>
                </div>
                <Button 
                  variant={copied ? "success" : "outline-primary"} 
                  size="sm"
                  onClick={copyToClipboard}
                >
                  {copied ? "Copied!" : <FaCopy />}
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}
      </Card.Body>
    </Card>
  );
}
