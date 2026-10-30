import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, UserPlus } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuthStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [regError, setRegError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegError('');
    if (formData.password.length < 6) {
      setRegError('Password must be at least 6 characters.');
      return;
    }
    const res = await register(formData);
    if (res.success) {
      navigate('/');
    } else {
      setRegError(res.message);
    }
  };

  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.25rem' }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: '#ffffff',
        borderRadius: '24px',
        padding: '2.5rem',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-xl)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #10b981, #0284c7)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            marginBottom: '0.85rem',
            boxShadow: '0 8px 18px rgba(16, 185, 129, 0.3)'
          }}>
            🥬
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: '800', marginBottom: '0.35rem' }}>Create FreshMart Account</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Join for farm-fresh grocery deliveries & exclusive member deals</p>
        </div>

        {(regError || error) && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.86rem' }}>
            {regError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
              Full Name *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.6rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-subtle)', outline: 'none' }}
              />
              <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
              Email Address *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.6rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-subtle)', outline: 'none' }}
              />
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
              Phone Number
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.6rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-subtle)', outline: 'none' }}
              />
              <Phone size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
              Create Password (min 6 chars) *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.6rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-subtle)', outline: 'none' }}
              />
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-emerald"
            style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}
          >
            <UserPlus size={18} />
            <span>{loading ? 'Registering...' : 'Complete Registration'}</span>
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700' }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
