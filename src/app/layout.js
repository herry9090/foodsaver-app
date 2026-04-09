import './globals.css';
import { AppProvider } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'FoodSaver | Reduce Waste, Earn Rewards',
  description: 'Report wasted food locations, earn points, and redeem rewards with FoodSaver.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <AppProvider>
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
