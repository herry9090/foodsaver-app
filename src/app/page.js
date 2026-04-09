import Link from 'next/link';

export default function Home() {
  return (
    <div className="container" style={{ paddingTop: '60px' }}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent} className="animate-fade-in">
          <h1 style={styles.heroTitle}>
            Turn <span className="gradient-text">Food Waste</span> into <span className="gradient-text">Rewards</span>.
          </h1>
          <p style={styles.heroSubtitle}>
            Join the movement to save the planet. Report leftover or wasted food, earn points, and redeem them for exciting coupons. Every small action counts!
          </p>
          <div style={styles.heroButtons}>
            <Link href="/report" className="btn-primary">Report Waste Now</Link>
            <Link href="/dashboard" className="btn-secondary">View Dashboard</Link>
          </div>
        </div>
        <div style={styles.heroImageContainer} className="animate-float">
          <img 
            src="/hero_image.png" 
            alt="People saving food" 
            style={styles.heroImage} 
            className="glass-panel"
          />
        </div>
      </section>

      {/* How it Works Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>How it <span className="gradient-text">Works</span></h2>
        <div style={styles.cardsContainer}>
          <div className="glass-panel" style={styles.card}>
            <div style={styles.icon}>📸</div>
            <h3>1. Snap & Report</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Take a photo of wasted or leftover food and submit its location to the map.</p>
          </div>
          <div className="glass-panel" style={styles.card}>
            <div style={styles.icon}>⭐</div>
            <h3>2. Earn Points</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Get 10 points for every valid report you submit to the community.</p>
          </div>
          <div className="glass-panel" style={styles.card}>
            <div style={styles.icon}>🎁</div>
            <h3>3. Get Rewards</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Collect 100 points and redeem them for exclusive discount coupons!</p>
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section style={styles.impactSection} className="glass-panel">
        <h2 style={styles.sectionTitle}>Our <span className="gradient-text">Impact</span></h2>
        <div style={styles.statsContainer}>
          <div style={styles.statBox}>
            <h3 style={styles.statNumber}>12,450+</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Reports Submitted</p>
          </div>
          <div style={styles.statBox}>
            <h3 style={styles.statNumber}>8,000kg</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Food Saved</p>
          </div>
          <div style={styles.statBox}>
            <h3 style={styles.statNumber}>5,230</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Active Users</p>
          </div>
          <div style={styles.statBox}>
            <h3 style={styles.statNumber}>$45k</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Rewards Claimed</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  hero: {
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
    minHeight: '80vh',
    flexWrap: 'wrap',
  },
  heroContent: {
    flex: '1 1 400px',
  },
  heroTitle: {
    fontSize: '4.5rem',
    fontWeight: '800',
    lineHeight: '1.1',
    marginBottom: '24px',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: 'var(--text-secondary)',
    marginBottom: '40px',
    lineHeight: '1.6',
    maxWidth: '540px',
  },
  heroButtons: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  heroImageContainer: {
    flex: '1 1 400px',
    display: 'flex',
    justifyContent: 'center',
  },
  heroImage: {
    width: '100%',
    maxWidth: '500px',
    height: 'auto',
    borderRadius: 'var(--radius-lg)',
    padding: '12px',
  },
  section: {
    padding: '100px 0',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '60px',
    fontWeight: '700',
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  card: {
    padding: '40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  icon: {
    fontSize: '3rem',
    background: 'var(--bg-secondary)',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    marginBottom: '16px',
  },
  impactSection: {
    padding: '60px',
    margin: '60px 0',
    textAlign: 'center',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: '800',
    color: 'var(--accent-primary)',
  }
};
