'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={styles.footer} className="glass-panel">
      <div className="container" style={styles.container}>
        <div style={styles.brand}>
          <h2 className="gradient-text" style={{ fontFamily: 'Outfit', fontSize: '2rem', marginBottom: '16px' }}>FoodSaver</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Join the movement to reduce food waste. Report wasted food, earn points, and make the world a better, greener place.
          </p>
        </div>
        
        <div style={styles.links}>
          <h3 style={{ marginBottom: '16px' }}>Quick Links</h3>
          <Link href="/report" style={styles.link}>Report Waste</Link>
          <Link href="/rewards" style={styles.link}>Rewards</Link>
          <Link href="/dashboard" style={styles.link}>Dashboard</Link>
          <Link href="/contact" style={styles.link}>Contact Us</Link>
        </div>

        <div style={styles.newsletter}>
          <h3 style={{ marginBottom: '16px' }}>Stay Updated</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="email" placeholder="Enter your email" className="input-field" style={{ padding: '10px' }} />
            <button className="btn-primary" style={{ padding: '10px 20px' }}>Subscribe</button>
          </div>
        </div>
      </div>
      <div style={styles.bottomBar}>
        <p>© 2026 FoodSaver. All rights reserved.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: '60px',
    paddingTop: '60px',
    borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
    borderBottom: 'none',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '40px',
    paddingBottom: '40px',
  },
  brand: {
    maxWidth: '300px',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  link: {
    color: 'var(--text-secondary)',
    transition: 'var(--transition)',
  },
  newsletter: {
    display: 'flex',
    flexDirection: 'column',
  },
  bottomBar: {
    borderTop: '1px solid var(--glass-border)',
    padding: '24px 0',
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
  }
};
