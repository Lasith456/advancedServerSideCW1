import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/authenticate",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center py-5">
      <Row className="justify-content-center w-100">
        <Col md={8} lg={6} xl={5}>
          <Card className="border-0 shadow-lg">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Welcome Back</h2>
                <p className="text-muted">Sign in to continue to the dashboard</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-4">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="py-2"
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
                  type="submit" 
                  variant="primary" 
                  className="w-100 py-2 mt-3 d-flex justify-content-center align-items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <>
                      <FaSignInAlt className="me-2" /> Login
                    </>
                  )}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="mb-0">
                  Don't have an account? <a href="/register" className="text-primary fw-bold">Sign up</a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}