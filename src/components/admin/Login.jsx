import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/admin');
        } catch (err) {
            console.error(err);
            setError('Error al iniciar sesión. Verificá tus credenciales.');
        }

        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Panel de Administración</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button disabled={loading} type="submit" className="login-btn">
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>
            </div>

            <style jsx="true">{`
        .login-container {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-main);
          padding: 20px;
        }

        .login-card {
          background-color: var(--bg-card);
          padding: 40px;
          border-radius: var(--radius-card);
          box-shadow: var(--shadow-card);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        h2 {
          margin-bottom: 20px;
          color: var(--text-main);
        }

        .error-message {
          background-color: #ffebee;
          color: #c62828;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }

        label {
          display: block;
          margin-bottom: 5px;
          color: var(--text-secondary);
        }

        input {
          width: 100%;
          padding: 10px;
          border: 1px solid var(--border);
          border-radius: 4px;
          background-color: var(--bg-main);
          color: var(--text-main);
          font-size: 1rem;
        }

        .login-btn {
          width: 100%;
          padding: 12px;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .login-btn:hover {
          background-color: var(--secondary);
        }

        .login-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
        </div>
    );
};

export default Login;
