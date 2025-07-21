'use client';
import React, {useEffect, useState} from 'react';
import {randomDepartment, randomRating, mockBio, mockHistory} from '../../../lib/mockData';
import RatingBar from '../../../components/RatingBar';

export default function EmployeeDetail({ params }) {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('overview');
  const unwrappedParams = React.use(params);
  useEffect(() => {
    if (!unwrappedParams?.id) return;
    fetch(`https://dummyjson.com/users/${unwrappedParams.id}`)
      .then(res => res.json())
      .then(u => {
        setUser({
          ...u,
          department: randomDepartment(u.id),
          rating: randomRating(u.id),
        });
      });
  }, [unwrappedParams?.id]);
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading employee details...</p>
        </div>
      </div>
    );
  }

  const mockProjects = [
    { name: "Q4 Marketing Campaign", status: "In Progress", completion: 75, priority: "High" },
    { name: "Website Redesign", status: "Completed", completion: 100, priority: "Medium" },
    { name: "Customer Analytics", status: "Planning", completion: 25, priority: "Low" },
  ];

  const mockFeedback = [
    { from: "Sarah Johnson", role: "Manager", feedback: "Excellent communication skills and always delivers on time.", rating: 5, date: "2025-01-15" },
    { from: "Mike Chen", role: "Colleague", feedback: "Great team player, very collaborative and helpful.", rating: 4, date: "2025-01-10" },
    { from: "Lisa Wong", role: "Client", feedback: "Professional and knowledgeable, exceeded expectations.", rating: 5, date: "2025-01-05" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        {/* Employee Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg flex-shrink-0">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            
            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900 dark:to-purple-900 dark:text-blue-200">
                  {user.department}
                </span>
                <div className="flex items-center gap-2">
                  <RatingBar rating={user.rating} showValue={true} />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  {user.phone}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 10a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd"/>
                  </svg>
                  Age {user.age}
                </span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                Promote
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {[
              { key: 'overview', label: 'Overview', icon: '👤' },
              { key: 'projects', label: 'Projects', icon: '📋' },
              { key: 'feedback', label: 'Feedback', icon: '💬' }
            ].map(tabItem => (
              <button
                key={tabItem.key}
                onClick={() => setTab(tabItem.key)}
                className={`flex-1 px-6 py-4 font-medium text-sm transition-all duration-200 ${
                  tab === tabItem.key
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="text-lg">{tabItem.icon}</span>
                  {tabItem.label}
                </span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {tab === "overview" && (
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Email:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{user.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Age:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{user.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{user.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Address:</span>
                        <span className="font-medium text-gray-900 dark:text-white text-right">
                          {user.address?.address}, {user.address?.city}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Professional Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Department:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{user.department}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                        <RatingBar rating={user.rating} showValue={true} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bio</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {mockBio(user.firstName)}
                  </p>
                </div>

                {/* Performance History */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance History</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mockHistory().map((h, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{h.year}</div>
                        <div className="mt-2">
                          <RatingBar rating={h.rating} size="sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "projects" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Projects</h3>
                <div className="space-y-4">
                  {mockProjects.map((project, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{project.name}</h4>
                          <div className="flex items-center gap-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              project.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              project.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            }`}>
                              {project.status}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              project.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                              project.priority === 'Medium' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                            }`}>
                              {project.priority} Priority
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Progress</div>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${project.completion}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{project.completion}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "feedback" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Feedback</h3>
                <div className="space-y-4">
                  {mockFeedback.map((feedback, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {feedback.from.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">{feedback.from}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{feedback.role}</div>
                            </div>
                            <div className="flex flex-col sm:items-end gap-1">
                              <RatingBar rating={feedback.rating} size="sm" />
                              <div className="text-xs text-gray-500 dark:text-gray-400">{feedback.date}</div>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            &quot;{feedback.feedback}&quot;
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
