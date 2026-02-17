import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { User, Mail, Shield, Calendar, Award, BookOpen, TrendingUp, Clock, Settings, Bell, Lock } from 'lucide-react';

const Profile = () => {
  const role = localStorage.getItem('role') || 'student';
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load profile');
      setLoading(false);
    }
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
      case 'student': return 'from-blue-500 to-indigo-600';
      case 'faculty': return 'from-purple-500 to-pink-600';
      case 'admin': return 'from-orange-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'student': return 'bg-blue-100 text-blue-700';
      case 'faculty': return 'bg-purple-100 text-purple-700';
      case 'admin': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleStats = (role) => {
    switch(role) {
      case 'student':
        return [
          { icon: BookOpen, label: 'Enrolled Courses', value: '6', color: 'text-blue-600' },
          { icon: Clock, label: 'Study Hours', value: '124h', color: 'text-green-600' },
          { icon: Award, label: 'Achievements', value: '12', color: 'text-yellow-600' }
        ];
      case 'faculty':
        return [
          { icon: BookOpen, label: 'Courses Teaching', value: '4', color: 'text-purple-600' },
          { icon: User, label: 'Total Students', value: '156', color: 'text-blue-600' },
          { icon: TrendingUp, label: 'Avg. Rating', value: '4.8', color: 'text-green-600' }
        ];
      case 'admin':
        return [
          { icon: User, label: 'Total Users', value: '342', color: 'text-orange-600' },
          { icon: Shield, label: 'System Status', value: 'Active', color: 'text-green-600' },
          { icon: TrendingUp, label: 'Uptime', value: '99.9%', color: 'text-blue-600' }
        ];
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <Layout role={role}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-700 rounded w-1/4"></div>
              <div className="h-64 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout role={role}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 text-red-300">
              {error}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role={role}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">My Profile</h1>
            <p className="text-gray-400 text-lg">Manage your account information and preferences</p>
          </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Profile Card */}
            <div className="bg-gray-800/50 rounded-xl shadow-xl border border-gray-700 overflow-hidden backdrop-blur-sm">
              <div className={`bg-gradient-to-br ${getRoleColor(user?.role)} px-6 py-8`}>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                    <User size={48} className={`${user?.role === 'student' ? 'text-blue-600' : user?.role === 'faculty' ? 'text-purple-600' : 'text-orange-600'}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-white text-center">{user?.name}</h2>
                  <span className={`mt-3 px-4 py-1.5 rounded-full text-sm font-semibold ${getRoleBadgeColor(user?.role)}`}>
                    {user?.role?.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Email */}
                <div className="flex items-center space-x-3 p-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <Mail size={20} className="text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 font-medium">Email Address</p>
                    <p className="text-sm text-white truncate">{user?.email}</p>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center space-x-3 p-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <Calendar size={20} className="text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 font-medium">Member Since</p>
                    <p className="text-sm text-white">{formatDate(user?.created_at)}</p>
                  </div>
                </div>

                {/* Days Active */}
                <div className="flex items-center space-x-3 p-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <Clock size={20} className="text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 font-medium">Days Active</p>
                    <p className="text-sm text-white">{getDaysActive(user?.created_at)} days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gray-800/50 rounded-xl shadow-xl border border-gray-700 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg bg-gray-700/30 border border-gray-600 hover:bg-gray-700/50 transition-all group">
                  <Settings size={20} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">Account Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg bg-gray-700/30 border border-gray-600 hover:bg-gray-700/50 transition-all group">
                  <Bell size={20} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">Notifications</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg bg-gray-700/30 border border-gray-600 hover:bg-gray-700/50 transition-all group">
                  <Lock size={20} className="text-gray-400 group-hover:text-pink-400 transition-colors" />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">Privacy & Security</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Stats and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getRoleStats(user?.role).map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-gray-800/50 rounded-xl shadow-xl border border-gray-700 p-6 hover:bg-gray-800/70 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-lg bg-gray-700/50`}>
                        <Icon size={24} className={stat.color} />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Account Information */}
            <div className="bg-gray-800/50 rounded-xl shadow-xl border border-gray-700 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-6">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Full Name</label>
                  <p className="text-base text-white font-medium">{user?.name}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">User ID</label>
                  <p className="text-sm text-white font-mono">{user?.id?.substring(0, 8)}...</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Email Address</label>
                  <p className="text-base text-white">{user?.email}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Account Type</label>
                  <p className="text-base text-white capitalize">{user?.role}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Account Status</label>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p className="text-base text-white">Active</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Last Login</label>
                  <p className="text-base text-white">Just now</p>
                </div>
              </div>
            </div>

            {/* Activity Overview */}
            <div className="bg-gray-800/50 rounded-xl shadow-xl border border-gray-700 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">View All</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Login detected from new location</p>
                    <p className="text-xs text-gray-400 mt-1">Today at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Profile viewed</p>
                    <p className="text-xs text-gray-400 mt-1">Just now</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Account created</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(user?.created_at)}</p>
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
