import { useEffect, useState } from 'react';
import { auth } from '../../data/database';

function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (!user) {
        window.location.hash = '#/login';
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) return null;
  if (!user) return null;
  return children;
}

export default PrivateRoute; 