'use client';

export default function MultiSelect({label, options, selected, onChange}) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer shadow-sm hover:shadow-md"
          multiple 
          value={selected} 
          onChange={e => onChange(Array.from(e.target.selectedOptions, o=>o.value))}
          size={Math.min(options.length, 4)}
        >
          {options.map(option => (
            <option 
              key={option} 
              value={option}
              className="py-2 px-3 hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer"
            >
              {option}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown indicator */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {/* Selected count indicator */}
      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {selected.slice(0, 3).map(item => (
            <span 
              key={item}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {item}
            </span>
          ))}
          {selected.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              +{selected.length - 3} more
            </span>
          )}
        </div>
      )}
      
      {/* Helper text */}
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Hold Ctrl/Cmd to select multiple options
      </p>
    </div>
  );
}
