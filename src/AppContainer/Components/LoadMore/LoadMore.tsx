import React from "react";

interface LoadMoreProps {
  onLoadMore: () => void;
  hasMore: boolean;
}

const LoadMore: React.FC<LoadMoreProps> = ({ onLoadMore, hasMore }) => {
  return (
    <div className="load-more">
      <button
        className="light-button-2"
        onClick={onLoadMore}
        disabled={!hasMore}
      >
        Charger plus
      </button>
    </div>
  );
};

export default LoadMore;
