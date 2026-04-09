'use client';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { reports, user } = useAppContext();
  const router = useRouter();

  // Mock checking if user is admin. For demo, we just check if logged in.
  if (!user) {
    return <div className="container" style={{ padding: '60px', textAlign: 'center' }}>Access Denied. Please login.</div>;
  }

  const [activeTab, setActiveTab] = useState('reports');
  const [localReports, setLocalReports] = useState(reports);

  const handleStatusUpdate = (id, newStatus) => {
    const updated = localReports.map(r => r.id === id ? { ...r, status: newStatus } : r);
    setLocalReports(updated);
    localStorage.setItem('foodsaver_reports', JSON.stringify(updated));
    alert(`Report ${newStatus} successfully!`);
  };

  return (
    <div className="container" style={{ padding: '60px 24px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Admin <span className="gradient-text">Dashboard</span></h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Manage user reports, users, and application settings.</p>

      {/* Admin stats */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <div className="glass-panel" style={{ padding: '24px', flex: 1, minWidth: '200px' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Reports</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>{localReports.length}</p>
        </div>
        <div className="glass-panel" style={{ padding: '24px', flex: 1, minWidth: '200px' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Pending Approval</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-warm)' }}>
            {localReports.filter(r => r.status === 'pending').length}
          </p>
        </div>
        <div className="glass-panel" style={{ padding: '24px', flex: 1, minWidth: '200px' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Users</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>1,204</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <button 
          className={activeTab === 'reports' ? 'btn-primary' : 'btn-secondary'} 
          onClick={() => setActiveTab('reports')}
        >
          Manage Reports
        </button>
        <button 
          className={activeTab === 'users' ? 'btn-primary' : 'btn-secondary'} 
          onClick={() => setActiveTab('users')}
        >
          Manage Users (Mock)
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
        {activeTab === 'reports' ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--glass-border)' }}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {localReports.map(report => (
                <tr key={report.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={styles.td}>#{report.id.toString().slice(-4)}</td>
                  <td style={styles.td}>
                    <img src={report.imageUrl || 'https://via.placeholder.com/40'} alt="Report" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                  </td>
                  <td style={styles.td}>{report.title}</td>
                  <td style={styles.td}>{report.location}</td>
                  <td style={styles.td}>{report.date}</td>
                  <td style={styles.td}>
                    <span style={styles.statusBadge(report.status)}>{report.status}</span>
                  </td>
                  <td style={styles.td}>
                    {report.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={styles.actionBtn('var(--accent-primary)')} onClick={() => handleStatusUpdate(report.id, 'approved')}>✓</button>
                        <button style={styles.actionBtn('var(--accent-warm)')} onClick={() => handleStatusUpdate(report.id, 'rejected')}>✗</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            User management UI coming soon.
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  th: {
    padding: '16px',
    color: 'var(--text-secondary)',
    fontWeight: 600,
  },
  td: {
    padding: '16px',
    verticalAlign: 'middle',
  },
  statusBadge: (status) => ({
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'capitalize',
    backgroundColor: status === 'approved' ? 'rgba(16, 185, 129, 0.1)' : 
                     status === 'rejected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
    color: status === 'approved' ? 'var(--accent-primary)' : 
           status === 'rejected' ? '#ef4444' : 'var(--accent-warm)',
  }),
  actionBtn: (color) => ({
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    background: 'transparent',
    border: `1px solid ${color}`,
    color: color,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
  })
};
