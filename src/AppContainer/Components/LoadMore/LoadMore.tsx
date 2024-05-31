import React from "react";

const LoadMore: React.FC<{
  onLoadMore: () => void;
  hasMore: boolean;
}> = ({ onLoadMore, hasMore }) => {
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
