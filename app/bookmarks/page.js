'use client';
import {useBookmarks} from '../../hooks/useBookmarks';
import Card from '../../components/Card';

export default function Bookmarks() {
  const {bookmarks, remove} = useBookmarks();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            ⭐ Bookmarked Employees
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your saved team members for quick access and reference
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span>{bookmarks.length} bookmarked employees</span>
            </div>
          </div>
        </div>

        {bookmarks.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="relative mb-8">
              <div className="text-8xl mb-4 opacity-20">⭐</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl animate-bounce">📋</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-4">
              No bookmarks yet
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-8 max-w-md mx-auto">
              Start building your team favorites by bookmarking employees from the main dashboard
            </p>
            <a 
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Browse Employees
            </a>
          </div>
        ) : (
          <div>
            {/* Stats Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Bookmarks Summary
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {bookmarks.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Saved
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {new Set(bookmarks.map(b => b.department)).size}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Departments
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {bookmarks.filter(b => b.rating >= 4).length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    High Rated
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {bookmarks.length ? (bookmarks.reduce((s, b) => s + b.rating, 0) / bookmarks.length).toFixed(1) : '0'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Avg Rating
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Your Bookmarked Team
              </h2>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear All
                </button>
                <a 
                  href="/"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add More
                </a>
              </div>
            </div>

            {/* Bookmarked Employees Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bookmarks.map(u => (
                <Card
                  key={u.id}
                  user={u}
                  isBookmarked={true}
                  onView={() => window.location.href=`/employee/${u.id}`}
                  onBookmark={() => remove(u.id)}
                  onPromote={() => alert('Promoted!')}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
