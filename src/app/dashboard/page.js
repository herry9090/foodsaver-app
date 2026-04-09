'use client';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, points, reports } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      // Small delay prevents flicker during hydation
      const timer = setTimeout(() => {
        const currentUser = localStorage.getItem('foodsaver_user');
        if (!currentUser) {
          router.push('/');
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [user, router]);

  if (!user) return <div className="container" style={{ padding: '60px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="container" style={{ padding: '60px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem' }}>Welcome back, <span className="gradient-text">{user.name}</span>!</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Here is your impact summary.</p>
        </div>
        <Link href="/report" className="btn-primary">
          + New Report
        </Link>
      </div>

      <div style={styles.statsGrid}>
        <div className="glass-panel" style={styles.statCard}>
          <div style={styles.iconContainer}>🏅</div>
          <div>
            <p style={styles.statLabel}>Total Points</p>
            <h2 style={styles.statValue}>{points}</h2>
          </div>
        </div>
        <div className="glass-panel" style={styles.statCard}>
          <div style={styles.iconContainer}>📸</div>
          <div>
            <p style={styles.statLabel}>Reports Submitted</p>
            <h2 style={styles.statValue}>{reports.length}</h2>
          </div>
        </div>
        <div className="glass-panel" style={styles.statCard}>
          <div style={styles.iconContainer}>🎁</div>
          <div>
            <p style={styles.statLabel}>Rewards Claimed</p>
            <h2 style={styles.statValue}>{(Math.floor(points / 100)) || 0}</h2>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '40px' }}>
        {/* Recent Activity List */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h3 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: 600 }}>Recent Submissions</h3>
          
          {reports.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No reports yet. Start reporting food waste!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {reports.slice(0, 5).map((report) => (
                <div key={report.id} style={styles.reportItem}>
                  <img src={report.imageUrl || 'https://via.placeholder.com/60'} alt="Report" style={styles.reportImg} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 600 }}>{report.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{report.location} • {report.date}</p>
                  </div>
                  <div style={styles.statusBadge(report.status)}>
                    {report.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gamification / graph mock */}
        <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: 600 }}>Points Progress</h3>
          
          <div style={styles.progressContainer}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Next Reward</span>
              <span style={{ fontWeight: 600 }}>{points % 100} / 100 pts</span>
            </div>
            <div style={styles.progressBarBg}>
              <div style={{ ...styles.progressBarFill, width: `${(points % 100)}%` }}></div>
            </div>
            <p style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
              Earn {100 - (points % 100)} more points to unlock a free coffee coupon!
            </p>
          </div>

          <div style={{ marginTop: 'auto', textAlign: 'center' }}>
            <Link href="/rewards" className="btn-secondary" style={{ width: '100%', display: 'block' }}>
              View Rewards
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
  },
  statCard: {
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  iconContainer: {
    width: '60px',
    height: '60px',
    borderRadius: 'var(--radius-md)',
    background: 'rgba(16, 185, 129, 0.1)',
    color: 'var(--accent-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
  },
  statLabel: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    fontWeight: 500,
    marginBottom: '4px',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 800,
    lineHeight: 1,
  },
  reportItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--glass-border)',
  },
  reportImg: {
    width: '50px',
    height: '50px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  statusBadge: (status) => ({
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    backgroundColor: status === 'approved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
    color: status === 'approved' ? 'var(--accent-primary)' : 'var(--accent-warm)',
  }),
  progressContainer: {
    background: 'var(--bg-secondary)',
    padding: '24px',
    borderRadius: 'var(--radius-md)',
    marginBottom: '24px',
  },
  progressBarBg: {
    height: '12px',
    background: 'var(--glass-border)',
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
    borderRadius: 'var(--radius-full)',
    transition: 'width 1s ease-in-out',
  }
};
