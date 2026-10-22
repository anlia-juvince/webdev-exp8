import React, { useState } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="card">
      <svg className="pic" viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" fill="#f4d6da" />
        {/* dress 1 */}
        <path d="M90 30 L110 30 L114 70 L150 200 L50 200 L86 70 Z" fill="#b76e79" />
        <rect x="86" y="66" width="28" height="6" fill="#2b1b2e" />
        {/* dress 2 */}
        <path d="M290 30 L310 30 L314 70 L350 200 L250 200 L286 70 Z" fill="#2b1b2e" />
        <rect x="286" y="66" width="28" height="6" fill="#e8b4bc" />
        {/* text */}
        <text x="200" y="95" textAnchor="middle" fontFamily="Georgia, serif" fontSize="28" fill="#2b1b2e">New</text>
        <text x="200" y="130" textAnchor="middle" fontFamily="Georgia, serif" fontSize="28" fill="#2b1b2e">Collection</text>
      </svg>
      <h2>Welcome to Our Fashion Boutique</h2>
      <p>Discover the latest fashion for every occasion.</p>
      <Link className="button" to="/register">Register Now</Link>
    </div>
  );
}

function Register() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", age: "", mobile: "", gender: "", state: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSubmitted(false);
  };

  const errors = {
    name: !/^[A-Za-z ]+$/.test(form.name.trim()),
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    password: !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password),
    age: !/^\d+$/.test(form.age) || Number(form.age) < 18 || Number(form.age) > 30,
    mobile: !/^\d{10}$/.test(form.mobile),
    gender: !form.gender,
    state: !form.state
  };

  const valid = Object.values(errors).every((e) => !e);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valid) setSubmitted(true);
  };

  return (
    <div className="card">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>Full Name</label>
        <input name="name" value={form.name} onChange={updateField} placeholder="Enter your name" />
        {form.name && errors.name && <small>Name must contain letters only.</small>}

        <label>Email Address</label>
        <input name="email" type="email" value={form.email} onChange={updateField} placeholder="Enter your email" />
        {form.email && errors.email && <small>Enter a valid email address.</small>}

        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={updateField} placeholder="Minimum 8 characters" />
        {form.password && errors.password && (
          <small>Use uppercase, lowercase, a number and at least 8 characters.</small>
        )}

        <label>Age</label>
        <input name="age" type="number" value={form.age} onChange={updateField} placeholder="Enter age (18-30)" />
        {form.age && errors.age && <small>Age must be between 18 and 30.</small>}

        <label>Mobile Number</label>
        <input name="mobile" type="tel" value={form.mobile} onChange={updateField} placeholder="10-digit mobile number" />
        {form.mobile && errors.mobile && <small>Enter exactly 10 digits.</small>}

        <label>Gender</label>
        <select name="gender" value={form.gender} onChange={updateField}>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <small>Gender is required.</small>}

        <label>State</label>
        <select name="state" value={form.state} onChange={updateField}>
          <option value="">Select state</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Kerala">Kerala</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
        </select>
        {errors.state && <small>State is required.</small>}

        <button type="submit" disabled={!valid}>Submit Registration</button>
        {submitted && <p className="success">Registration completed successfully!</p>}
      </form>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <header>
        <h1>Fashion Boutique</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Registration</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;