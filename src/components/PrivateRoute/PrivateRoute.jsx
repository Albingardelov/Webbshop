import { useEffect, useState } from 'react';
import { auth } from '../../data/database';
import { useNavigate } from 'react-router';

function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (!user) {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) return null;
  if (!user) return null;
  return children;
}

export default PrivateRoute; 