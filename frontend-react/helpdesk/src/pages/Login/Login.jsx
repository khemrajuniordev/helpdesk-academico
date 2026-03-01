import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { login } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!email.trim() || !senha.trim()) {
            setErro('Preencha todos os campos');
            return;
        }

        setLoading(true);
        setErro('');

        try {
            const result = await login(email, senha);
            if (result.success) {
                navigate('/');
            }
        } catch {
            setErro('Erro ao conectar. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-card animate-fade-in">
                {/* Header Azul */}
                <div className="login-header">
                    <div className="login-icon">
                        <ShieldCheck size={32} />
                    </div>
                    <h1>HelpDesk System</h1>
                    <p>Gestão de chamados e suporte técnico</p>
                </div>

                {/* Formulário */}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label">✉ Mail Corporativo</label>
                        <input
                            id="login-email"
                            type="email"
                            className="input-field"
                            placeholder="ex: tecnico@empresa.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Senha</label>
                        <input
                            id="login-senha"
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                        />
                    </div>

                    {erro && <p className="login-error">{erro}</p>}

                    <button
                        id="login-submit"
                        type="submit"
                        className="btn btn-primary login-btn"
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar no Sistema'}
                    </button>
                </form>

                <p className="login-footer">Projeto Acadêmico - Full Stack & Análise de Dados</p>
            </div>
        </div>
    );
}

export default Login;
