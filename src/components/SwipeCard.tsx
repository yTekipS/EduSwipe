import React, { useEffect, useState } from 'react';
import { School } from '../types';

interface SwipeCardProps {
  school: School;
  onSwipe: (direction: 'left' | 'right') => void;
  onSuperLike?: () => void;
  onVisualChange?: (direction: 'left' | 'right' | 'neutral', intensity: number) => void;
}

const SWIPE_THRESHOLD = 100;
const SUPERLIKE_THRESHOLD = 110;
const SWIPE_OUT_DISTANCE = 520;
const SWIPE_ANIMATION_MS = 220;

export const SwipeCard: React.FC<SwipeCardProps> = ({
  school,
  onSwipe,
  onSuperLike,
  onVisualChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragOffsetY, setDragOffsetY] = useState(0);
  const [swipeOut, setSwipeOut] = useState<'left' | 'right' | null>(null);

  const triggerSwipe = (direction: 'left' | 'right') => {
    if (swipeOut) return;
    setSwipeOut(direction);

    window.setTimeout(() => {
      onSwipe(direction);
      setSwipeOut(null);
      setDragOffset(0);
    }, SWIPE_ANIMATION_MS);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setSwipeOut(null);
    setDragStart(e.clientX);
    setDragStartY(e.clientY);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStart);
    setDragOffsetY(e.clientY - dragStartY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = e.clientX - dragStart;
    const diffY = e.clientY - dragStartY;
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (
      onSuperLike &&
      diffY < -SUPERLIKE_THRESHOLD &&
      Math.abs(diffY) > Math.abs(diff) * 1.1
    ) {
      onSuperLike();
      setDragOffset(0);
      setDragOffsetY(0);
      return;
    }

    if (Math.abs(diff) >= SWIPE_THRESHOLD) {
      triggerSwipe(diff > 0 ? 'right' : 'left');

      return;
    }

    setDragOffset(0);
    setDragOffsetY(0);
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setDragOffset(0);
    setDragOffsetY(0);
    setSwipeOut(null);
  };

  const x = swipeOut
    ? swipeOut === 'right'
      ? SWIPE_OUT_DISTANCE
      : -SWIPE_OUT_DISTANCE
    : dragOffset;

  const rotate = swipeOut
    ? swipeOut === 'right'
      ? 16
      : -16
    : dragOffset * 0.05;

  const likeOpacity = Math.max(0, Math.min(1, dragOffset / SWIPE_THRESHOLD));
  const nopeOpacity = Math.max(0, Math.min(1, -dragOffset / SWIPE_THRESHOLD));
  const superLikeOpacity = onSuperLike ? Math.max(0, Math.min(1, -dragOffsetY / SUPERLIKE_THRESHOLD)) : 0;
  const rightBgOpacity = Math.max(0, Math.min(0.28, dragOffset / 260));
  const leftBgOpacity = Math.max(0, Math.min(0.28, -dragOffset / 260));
  const swipeBackground =
    dragOffset > 0
      ? `rgba(22, 163, 74, ${rightBgOpacity})`
      : dragOffset < 0
        ? `rgba(185, 28, 28, ${leftBgOpacity})`
        : 'transparent';

  const visualDirection: 'left' | 'right' | 'neutral' = swipeOut
    ? swipeOut
    : dragOffset > 0
      ? 'right'
      : dragOffset < 0
        ? 'left'
        : 'neutral';
  const visualIntensity = swipeOut ? 1 : Math.min(1, Math.abs(dragOffset) / SWIPE_THRESHOLD);

  useEffect(() => {
    onVisualChange?.(visualDirection, visualIntensity);
  }, [onVisualChange, visualDirection, visualIntensity]);

  useEffect(() => {
    return () => {
      onVisualChange?.('neutral', 0);
    };
  }, [onVisualChange]);

  const cardStyle: React.CSSProperties = {
    transform: `translateX(${x}px) rotate(${rotate}deg)`,
    opacity: swipeOut ? 0 : 1 - Math.min(Math.abs(dragOffset) / 500, 0.25),
    transition: isDragging
      ? 'none'
      : `transform ${SWIPE_ANIMATION_MS}ms ease, opacity ${SWIPE_ANIMATION_MS}ms ease`,
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className="relative cursor-grab active:cursor-grabbing touch-none select-none rounded-xl"
      style={{
        backgroundColor: swipeBackground,
        transition: isDragging ? 'none' : 'background-color 180ms ease',
      }}
    >
      <div
        style={cardStyle}
        className="relative bg-white rounded-lg border-2 border-gray-200 p-8 min-h-96 flex flex-col justify-between"
      >
        <div
          className="absolute top-4 left-4 px-3 py-1 border-2 border-red-500 text-red-500 font-bold rounded rotate-[-12deg]"
          style={{ opacity: nopeOpacity }}
        >
          NIE TERAZ
        </div>
        <div
          className="absolute top-4 right-4 px-3 py-1 border-2 border-green-600 text-green-600 font-bold rounded rotate-[12deg]"
          style={{ opacity: likeOpacity }}
        >
          PASUJE!
        </div>
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 border-2 border-blue-500 text-blue-500 font-bold rounded"
          style={{ opacity: superLikeOpacity }}
        >
          SUPER LIKE
        </div>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🎓</span>
            <span className="px-3 py-1 bg-primary text-white text-xs rounded-full font-semibold">
              {school.type === 'secondary' ? 'Szkoła średnia' : 'Uniwersytet'}
            </span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">{school.name}</h2>

          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <span>📍</span>
            <span>{school.location}</span>
          </div>

          <p className="text-gray-700 mb-6">{school.description}</p>
        </div>

        {/* Specializations */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Specjalizacje:</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {school.specialization.map((spec) => (
              <span
                key={spec}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Pasuje do zainteresowań:</h3>
          <div className="flex flex-wrap gap-2">
            {school.interests.map((interest) => (
              <span
                key={interest}
                className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Action Hints */}
        <div className="flex justify-between mt-8 text-gray-400 text-sm">
          <span className="flex items-center gap-1">← Nie teraz</span>
          <span className="flex items-center gap-1 text-blue-500 font-semibold">↑ Super Like</span>
          <span className="flex items-center gap-1">Pasuje! →</span>
        </div>
      </div>
    </div>
  );
};
