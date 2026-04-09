'use client';

import { useEffect, useState } from 'react';
import { db, auth } from "../../firebase";
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      router.push('/login'); // redirect if not logged in
    }
  });

  return () => unsubscribe();
}, []);

  // Fetch data from Firebase

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(data);
    };

    fetchData();
  }, []);

  if (!user) {
  return <p>Loading...</p>;
}

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Dashboard</h1>

      {messages.length === 0 ? (
        <p>No messages found</p>
      ) : (
        <div>
          {messages.map((msg) => (
            <div key={msg.id} style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "10px"
            }}>
              <h3>{msg.name}</h3>
              <p><b>Email:</b> {msg.email}</p>
              <p><b>Message:</b> {msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}