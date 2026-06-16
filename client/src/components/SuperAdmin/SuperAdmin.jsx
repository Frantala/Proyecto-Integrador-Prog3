import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { authFetch } from "../../utils/authFetch";
import { useNavigate } from "react-router-dom";

const SuperAdmin = () => {
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState("success");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
      return;
    }

    const isSuper = user.role === "super-admin" || user.role === "superadmin";
    if (!isSuper) {
      navigate("/");
      return;
    }
  }, [token, user, navigate]);

  const doAction = async (action) => {
    if (!email.trim()) {
      setVariant("danger");
      setMessage("Ingrese un email válido");
      return;
    }

    setLoading(true);
    try {
      const response = await authFetch(`http://localhost:3000/api/users/${action}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ email })
      }, logout, navigate);

      const data = await response.json().catch(() => ({}));
      setVariant(response.ok ? "success" : "danger");
      setMessage(data.message || (response.ok ? "Operación realizada" : "Error"));
    } catch (err) {
      setVariant("danger");
      setMessage(err.message || "Error en la operación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center pt-5">
      <h2 className="mb-4">SuperAdmin</h2>

      {message && (
        <Alert variant={variant} style={{ maxWidth: 480, textAlign: "center" }}>
          {message}
        </Alert>
      )}

      <Form style={{ width: "100%", maxWidth: 480, textAlign: "center" }}>
        <Form.Group controlId="email">
          <Form.Control
            type="email"
            placeholder="Ingrese el email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-center gap-3 mt-3">
          <Button variant="primary" onClick={() => doAction("promote")} disabled={loading}>
            Agregar Admin
          </Button>
          <Button variant="danger" onClick={() => doAction("demote")} disabled={loading}>
            Eliminar Admin
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default SuperAdmin;
