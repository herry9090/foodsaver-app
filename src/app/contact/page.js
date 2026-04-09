'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="container" style={{ padding: '60px 24px', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '16px', textAlign: 'center' }}>
        Contact <span className="gradient-text">Us</span>
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px' }}>
        Have questions, feedback, or want to partner with us? Reach out!
      </p>

      <div className="glass-panel" style={{ padding: '40px' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--accent-primary)', marginBottom: '16px' }}>Thank you!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>We've received your message and will get back to you shortly.</p>
            <button className="btn-secondary" style={{ marginTop: '24px' }} onClick={() => setSubmitted(false)}>
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label className="label">Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required 
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input 
                type="email" 
                className="input-field" 
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required 
              />
            </div>
            <div>
              <label className="label">Message</label>
              <textarea 
                className="input-field" 
                placeholder="How can we help?"
                rows="6"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-primary" style={{ marginTop: '16px', py: '14px', fontSize: '1.1rem' }}>
              Send Message
            </button>
          </form>
        )}
      </div>

      <div style={{ display: 'flex', gap: '24px', marginTop: '60px', flexWrap: 'wrap' }}>
        <div className="glass-panel" style={{ padding: '24px', flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📧</div>
          <h3>Email</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>hello@foodsaver.com</p>
        </div>
        <div className="glass-panel" style={{ padding: '24px', flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📍</div>
          <h3>Location</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>123 Green Avenue, NY 10001</p>
        </div>
        <div className="glass-panel" style={{ padding: '24px', flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📱</div>
          <h3>Phone</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>+1 (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
}
