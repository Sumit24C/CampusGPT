import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import Layout from '../components/Layout';
import { User, Mail, Shield, Calendar, Award, BookOpen, TrendingUp, Clock, Settings, Bell, Lock, Edit2, Save, X, Camera, Key, Globe, Moon, Sun } from 'lucide-react';

const Profile = () => {
  const role = localStorage.getItem('role') || 'student';
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    darkMode: true,
    language: 'English'
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
      setEditedName(response.data.name);
      setLoading(false);
    } catch (err) {
      setError('Failed to load profile');
      setLoading(false);
    }
  };

  const handleSaveProfile = () => {
    setUser({ ...user, name: editedName });
    setIsEditing(false);
    // TODO: Add API call to save profile changes
  };

  const handleCancelEdit = () => {
    setEditedName(user?.name);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysActive = (dateString) => {
    const createdDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'student': return 'bg-[#3B82F6]';
      case 'faculty': return 'bg-[#8B5CF6]';
      case 'admin': return 'bg-[#F97316]';
      default: return 'bg-[#6B7280]';
    }
  };

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'student': return 'bg-[#3B82F6]/20 text-[#60A5FA] border border-[#3B82F6]/30';
      case 'faculty': return 'bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/30';
      case 'admin': return 'bg-[#F97316]/20 text-[#FB923C] border border-[#F97316]/30';
      default: return 'bg-[#6B7280]/20 text-[#9CA3AF] border border-[#6B7280]/30';
    }
  };

  const getRoleStats = (role) => {
    switch(role) {
      case 'student':
        return [
          { icon: BookOpen, label: 'Enrolled Courses', value: '6', color: 'text-[#3B82F6]' },
          { icon: Clock, label: 'Study Hours', value: '124h', color: 'text-[#10B981]' },
          { icon: Award, label: 'Achievements', value: '12', color: 'text-[#F59E0B]' }
        ];
      case 'faculty':
        return [
          { icon: BookOpen, label: 'Courses Teaching', value: '4', color: 'text-[#8B5CF6]' },
          { icon: User, label: 'Total Students', value: '156', color: 'text-[#3B82F6]' },
          { icon: TrendingUp, label: 'Avg. Rating', value: '4.8', color: 'text-[#10B981]' }
        ];
      case 'admin':
        return [
          { icon: User, label: 'Total Users', value: '342', color: 'text-[#F97316]' },
          { icon: Shield, label: 'System Status', value: 'Active', color: 'text-[#10B981]' },
          { icon: TrendingUp, label: 'Uptime', value: '99.9%', color: 'text-[#3B82F6]' }
        ];
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <Layout role={role}>
        <div className="min-h-screen p-4 sm:p-6 md:p-8">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-6 sm:h-8 bg-[#1F2937] rounded w-1/2 sm:w-1/4"></div>
              <div className="h-48 sm:h-64 bg-[#1F2937] rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout role={role}>
        <div className="min-h-screen p-4 sm:p-6 md:p-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-3 sm:p-4 text-sm sm:text-base text-red-300">
              {error}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role={role}>
      <div className="min-h-screen p-4 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F9FAFB] mb-1.5 sm:mb-2">My Profile</h1>
            <p className="text-[#9CA3AF] text-sm sm:text-base md:text-lg">Manage your account information and preferences</p>
          </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Main Profile Card */}
            <div className="bg-[#111827] rounded-xl border border-[#1F2937] overflow-hidden shadow-md shadow-black/20">
              <div className={`${getRoleColor(user?.role)} px-4 py-6 sm:px-6 sm:py-8 relative`}>
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center mb-3 sm:mb-4">
                      <User size={40} className={`sm:w-12 sm:h-12 ${user?.role === 'student' ? 'text-[#3B82F6]' : user?.role === 'faculty' ? 'text-[#8B5CF6]' : 'text-[#F97316]'}`} />
                    </div>
                    <button className="absolute bottom-3 sm:bottom-4 right-0 bg-[#6366F1] p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={14} className="text-white sm:w-4 sm:h-4" />
                    </button>
                  </div>
                  
                  {isEditing ? (
                    <div className="w-full space-y-2 sm:space-y-3">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 bg-white/20 border border-white/30 rounded-lg text-[#F9FAFB] text-center text-lg sm:text-xl font-bold placeholder-white/50"
                      />
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={handleSaveProfile}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#10B981] hover:bg-[#059669] rounded-lg text-[#F9FAFB] text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 transition-colors"
                        >
                          <Save size={14} className="sm:w-4 sm:h-4" /> Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#EF4444] hover:bg-[#DC2626] rounded-lg text-[#F9FAFB] text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 transition-colors"
                        >
                          <X size={14} className="sm:w-4 sm:h-4" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#F9FAFB] text-center">{user?.name}</h2>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-1 sm:p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <Edit2 size={14} className="text-[#F9FAFB] sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  )}
                  
                  <span className={`mt-3 px-4 py-1.5 rounded-full text-sm font-semibold ${getRoleBadgeColor(user?.role)}`}>
                    {user?.role?.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                {/* Email */}
                <div className="flex items-center space-x-2.5 sm:space-x-3 p-2.5 sm:p-3 bg-[#020617] border border-[#1F2937] rounded-lg">
                  <Mail size={18} className="text-[#9CA3AF] sm:w-5 sm:h-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-[#9CA3AF] font-medium">Email Address</p>
                    <p className="text-xs sm:text-sm text-[#F9FAFB] truncate">{user?.email}</p>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center space-x-2.5 sm:space-x-3 p-2.5 sm:p-3 bg-[#020617] border border-[#1F2937] rounded-lg">
                  <Calendar size={18} className="text-[#9CA3AF] sm:w-5 sm:h-5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-[10px] sm:text-xs text-[#9CA3AF] font-medium">Member Since</p>
                    <p className="text-xs sm:text-sm text-[#F9FAFB]">{formatDate(user?.created_at)}</p>
                  </div>
                </div>

                {/* Days Active */}
                <div className="flex items-center space-x-2.5 sm:space-x-3 p-2.5 sm:p-3 bg-[#020617] border border-[#1F2937] rounded-lg">
                  <Clock size={18} className="text-[#9CA3AF] sm:w-5 sm:h-5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-[10px] sm:text-xs text-[#9CA3AF] font-medium">Days Active</p>
                    <p className="text-xs sm:text-sm text-[#F9FAFB]">{getDaysActive(user?.created_at)} days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-[#111827] rounded-xl shadow-md shadow-black/20 border border-[#1F2937] p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#F9FAFB] mb-3 sm:mb-4">Quick Actions</h3>
              <div className="space-y-1.5 sm:space-y-2">
                <button
                  onClick={() => setShowPreferences(!showPreferences)}
                  className="w-full flex items-center space-x-2.5 sm:space-x-3 px-3 py-2.5 sm:px-4 sm:py-3 text-left rounded-lg bg-[#020617] border border-[#1F2937] hover:bg-[#1F2937]/50 transition-all group"
                >
                  <Settings size={18} className="text-[#9CA3AF] group-hover:text-[#6366F1] transition-colors sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium text-[#E5E7EB] group-hover:text-[#F9FAFB]">Preferences</span>
                </button>
                <button className="w-full flex items-center space-x-2.5 sm:space-x-3 px-3 py-2.5 sm:px-4 sm:py-3 text-left rounded-lg bg-[#020617] border border-[#1F2937] hover:bg-[#1F2937]/50 transition-all group">
                  <Key size={18} className="text-[#9CA3AF] group-hover:text-[#8B5CF6] transition-colors sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium text-[#E5E7EB] group-hover:text-[#F9FAFB]">Change Password</span>
                </button>
                <button className="w-full flex items-center space-x-2.5 sm:space-x-3 px-3 py-2.5 sm:px-4 sm:py-3 text-left rounded-lg bg-[#020617] border border-[#1F2937] hover:bg-[#1F2937]/50 transition-all group">
                  <Bell size={18} className="text-[#9CA3AF] group-hover:text-[#F59E0B] transition-colors sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium text-[#E5E7EB] group-hover:text-[#F9FAFB]">Notifications</span>
                </button>
                <button className="w-full flex items-center space-x-2.5 sm:space-x-3 px-3 py-2.5 sm:px-4 sm:py-3 text-left rounded-lg bg-[#020617] border border-[#1F2937] hover:bg-[#1F2937]/50 transition-all group">
                  <Lock size={18} className="text-[#9CA3AF] group-hover:text-[#EC4899] transition-colors sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium text-[#E5E7EB] group-hover:text-[#F9FAFB]">Privacy & Security</span>
                </button>
              </div>
            </div>

            {/* Preferences Panel */}
            {showPreferences && (
              <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-6 shadow-md shadow-black/20">
                <h3 className="text-lg font-semibold text-[#F9FAFB] mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[#020617] border border-[#1F2937] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell size={18} className="text-[#6366F1]" />
                      <span className="text-sm text-[#E5E7EB]">Email Notifications</span>
                    </div>
                    <button
                      onClick={() => setPreferences({ ...preferences, emailNotifications: !preferences.emailNotifications })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        preferences.emailNotifications ? 'bg-[#6366F1]' : 'bg-[#374151]'
                      } relative`}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.emailNotifications ? 'translate-x-6' : ''
                      }`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#020617] border border-[#1F2937] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Moon size={18} className="text-[#8B5CF6]" />
                      <span className="text-sm text-[#E5E7EB]">Dark Mode</span>
                    </div>
                    <button
                      onClick={() => setPreferences({ ...preferences, darkMode: !preferences.darkMode })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        preferences.darkMode ? 'bg-[#8B5CF6]' : 'bg-[#374151]'
                      } relative`}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.darkMode ? 'translate-x-6' : ''
                      }`}></div>
                    </button>
                  </div>

                  <div className="p-3 bg-[#020617] border border-[#1F2937] rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Globe size={18} className="text-[#10B981]" />
                      <span className="text-sm text-[#E5E7EB]">Language</span>
                    </div>
                    <select
                      value={preferences.language}
                      onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                      className="w-full px-3 py-2 bg-[#111827] border border-[#1F2937] rounded-lg text-[#F9FAFB] text-sm focus:ring-2 focus:ring-[#6366F1]"
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Hindi</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Stats and Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {getRoleStats(user?.role).map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-[#111827] rounded-xl border border-[#1F2937] p-4 sm:p-6 hover:bg-[#1F2937]/30 hover:border-[#374151] transition-all shadow-md shadow-black/20">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className={`p-2 sm:p-3 rounded-lg bg-[#020617]`}>
                        <Icon size={20} className={`${stat.color} sm:w-6 sm:h-6`} />
                      </div>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-[#F9FAFB] mb-0.5 sm:mb-1">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-[#9CA3AF]">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Achievements & Badges */}
            {user?.role === 'student' && (
              <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-4 sm:p-6 shadow-md shadow-black/20">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-[#F9FAFB]">Achievements</h3>
                  <span className="text-xs text-[#9CA3AF]">12 Total</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
                  <div className="flex flex-col items-center p-2.5 sm:p-3 bg-[#F59E0B]/20 border border-[#F59E0B]/40 rounded-lg hover:bg-[#F59E0B]/30 transition-all cursor-pointer group">
                    <Award size={22} className="text-[#FBBF24] mb-1.5 sm:mb-2 sm:w-7 sm:h-7" />
                    <span className="text-[10px] sm:text-xs text-[#E5E7EB] text-center">First Course</span>
                  </div>
                  <div className="flex flex-col items-center p-2.5 sm:p-3 bg-[#3B82F6]/20 border border-[#3B82F6]/40 rounded-lg hover:bg-[#3B82F6]/30 transition-all cursor-pointer group">
                    <BookOpen size={22} className="text-[#60A5FA] mb-1.5 sm:mb-2 sm:w-7 sm:h-7" />
                    <span className="text-[10px] sm:text-xs text-[#E5E7EB] text-center">5 Courses</span>
                  </div>
                  <div className="flex flex-col items-center p-2.5 sm:p-3 bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 rounded-lg hover:bg-[#8B5CF6]/30 transition-all cursor-pointer group">
                    <TrendingUp size={22} className="text-[#A78BFA] mb-1.5 sm:mb-2 sm:w-7 sm:h-7" />
                    <span className="text-[10px] sm:text-xs text-[#E5E7EB] text-center">Top 10%</span>
                  </div>
                  <div className="flex flex-col items-center p-2.5 sm:p-3 bg-[#10B981]/20 border border-[#10B981]/40 rounded-lg hover:bg-[#10B981]/30 transition-all cursor-pointer group">
                    <Clock size={22} className="text-[#34D399] mb-1.5 sm:mb-2 sm:w-7 sm:h-7" />
                    <span className="text-[10px] sm:text-xs text-[#E5E7EB] text-center">100 Hours</span>
                  </div>
                </div>
              </div>
            )}

            {/* Account Information */}
            <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-4 sm:p-6 shadow-md shadow-black/20">
              <h3 className="text-base sm:text-lg font-semibold text-[#F9FAFB] mb-4 sm:mb-6">Account Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#9CA3AF]">Full Name</label>
                  <p className="text-base text-[#F9FAFB] font-medium">{user?.name}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#9CA3AF]">User ID</label>
                  <p className="text-sm text-[#F9FAFB] font-mono">{user?.id?.substring(0, 8)}...</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#9CA3AF]">Email Address</label>
                  <p className="text-base text-[#F9FAFB]">{user?.email}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#9CA3AF]">Account Type</label>
                  <p className="text-base text-[#F9FAFB] capitalize">{user?.role}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#9CA3AF]">Account Status</label>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-[#10B981] rounded-full"></span>
                    <p className="text-base text-[#F9FAFB]">Active</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#9CA3AF]">Last Login</label>
                  <p className="text-base text-[#F9FAFB]">Just now</p>
                </div>
              </div>
            </div>

            {/* Skills & Progress (Student Only) */}
            {user?.role === 'student' && (
              <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-6 shadow-md shadow-black/20">
                <h3 className="text-lg font-semibold text-[#F9FAFB] mb-6">Skills & Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-[#E5E7EB]">Python Programming</span>
                      <span className="text-sm text-[#60A5FA] font-medium">85%</span>
                    </div>
                    <div className="w-full bg-[#1F2937] rounded-full h-2">
                      <div className="bg-[#3B82F6] h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-[#E5E7EB]">Web Development</span>
                      <span className="text-sm text-[#A78BFA] font-medium">72%</span>
                    </div>
                    <div className="w-full bg-[#1F2937] rounded-full h-2">
                      <div className="bg-[#8B5CF6] h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-[#E5E7EB]">Data Science</span>
                      <span className="text-sm text-[#34D399] font-medium">68%</span>
                    </div>
                    <div className="w-full bg-[#1F2937] rounded-full h-2">
                      <div className="bg-[#10B981] h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-[#E5E7EB]">Machine Learning</span>
                      <span className="text-sm text-[#FBBF24] font-medium">54%</span>
                    </div>
                    <div className="w-full bg-[#1F2937] rounded-full h-2">
                      <div className="bg-[#F59E0B] h-2 rounded-full" style={{ width: '54%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bio Section */}
            <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-6 shadow-md shadow-black/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#F9FAFB]">About</h3>
                <button className="text-sm text-[#6366F1] hover:text-[#818CF8] font-medium flex items-center gap-1">
                  <Edit2 size={14} /> Edit
                </button>
              </div>
              <p className="text-[#E5E7EB] text-sm leading-relaxed">
                {user?.role === 'student' 
                  ? "Passionate computer science student with a keen interest in artificial intelligence and machine learning. Always eager to learn new technologies and apply them to solve real-world problems."
                  : user?.role === 'faculty'
                  ? "Experienced educator dedicated to fostering an engaging learning environment. Specialized in modern teaching methodologies and student mentorship."
                  : "Experienced system administrator ensuring smooth operations and optimal performance of the campus management system."}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-[#3B82F6]/20 text-[#60A5FA] rounded-full text-xs border border-[#3B82F6]/30">
                  {user?.role === 'student' ? 'Python' : user?.role === 'faculty' ? 'Teaching' : 'Administration'}
                </span>
                <span className="px-3 py-1 bg-[#8B5CF6]/20 text-[#A78BFA] rounded-full text-xs border border-[#8B5CF6]/30">
                  {user?.role === 'student' ? 'React' : user?.role === 'faculty' ? 'Research' : 'Security'}
                </span>
                <span className="px-3 py-1 bg-[#10B981]/20 text-[#34D399] rounded-full text-xs border border-[#10B981]/30">
                  {user?.role === 'student' ? 'Machine Learning' : user?.role === 'faculty' ? 'Mentorship' : 'Analytics'}
                </span>
                <span className="px-3 py-1 bg-[#F59E0B]/20 text-[#FBBF24] rounded-full text-xs border border-[#F59E0B]/30">
                  {user?.role === 'student' ? 'Team Player' : user?.role === 'faculty' ? 'Innovation' : 'Management'}
                </span>
              </div>
            </div>

            {/* Activity Overview */}
            <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-6 shadow-md shadow-black/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#F9FAFB]">Recent Activity</h3>
                <button className="text-sm text-[#6366F1] hover:text-[#818CF8] font-medium">View All</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-[#020617] border border-[#1F2937] rounded-lg">
                  <div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#F9FAFB]">Login detected from new location</p>
                    <p className="text-xs text-[#9CA3AF] mt-1">Today at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-[#020617] border border-[#1F2937] rounded-lg">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#F9FAFB]">Profile viewed</p>
                    <p className="text-xs text-[#9CA3AF] mt-1">Just now</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-[#020617] border border-[#1F2937] rounded-lg">
                  <div className="w-2 h-2 bg-[#8B5CF6] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#F9FAFB]">Account created</p>
                    <p className="text-xs text-[#9CA3AF] mt-1">{formatDate(user?.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Profile;
