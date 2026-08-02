import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Sparkles, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { ParticleCanvas } from '../components/common/ParticleCanvas';
import { updateUserPassword, formatAuthError, validatePassword } from '../services/auth';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const pwdErr = validatePassword(password);
    if (pwdErr) {
      setErrorMessage(pwdErr);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await updateUserPassword(password);
      setIsLoading(false);

      if (res.error) {
        setErrorMessage(res.message || formatAuthError(res.error));
      } else {
        setSuccessMessage('Password updated successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 1800);
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(formatAuthError(err));
    }
  };

  return (
    <div className="relative h-screen max-h-screen w-full bg-[#0B1026] text-white flex flex-col justify-between overflow-hidden selection:bg-[#8A5CFF] selection:text-white page-reveal">
      <ParticleCanvas />

      {/* Ambient Lighting */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#8A5CFF]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-30 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between shrink-0">
        <button
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-2 glass-pill px-3.5 py-1.5 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Login</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-20 w-full max-w-md mx-auto px-4 flex-1 flex flex-col items-center justify-center py-2">
        {/* MindEase Logo */}
        <div className="flex flex-col items-center justify-center mb-4 text-center cursor-pointer" onClick={() => navigate('/')}>
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#B79CFF]/50 p-1 shadow-xl shadow-[#8A5CFF]/40 mb-2">
            <img
              src="/assets/images/mindease-logo.jpg"
              alt="MindEase Official Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h1 className="font-serif-heading text-2xl font-bold tracking-wide text-white text-glow">
            Set New Password
          </h1>
          <span className="text-[10px] tracking-widest uppercase text-[#B79CFF]/80 font-semibold mt-0.5">
            MindEase Security
          </span>
        </div>

        {/* Card */}
        <div className={`w-full glow-card-container ${errorMessage ? 'animate-shake' : ''}`}>
          <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-white/80">New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-9 py-2.5 glass-input text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-white/80">Confirm New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-4 py-2.5 glass-input text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 text-xs sm:text-sm font-semibold tracking-wide rounded-xl mt-4 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Updating Password...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Update Password</span>
                    <Sparkles className="w-4 h-4 text-[#F5A5D5]" />
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="relative z-20 py-3 text-center text-[10px] text-white/40">
        © {new Date().getFullYear()} MindEase • Encrypted Password Reset
      </footer>
    </div>
  );
};
