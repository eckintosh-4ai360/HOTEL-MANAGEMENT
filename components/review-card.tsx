'use client';

import { Review } from '@/lib/client-data';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
  authorName?: string;
}

export function ReviewCard({ review, authorName = 'Guest' }: ReviewCardProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-6">
      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-neutral-900">{review.rating}/5</span>
      </div>

      {/* Title */}
      <h4 className="font-semibold text-neutral-900 mb-2">{review.title}</h4>

      {/* Comment */}
      <p className="text-neutral-600 text-sm mb-4 line-clamp-3">{review.comment}</p>

      {/* Author and Date */}
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>{authorName}</span>
        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
