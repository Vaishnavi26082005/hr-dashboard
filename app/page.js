'use client';
import {useEffect, useState} from 'react';
import Card from '../components/Card';
import SkeletonCard from '../components/SkeletonCard';
import {useBookmarks} from '../hooks/useBookmarks';
import {useSearch} from '../hooks/useSearch';
import MultiSelect from '../components/MultiSelect';
import {randomDepartment, randomRating} from '../lib/mockData';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [depFilter, setDepFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([]);
  const {bookmarks, add} = useBookmarks();

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/users?limit=20")
      .then(res => res.json())
      .then(data => {
        setUsers(data.users.map(u => ({
          ...u,
          department: randomDepartment(u.id),
          rating: randomRating(u.id)
        })));
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const {query, setQuery, filtered} = useSearch(users, ['firstName','lastName','email','department']);
  const departments = Array.from(new Set(users.map(u=>u.department)));
  const ratings = [1,2,3,4,5];

  const visible = filtered.filter(u => 
    (depFilter.length === 0 || depFilter.includes(u.department)) &&
    (ratingFilter.length === 0 || ratingFilter.includes(u.rating.toString()))
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            HR Dashboard
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Manage your team efficiently with our modern employee management system
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>{loading ? 'Loading...' : `${visible.length} employees found`}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>{bookmarks.length} bookmarked</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">🔍</span>
            Search & Filter Employees
          </h2>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Search Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search employees
              </label>
              <div className="relative">
                <input 
                  value={query} 
                  onChange={e=>setQuery(e.target.value)} 
                  placeholder={loading ? "Loading employees..." : "Search by name, email, or department..."} 
                  disabled={loading}
                  className={`w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {loading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <div className="min-w-0 sm:w-48">
                <MultiSelect 
                  label="Department" 
                  options={departments} 
                  selected={depFilter} 
                  onChange={setDepFilter} 
                />
              </div>
              <div className="min-w-0 sm:w-32">
                <MultiSelect 
                  label="Rating" 
                  options={ratings.map(String)} 
                  selected={ratingFilter} 
                  onChange={setRatingFilter} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Team Members
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Showing {visible.length} of {users.length} employees
              </span>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.553.894l-2 1A1 1 0 018 16v-4.586L3.293 6.707A1 1 0 013 6V4z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 000 2h.01a1 1 0 100-2H3zM6 4a1 1 0 000 2h11a1 1 0 100-2H6zM3 10a1 1 0 100 2h.01a1 1 0 100-2H3zM6 10a1 1 0 100 2h11a1 1 0 100-2H6zM3 16a1 1 0 100 2h.01a1 1 0 100-2H3zM6 16a1 1 0 100 2h11a1 1 0 100-2H6z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Cards Grid */}
        {loading ? (
          /* Loading State with Skeleton Cards */
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="h-8 bg-slate-700 rounded w-48 animate-pulse"></div>
              <div className="flex items-center gap-4">
                <div className="h-5 bg-slate-700 rounded w-32 animate-pulse"></div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-slate-700 rounded-lg animate-pulse"></div>
                  <div className="w-8 h-8 bg-slate-700 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No employees found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Try adjusting your search criteria or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visible.map(u => (
              <Card
                key={u.id}
                user={u}
                isBookmarked={bookmarks.some(b=>b.id===u.id)}
                onView={() => window.location.href=`/employee/${u.id}`}
                onBookmark={() => add(u)}
                onPromote={() => alert("Promote!")}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
