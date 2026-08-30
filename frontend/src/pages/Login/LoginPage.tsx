import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Lock,
  Mail,
  User,
  ShieldCheck,
} from 'lucide-react';
import { ParticleCanvas } from '../../components/common/ParticleCanvas';
import { useAuth } from '../../hooks/useAuth';

interface LoginPageProps {
  initialMode?: 'login' | 'signup';
}

export const LoginPage: React.FC<LoginPageProps> = ({ initialMode = 'login' }) => {
  const navigate = useNavigate();
  const { signIn, signUp, googleLogin, resetPassword } = useAuth();
  const [isSignUp, setIsSignUp] = useState<boolean>(initialMode === 'signup');

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Status & Feedback States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Google Account Chooser Modal State
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [showCustomGoogleForm, setShowCustomGoogleForm] = useState(false);

  // Switch form mode
  const toggleFormMode = (targetSignUp: boolean) => {
    setIsSignUp(targetSignUp);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const validatePasswordRules = (pwd: string): string | null => {
    if (!pwd || pwd.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(pwd)) {
      return 'Password must contain at least one uppercase letter (A-Z).';
    }
    if (!/[a-z]/.test(pwd)) {
      return 'Password must contain at least one lowercase letter (a-z).';
    }
    if (!/[0-9]/.test(pwd)) {
      return 'Password must contain at least one number (0-9).';
    }
    return null;
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validation checks
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    if (isSignUp) {
      const pwdErr = validatePasswordRules(password);
      if (pwdErr) {
        setErrorMessage(pwdErr);
        return;
      }
      if (!fullName.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        const res = await signUp(email, password, fullName);
        setIsLoading(false);

        if (res.error) {
          setErrorMessage(res.message || res.error.message);
        } else {
          setSuccessMessage(
            res.message || 'Account created! Entering your MindEase Sanctuary...'
          );
          if (res.session || !res.message?.includes('verify')) {
            setTimeout(() => {
              navigate('/dashboard');
            }, 1000);
          }
        }
      } else {
        const res = await signIn(email, password);
        setIsLoading(false);

        if (res.error) {
          setErrorMessage(res.message || res.error.message);
        } else {
          setSuccessMessage('Welcome back! Entering your MindEase Sanctuary...');
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        }
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'An unexpected authentication error occurred.');
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsGoogleSigningIn(true);
    
    try {
      const res = await googleLogin();
      
      if (res?.error) {
        setIsGoogleSigningIn(false);
        setErrorMessage(res.message || res.error.message || 'Failed to sign in with Google.');
      } else if (res?.user && res?.session) {
        // Demo mode (no Supabase config): googleLogin returns a fake session
        setTimeout(() => {
          setIsGoogleSigningIn(false);
          setSuccessMessage(`Signed in securely! Entering your MindEase Sanctuary...`);
          setTimeout(() => {
            navigate('/dashboard');
          }, 800);
        }, 500);
      } else {
        // Real OAuth mode: The browser is actively redirecting to Google's consent screen.
        // Keep the loading spinner active.
        setSuccessMessage('Redirecting to Google securely...');
      }
    } catch (err: any) {
      setIsGoogleSigningIn(false);
      setErrorMessage(err.message || 'An error occurred during Google sign in.');
    }
  };

  const handleSelectGoogleAccount = async (accountEmail: string, accountName: string) => {
    setIsGoogleSigningIn(true);
    try {
      const res = await googleLogin(accountEmail, accountName);
      if (res?.error) {
        setIsGoogleSigningIn(false);
        setGoogleModalOpen(false);
        setErrorMessage(res.message || res.error.message || 'Failed to sign in with Google.');
      } else {
        setTimeout(() => {
          setIsGoogleSigningIn(false);
          setGoogleModalOpen(false);
          setSuccessMessage(`Signed in as ${accountEmail}! Entering your MindEase Sanctuary...`);
          setTimeout(() => {
            navigate('/dashboard');
          }, 800);
        }, 500);
      }
    } catch (err: any) {
      setIsGoogleSigningIn(false);
      setGoogleModalOpen(false);
      setErrorMessage(err.message || 'An error occurred during Google sign in.');
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setForgotSubmitted(true);
    const res = await resetPassword(forgotEmail);
    setForgotSubmitted(false);
    setForgotModalOpen(false);

    if (res.error) {
      setErrorMessage(res.message || res.error.message);
    } else {
      setForgotEmail('');
      setSuccessMessage(res.message || 'Password reset link sent to your email.');
    }
  };

  return (
    <div className="relative h-screen max-h-screen w-full bg-[#0B1026] text-white flex flex-col justify-center items-center overflow-hidden selection:bg-[#8A5CFF] selection:text-white page-reveal p-4 sm:p-6 lg:p-8">
      {/* Background Interactive Canvas Particles */}
      <ParticleCanvas />

      {/* Ambient Lighting & Soft Blurred Orbs */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#8A5CFF]/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-[#3A2E7A]/25 rounded-full blur-[160px] pointer-events-none animate-mist" />

      {/* Top Right Shield */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-30 inline-flex items-center gap-2 text-xs text-white/50">
        <ShieldCheck className="w-5 h-5 text-[#B79CFF]" />
      </div>

      {/* Main Glassmorphism Container */}
      <div className="relative z-20 w-full max-w-6xl min-h-[750px] h-auto max-h-[95vh] glass-card overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-[#8A5CFF]/10 rounded-3xl border border-white/10 p-0">
        
        {/* Left Panel (Animation) */}
        <div className="hidden md:flex relative w-1/2 h-full bg-[#0B1026] overflow-hidden">
          <video 
            src="/assets/videos/login-animation.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Gradient Overlay for blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B1026]/80 mix-blend-multiply" />
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0B1026] to-transparent" />
          
          {/* Back to Sanctuary Button */}
          <div className="absolute top-6 left-6 z-30">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 glass-pill px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#8A5CFF]"
              aria-label="Return to MindEase Sanctuary"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Sanctuary</span>
            </button>
          </div>
        </div>

        {/* Right Panel (Form) */}
        <div className="relative w-full md:w-1/2 h-full flex flex-col justify-center items-center p-6 md:p-12 overflow-y-auto bg-[#0B1026]/40 backdrop-blur-sm">
          
          {/* Mobile Back Button */}
          <div className="md:hidden absolute top-4 left-4 z-30">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 glass-pill px-3 py-1.5 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
          </div>

          <div className="w-full max-w-sm mx-auto">
            {/* BIG MINDEASE LOGO */}
            <div className="flex flex-col items-center justify-center mb-6 text-center cursor-pointer group" onClick={() => navigate('/')}>
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#B79CFF]/50 p-0.5 shadow-xl shadow-[#8A5CFF]/40 group-hover:scale-105 transition-transform duration-300 mb-1">
                <img
                  src="/assets/images/mindease-logo.jpg"
                  alt="MindEase Official Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h1 className="font-serif-heading text-xl sm:text-2xl font-bold tracking-wide text-white text-glow group-hover:text-[#B79CFF] transition-colors">
                MindEase
              </h1>
              <span className="text-[9px] tracking-widest uppercase text-[#B79CFF]/80 font-semibold mt-0.5">
                Inner Peace Sanctuary
              </span>
            </div>

            <div className="text-center mb-6">
              <p className="text-white/60 text-sm mb-1">{isSignUp ? 'Join our community' : 'Nice to see you again'}</p>
              <h2 className="text-3xl font-bold font-serif-heading text-[#B79CFF] tracking-tight">
                {isSignUp ? 'Create Account' : 'Welcome back'}
              </h2>
            </div>

            {/* Alert Messages */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-sm flex items-center gap-2 animate-fadeIn" role="alert">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-sm flex items-center gap-2 animate-fadeIn" role="alert">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Main Auth Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4" noValidate>
              
              {/* Full Name Field (Sign Up Only) */}
              {isSignUp && (
                <div className="space-y-1.5 animate-fadeIn">
                  <label htmlFor="fullName" className="block text-xs font-semibold text-white/80">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full pl-10 pr-4 py-2 glass-input text-sm"
                      aria-required="true"
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-semibold text-white/80">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@mindease.com"
                    className="w-full pl-10 pr-4 py-2 glass-input text-sm"
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-xs font-semibold text-white/80">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2 glass-input text-sm"
                    aria-required="true"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white transition-colors cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field (Sign Up Only) */}
              {isSignUp && (
                <div className="space-y-1.5 animate-fadeIn">
                  <label htmlFor="confirmPassword" className="block text-xs font-semibold text-white/80">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2 glass-input text-sm"
                      aria-required="true"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white transition-colors cursor-pointer"
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Actions (Remember Me / Forgot Password / Terms) */}
              {!isSignUp ? (
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-white/80 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-[#8A5CFF] focus:ring-[#8A5CFF] accent-[#8A5CFF]"
                    />
                    <span>Remember Me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(true)}
                    className="text-[#B79CFF] hover:text-white transition-colors font-medium cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              ) : (
                <div className="pt-1">
                  <label className="flex items-start gap-2 text-xs text-white/80 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-[#8A5CFF] focus:ring-[#8A5CFF] accent-[#8A5CFF] mt-0.5"
                    />
                    <span>
                      I agree to the{' '}
                      <a href="#" className="text-[#B79CFF] underline hover:text-white">
                        Privacy Policy
                      </a>{' '}
                      &{' '}
                      <a href="#" className="text-[#B79CFF] underline hover:text-white">
                        Terms
                      </a>.
                    </span>
                  </label>
                </div>
              )}

              {/* Primary Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 text-sm font-semibold tracking-wide rounded-xl mt-4 relative overflow-hidden group cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
                    <Sparkles className="w-4 h-4 text-[#F5A5D5] group-hover:scale-125 transition-transform" />
                  </div>
                )}
              </button>

            </form>

            {/* Divider */}
            <div className="relative my-5 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <span className="relative z-10 px-3 bg-[#0B1026] text-[10px] uppercase tracking-widest text-white/50 font-semibold rounded-full border border-white/5">
                OR CONTINUE WITH
              </span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="glass-button-social py-2 px-4 text-sm w-full flex items-center justify-center gap-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Toggle Footer */}
            <div className="mt-5 text-center text-sm text-white/70">
              {!isSignUp ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => toggleFormMode(true)}
                    className="text-[#B79CFF] font-semibold hover:text-white transition-colors cursor-pointer"
                  >
                    Create Account
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => toggleFormMode(false)}
                    className="text-[#B79CFF] font-semibold hover:text-white transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="absolute bottom-4 z-20 text-center w-full">
        <span className="text-[11px] text-white/50 font-medium">
          © {new Date().getFullYear()} MindEase • Private Encrypted Sanctuary
        </span>
      </footer>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="glass-card max-w-sm w-full p-6 relative">
            <h3 className="text-lg font-bold font-serif-heading text-white mb-2">
              Reset Your Password
            </h3>
            <p className="text-sm text-white/70 mb-4">
              Enter your registered email address to receive password reset instructions.
            </p>

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-white/80">Email Address</label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="alex@mindease.com"
                  className="w-full px-4 py-2 glass-input text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(false)}
                  className="btn-secondary text-sm py-2 px-4 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotSubmitted}
                  className="btn-primary text-sm py-2 px-6 rounded-xl cursor-pointer"
                >
                  {forgotSubmitted ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Google Account Selector Modal */}
      {googleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#111633] border border-white/15 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl shadow-[#8A5CFF]/20 text-white">
            
            {/* Header with authentic Google branding */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md mb-3">
                <svg className="w-7 h-7" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold font-serif-heading text-white">
                Choose an account
              </h3>
              <p className="text-xs text-white/60 mt-1">
                to continue to <span className="text-[#B79CFF] font-semibold">MindEase Sanctuary</span>
              </p>
            </div>

            {isGoogleSigningIn ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 border-3 border-[#4285F4]/30 border-t-[#4285F4] rounded-full animate-spin" />
                <span className="text-xs text-white/70 font-medium animate-pulse">
                  Connecting with Google Accounts...
                </span>
              </div>
            ) : !showCustomGoogleForm ? (
              <div className="space-y-3">
                {/* Available Google Accounts */}
                {[
                  { name: 'Pranali Kalase', email: 'pranalikalase@gmail.com', avatarBg: 'bg-indigo-600', initial: 'P' },
                  { name: 'Sanskruti', email: 'sanskruti@gmail.com', avatarBg: 'bg-purple-600', initial: 'S' },
                  { name: 'Alex Morgan', email: 'alex.morgan@gmail.com', avatarBg: 'bg-emerald-600', initial: 'A' },
                ].map((acc) => (
                  <button
                    key={acc.email}
                    onClick={() => handleSelectGoogleAccount(acc.email, acc.name)}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#B79CFF]/40 transition-all cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-full ${acc.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-md group-hover:scale-105 transition-transform`}>
                        {acc.initial}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-[#B79CFF] transition-colors">
                          {acc.name}
                        </div>
                        <div className="text-xs text-white/50">{acc.email}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Signed in
                    </span>
                  </button>
                ))}

                {/* Use Another Account Option */}
                <button
                  onClick={() => setShowCustomGoogleForm(true)}
                  className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-dashed border-white/20 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer text-left mt-2"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 text-white font-bold flex items-center justify-center text-lg">
                    +
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Use another account</div>
                    <div className="text-xs text-white/50">Sign in with a different Google account</div>
                  </div>
                </button>

                <div className="pt-4 border-t border-white/10 text-[11px] text-white/40 text-center leading-relaxed">
                  To continue, Google will share your name, email address, and profile picture with MindEase Sanctuary.
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setGoogleModalOpen(false)}
                    className="text-xs text-white/60 hover:text-white transition-colors cursor-pointer px-4 py-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Custom Google Email Input Form */
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (customGoogleEmail) {
                    handleSelectGoogleAccount(customGoogleEmail, customGoogleName || customGoogleEmail.split('@')[0]);
                  }
                }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-white/80">Google Email Address</label>
                  <input
                    type="email"
                    required
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    placeholder="your.email@gmail.com"
                    className="w-full px-4 py-2.5 glass-input text-sm rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-white/80">Full Name (Optional)</label>
                  <input
                    type="text"
                    value={customGoogleName}
                    onChange={(e) => setCustomGoogleName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-4 py-2.5 glass-input text-sm rounded-xl"
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCustomGoogleForm(false)}
                    className="text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    ← Back to Accounts
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs py-2.5 px-5 rounded-xl cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
};
