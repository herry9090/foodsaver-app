'use client';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';

export default function RewardsPage() {
  const { points, setPoints, user } = useAppContext();
  const [redeemed, setRedeemed] = useState([]);

  const rewards = [
    { id: 1, title: '$5 Off Next Meal', cost: 100, brand: 'Green Earth Cafe', icon: '☕' },
    { id: 2, title: 'Free Dessert', cost: 150, brand: 'Sweet Leftovers', icon: '🧁' },
    { id: 3, title: '$10 Grocery Voucher', cost: 300, brand: 'EcoMart', icon: '🛒' },
    { id: 4, title: 'Mystery Gift Box', cost: 500, brand: 'FoodSaver Partners', icon: '🎁' },
  ];

  const handleRedeem = (reward) => {
    if (!user) {
      alert("Please login to redeem rewards.");
      return;
    }
    if (points >= reward.cost) {
      if (confirm(`Are you sure you want to redeem ${reward.title} for ${reward.cost} points?`)) {
        setPoints(points - reward.cost);
        localStorage.setItem('foodsaver_points', (points - reward.cost).toString());
        setRedeemed([{ ...reward, date: new Date().toLocaleDateString() }, ...redeemed]);
        alert("Coupon redeemed successfully! Check your email for details.");
      }
    } else {
      alert("Not enough points!");
    }
  };

  return (
    <div className="container" style={{ padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Rewards & <span className="gradient-text">Coupons</span></h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          Redeem your hard-earned points for exclusive discounts and freebies.
        </p>
        <div style={{ marginTop: '24px', display: 'inline-block' }} className="glass-panel">
          <div style={{ padding: '16px 32px', fontSize: '1.5rem', fontWeight: 700 }}>
            Your Points: <span className="gradient-text">{points}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {rewards.map((reward) => (
          <div key={reward.id} className="glass-panel" style={styles.rewardCard}>
            <div style={styles.rewardHeader}>
              <span style={{ fontSize: '3rem' }}>{reward.icon}</span>
              <span style={styles.costBadge}>{reward.cost} pts</span>
            </div>
            <div style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{reward.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>By {reward.brand}</p>
              
              <button 
                className={points >= reward.cost ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', opacity: points >= reward.cost ? 1 : 0.5 }}
                onClick={() => handleRedeem(reward)}
                disabled={points < reward.cost}
              >
                {points >= reward.cost ? 'Redeem Now' : 'Not enough points'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {redeemed.length > 0 && (
        <div style={{ marginTop: '60px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Redemption History</h2>
          <div className="glass-panel" style={{ padding: '24px' }}>
            {redeemed.map((item, index) => (
              <div key={index} style={{ padding: '16px 0', borderBottom: index < redeemed.length - 1 ? '1px solid var(--glass-border)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem' }}>{item.title} ({item.brand})</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Redeemed on {item.date}</p>
                </div>
                <span style={{ fontWeight: 600, color: 'var(--accent-warm)' }}>-{item.cost} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  rewardCard: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  rewardHeader: {
    background: 'var(--bg-secondary)',
    padding: '40px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  costBadge: {
    background: 'var(--accent-primary)',
    color: 'white',
    padding: '6px 12px',
    borderRadius: 'var(--radius-full)',
    fontWeight: 700,
    boxShadow: 'var(--shadow-sm)',
  }
};
