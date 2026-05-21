'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateOccupancyHeatmap } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function OccupancyHeatmap() {
  const [dateOffset, setDateOffset] = useState(0);
  const heatmapData = generateOccupancyHeatmap();
  const visibleDays = heatmapData.slice(dateOffset, dateOffset + 14);

  const getColorIntensity = (occupancy: number) => {
    if (occupancy >= 85) return 'bg-green-600';
    if (occupancy >= 70) return 'bg-green-500';
    if (occupancy >= 55) return 'bg-yellow-500';
    if (occupancy >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getLegendColor = (threshold: string) => {
    switch (threshold) {
      case '85+':
        return 'bg-green-600';
      case '70-84':
        return 'bg-green-500';
      case '55-69':
        return 'bg-yellow-500';
      case '40-54':
        return 'bg-orange-500';
      case '<40':
        return 'bg-red-500';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>30-Day Occupancy Heatmap</CardTitle>
        <CardDescription>Room occupancy rates over the next month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          {['85+', '70-84', '55-69', '40-54', '<40'].map((threshold, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${getLegendColor(threshold)}`}></div>
              <span className="text-muted-foreground">{threshold}%</span>
            </div>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDateOffset(Math.max(0, dateOffset - 7))}
            disabled={dateOffset === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex-1 grid grid-cols-7 gap-2">
            {visibleDays.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className="text-xs font-medium text-muted-foreground">{day.day}</div>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm cursor-pointer transition-all hover:scale-105 ${getColorIntensity(
                    day.occupancy
                  )}`}
                  title={`${day.dateFormatted}: ${day.occupancy}% occupancy`}
                >
                  {day.occupancy}%
                </div>
                <div className="text-xs text-muted-foreground">{day.dateFormatted}</div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setDateOffset(Math.min(16, dateOffset + 7))}
            disabled={dateOffset >= 16}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Avg Occupancy</p>
            <p className="text-lg font-semibold">
              {Math.round(heatmapData.reduce((sum, d) => sum + d.occupancy, 0) / heatmapData.length)}%
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Peak Day</p>
            <p className="text-lg font-semibold">
              {Math.max(...heatmapData.map(d => d.occupancy))}%
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Lowest Day</p>
            <p className="text-lg font-semibold">
              {Math.min(...heatmapData.map(d => d.occupancy))}%
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">High Days (85%+)</p>
            <p className="text-lg font-semibold">
              {heatmapData.filter(d => d.occupancy >= 85).length}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
