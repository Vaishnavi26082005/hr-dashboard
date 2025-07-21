'use client';
import {useEffect, useState} from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {randomDepartment, randomRating, departments} from '../../lib/mockData';
import {useBookmarks} from '../../hooks/useBookmarks';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [users, setUsers] = useState([]);
  const {bookmarks} = useBookmarks();

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=20")
      .then(res => res.json())
      .then(data => setUsers(
        data.users.map(u => ({
          ...u,
          department: randomDepartment(u.id),
          rating: randomRating(u.id)
        }))
      ));
  }, []);

  const avgRatings = departments.map(dep => {
    const depUsers = users.filter(u=>u.department===dep);
    return depUsers.length ? (depUsers.reduce((s,u)=>s+u.rating,0)/depUsers.length).toFixed(2) : 0;
  });

  const bookmarkTrends = [2, 4, 5, 9, 11, bookmarks.length];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Track performance metrics and insights across departments
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Department Ratings Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                Average Department Ratings
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Performance overview across all departments
              </p>
            </div>
            <div className="p-6">
              <div className="h-80 sm:h-96">
                <Bar
                  data={{
                    labels: departments,
                    datasets: [{
                      label: 'Average Rating',
                      data: avgRatings,
                      backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(236, 72, 153, 0.8)'
                      ],
                      borderColor: [
                        'rgb(59, 130, 246)',
                        'rgb(16, 185, 129)',
                        'rgb(245, 158, 11)',
                        'rgb(239, 68, 68)',
                        'rgb(139, 92, 246)',
                        'rgb(236, 72, 153)'
                      ],
                      borderWidth: 2,
                      borderRadius: 8,
                      borderSkipped: false,
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      },
                      tooltip: {
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(59, 130, 246, 0.5)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                          label: function(context) {
                            return `Rating: ${context.parsed.y}/5`;
                          }
                        }
                      }
                    },
                    scales: { 
                      y: { 
                        beginAtZero: true, 
                        max: 5,
                        grid: {
                          color: 'rgba(156, 163, 175, 0.2)'
                        },
                        ticks: {
                          color: 'rgba(107, 114, 128, 0.8)'
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        },
                        ticks: {
                          color: 'rgba(107, 114, 128, 0.8)',
                          maxRotation: 45
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bookmark Trends Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                Bookmark Trends
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Weekly bookmark activity pattern
              </p>
            </div>
            <div className="p-6">
              <div className="h-80 sm:h-96">
                <Line
                  data={{
                    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Today'],
                    datasets: [{
                      label: 'Bookmarks',
                      data: bookmarkTrends,
                      borderColor: 'rgb(16, 185, 129)',
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      borderWidth: 3,
                      fill: true,
                      tension: 0.4,
                      pointBackgroundColor: 'rgb(16, 185, 129)',
                      pointBorderColor: 'white',
                      pointBorderWidth: 3,
                      pointRadius: 6,
                      pointHoverRadius: 8,
                      pointHoverBackgroundColor: 'rgb(16, 185, 129)',
                      pointHoverBorderColor: 'white',
                      pointHoverBorderWidth: 3,
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      },
                      tooltip: {
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(16, 185, 129, 0.5)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                          label: function(context) {
                            return `Bookmarks: ${context.parsed.y}`;
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(156, 163, 175, 0.2)'
                        },
                        ticks: {
                          color: 'rgba(107, 114, 128, 0.8)'
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        },
                        ticks: {
                          color: 'rgba(107, 114, 128, 0.8)',
                          maxRotation: 45
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {departments.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Departments
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {users.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Employees
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {bookmarks.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Bookmarks
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {avgRatings.length ? (avgRatings.reduce((s, r) => s + parseFloat(r), 0) / avgRatings.length).toFixed(1) : '0'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avg Rating
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
