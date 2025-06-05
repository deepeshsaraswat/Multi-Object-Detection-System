import React, { useEffect, useState } from 'react'; 
// The useEffect Hook allows you to perform side effects in your components.Some examples of side effects are: fetching data, directly updating the DOM, and timers. useEffect accepts two arguments. The second argument is optional.
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from './FirebaseConfig';
import './Navbar.css';
import Home from './Home';
import Model from './Model';

function App() {
  const [user, setUser] = useState(null);

  const handleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const signedInUser = result.user;
        setUser(signedInUser);
        localStorage.setItem('email', signedInUser.email);
        localStorage.setItem('name',signedInUser.name);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem('email');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  // const handleHomeClick = () => {
  //   console.log('Home button clicked'); // Placeholder for home button logic
  //   // Add logic to navigate to Home component or perform desired action
  // };

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setUser({ email: storedEmail });
    }
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="logo">Object Detection</span>
        </div>
        <ul className="nav-links">
          <li>
            {/* <button onClick={handleHomeClick} className="nav-link">
              Home
            </button> */}
          </li>
          <li>
            {/* <a href="#" className="nav-link">
              About
            </a> */}
          </li>
          <li>
            {user ? (
              
              <button onClick={handleSignOut} className="btn">
                Sign Out
              </button>
            ) : (
              <button onClick={handleSignIn} className="btn">
                Sign In
              </button>
            )}
          </li>
        </ul>
      </nav>
      {/* Display welcome message and user details if user is signed in */}
      {user && (
        <div className="welcome-message">
          <img src={user.photoURL} alt="Profile" className="profile-picture" />
         Welcome,  <span className='user-name'> { user.displayName || 'Guest'}!</span>
        </div>
      )}
      {/* Render Model if use is signIn else render Home component on user state */}
      {user ? <Model /> : <Home />}
    </>
  );
}

export default App;
