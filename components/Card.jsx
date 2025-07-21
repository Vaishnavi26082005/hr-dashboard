'use client';
import RatingBar from './RatingBar';
import Button from './Button';

export default function Card({user, onView, onBookmark, onPromote, isBookmarked}) {
  // Get department color based on department name
  const getDepartmentColor = (department) => {
    const colors = {
      'Engineering': 'from-blue-500 to-blue-600',
      'Finance': 'from-purple-500 to-purple-600', 
      'Marketing': 'from-pink-500 to-pink-600',
      'Design': 'from-indigo-500 to-indigo-600',
      'Sales': 'from-green-500 to-green-600',
      'HR': 'from-orange-500 to-orange-600'
    };
    return colors[department] || 'from-gray-500 to-gray-600';
  };

  const departmentColor = getDepartmentColor(user.department);

  return (
    <div className="group relative bg-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl border border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-slate-600">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Bookmark indicator */}
      {isBookmarked && (
        <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Avatar and Name Section */}
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${departmentColor} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0`}>
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors duration-200 truncate">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-gray-400 flex items-center gap-1 truncate">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <span className="truncate">{user.email}</span>
            </p>
          </div>
        </div>

        {/* Department Badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${departmentColor} shadow-md`}>
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8-1a1 1 0 100 2h-4a1 1 0 100-2h4z" clipRule="evenodd"/>
            </svg>
            {user.department}
          </span>
        </div>

        {/* Performance Rating Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Performance</span>
            <span className="text-sm text-gray-400">{user.rating}/5</span>
          </div>
          <div className="flex items-center gap-2">
            <RatingBar rating={user.rating} size="sm" />
            <span className="text-xs text-gray-400">
              {user.rating >= 4.5 ? 'Excellent' : 
               user.rating >= 4 ? 'Very Good' : 
               user.rating >= 3 ? 'Good' : 
               user.rating >= 2 ? 'Fair' : 'Needs Improvement'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <button 
            onClick={onView}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onBookmark();
              }}
              className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 ${
                isBookmarked 
                  ? "bg-yellow-500 hover:bg-yellow-400 text-yellow-900" 
                  : "bg-gray-600 hover:bg-gray-500 text-gray-200"
              }`}
            >
              <svg className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="hidden sm:inline">{isBookmarked ? "Saved" : "Save"}</span>
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onPromote();
              }}
              className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="hidden sm:inline">Promote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
