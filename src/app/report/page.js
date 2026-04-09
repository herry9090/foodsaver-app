'use client';
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/navigation';

export default function ReportPage() {
  const { addReport, user } = useAppContext();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    image: null,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first to submit a report!");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate AI image validation & network delay
    setTimeout(() => {
      addReport({
        title: formData.title,
        location: formData.location,
        description: formData.description,
        imageUrl: previewURL || 'https://via.placeholder.com/400x300?text=Food+Waste',
      });
      setIsSubmitting(false);
      alert("Report submitted successfully! You earned 10 points.");
      router.push('/dashboard');
    }, 1500);
  };

  const handleAutoLocation = () => {
    setFormData({ ...formData, location: "Detecting..." });
    setTimeout(() => {
      setFormData({ ...formData, location: "123 Green Street, Sector 4, CA" });
    }, 800);
  };

  return (
    <div className="container" style={{ padding: '60px 24px', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '16px', textAlign: 'center' }}>
        Report <span className="gradient-text">Food Waste</span>
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px' }}>
        Help us locate food waste. Earn 10 points for every valid report!
      </p>

      <div className="glass-panel" style={{ padding: '40px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div>
            <label className="label">Photo of Food Waste</label>
            <div style={styles.imageUpload}>
              {previewURL ? (
                <img src={previewURL} alt="Preview" style={styles.preview} />
              ) : (
                <div style={styles.uploadPlaceholder}>
                  <span style={{ fontSize: '2rem' }}>📸</span>
                  <p>Click to upload or drag and drop</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={styles.fileInput} 
                required 
              />
            </div>
          </div>

          <div>
            <label className="label">Title / Type of Food</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Leftover buffet food from wedding"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required 
            />
          </div>

          <div>
            <label className="label">Location</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Enter location manually"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required 
              />
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={handleAutoLocation}
              >
                📍 Auto
              </button>
            </div>
          </div>

          <div>
            <label className="label">Description & Quantity (Optional)</label>
            <textarea 
              className="input-field" 
              placeholder="Provide any details that might be helpful..."
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isSubmitting}
            style={{ marginTop: '16px', py: '14px', fontSize: '1.1rem' }}
          >
            {isSubmitting ? 'Validating Image & Submitting...' : 'Submit Report & Earn Points'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  imageUpload: {
    border: '2px dashed var(--glass-border)',
    borderRadius: 'var(--radius-md)',
    position: 'relative',
    height: '240px',
    background: 'var(--bg-secondary)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'var(--transition)',
  },
  uploadPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: 'var(--text-secondary)',
    gap: '12px',
    pointerEvents: 'none',
  },
  preview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
  },
  fileInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  }
};
