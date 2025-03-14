// // SignUpPage.jsx
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { registerUser } from '../../api';

// const SignUpPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await registerUser({ email, password });
//       console.log('User registered:', response);
//       // Redirect to dashboard on success
//       navigate('/login');
//     } catch (err) {
//       console.error('Invalid email or password.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-300">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-1/3">
//         <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
//         <form onSubmit={handleSignUp}>
//           <label className="block mb-2">Email</label>
//           <input 
//             type="email" 
//             className="border p-2 rounded-md w-full mb-4"
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//             placeholder="Enter your email" 
//           />
//           <label className="block mb-2">Password</label>
//           <input 
//             type="password" 
//             className="border p-2 rounded-md w-full mb-4"
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//             placeholder="Enter your password" 
//           />
//           <label className="block mb-2">Confirm Password</label>
//           <input 
//             type="password" 
//             className="border p-2 rounded-md w-full mb-4"
//             value={confirmPassword} 
//             onChange={(e) => setConfirmPassword(e.target.value)} 
//             required 
//             placeholder="Confirm your password" 
//           />
//           <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
//             Sign Up
//           </button>
//         </form>
//         <div className="mt-4">
//           <p>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;

// SignUpPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirming password
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format.';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter.';
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = 'Password must contain at least one lowercase letter.';
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain at least one number.';
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = 'Password must contain at least one special character (!@#$%^&*).';
    }

    // Confirm Password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await registerUser({ email, password });
      console.log('User registered:', response);
      navigate('/login');
    } catch (err) {
      console.error('Error registering user:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-300">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-1/3">
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className={`border p-2 rounded-md w-full mb-1 ${errors.email && 'border-red-500'}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}

          <label className="block mb-2">Password</label>
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`border p-2 rounded-md w-full mb-1 ${errors.password && 'border-red-500'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-500 cursor-pointer hover:text-blue-700"
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

          <label className="block mb-2">Confirm Password</label>
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className={`border p-2 rounded-md w-full mb-1 ${errors.confirmPassword && 'border-red-500'}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-500 cursor-pointer hover:text-blue-700"
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mb-4">{errors.confirmPassword}</p>}

          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
            Sign Up
          </button>
        </form>
        <div className="mt-4">
          <p>
            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;