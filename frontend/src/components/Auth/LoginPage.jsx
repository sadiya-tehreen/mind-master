// // LoginPage.jsx
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { loginUser } from '../../api';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await loginUser({ email, password });
//       console.log('User logged in:', response);
//       navigate('/dashboard');
//     } catch (err) {
//       console.error('Invalid email or password.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-300">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-1/3">
//         <h2 className="text-3xl font-bold mb-4">Login</h2>
//         <form onSubmit={handleLogin}>
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
//           <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
//             Login
//           </button>
//         </form>
//         <div className="mt-4">
//           <p>Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call the loginUser API
      const response = await loginUser({ email, password });
      
      // Log the entire response object to see its structure
      console.log('Login response:', response);

      // Check if the response contains the token
      const token = response?.token; 
      
      // Debug log: Check if token exists
      if (token) {
        // Store the token in localStorage
        localStorage.setItem('authToken', token);

        // Log the token to check if it's stored correctly
        console.log('User logged in, Token received:', token);

        // Redirect to dashboard on successful login
        navigate('/dashboard');
      } else {
        console.error('No token received in response.');
      }
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-300">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-1/3">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <label className="block mb-2">Email</label>
          <input 
            type="email" 
            className="border p-2 rounded-md w-full mb-4"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="Enter your email" 
          />
          
          <label className="block mb-2">Password</label>
          <div className="relative mb-4">
            <input 
              type={showPassword ? 'text' : 'password'}
              className="border p-2 rounded-md w-full mb-1"
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
          
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
            Login
          </button>
        </form>
        <div className="mt-4">
          <p>Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;