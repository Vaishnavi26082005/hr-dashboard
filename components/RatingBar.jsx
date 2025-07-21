'use client';

export default function RatingBar({ rating, maxRating = 5, size = "md", showValue = false, interactive = false, onRatingChange }) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl"
  };

  const handleStarClick = (newRating) => {
    if (interactive && onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`flex ${sizeClasses[size]}`}>
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= rating;
          const isPartial = !isFilled && starValue - 0.5 <= rating;
          
          return (
            <button
              key={index}
              className={`relative transition-all duration-200 ${interactive ? 'hover:scale-110 cursor-pointer' : 'cursor-default'} ${
                interactive ? 'hover:drop-shadow-lg' : ''
              }`}
              onClick={() => handleStarClick(starValue)}
              disabled={!interactive}
            >
              {/* Background star */}
              <span className="text-gray-300 dark:text-gray-600">★</span>
              
              {/* Filled star */}
              {isFilled && (
                <span className="absolute inset-0 text-yellow-400 animate-pulse">★</span>
              )}
              
              {/* Partial star */}
              {isPartial && (
                <span 
                  className="absolute inset-0 text-yellow-400 overflow-hidden"
                  style={{ width: `${((rating - index) * 100)}%` }}
                >
                  ★
                </span>
              )}
              
              {/* Hover effect for interactive mode */}
              {interactive && (
                <span className="absolute inset-0 text-yellow-500 opacity-0 hover:opacity-100 transition-opacity duration-200">
                  ★
                </span>
              )}
            </button>
          );
        })}
      </div>
      
      {showValue && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-1">
          {rating.toFixed(1)}/{maxRating}
        </span>
      )}
      
      {/* Rating description */}
      {rating > 0 && (
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
          {rating >= 4.5 ? 'Excellent' : 
           rating >= 4 ? 'Very Good' : 
           rating >= 3 ? 'Good' : 
           rating >= 2 ? 'Fair' : 'Needs Improvement'}
        </span>
      )}
    </div>
  );
}
