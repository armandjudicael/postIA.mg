import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Calendar,
  Clock,
  Zap,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  X
} from "lucide-react";

interface ScheduleInputProps {
  value: string;
  onChange: (date: string) => void;
}

export const ScheduleInput: React.FC<ScheduleInputProps> = ({
  value,
  onChange,
}) => {
  const [showQuickOptions, setShowQuickOptions] = useState(false);

  const getOptimalTimes = () => {
    const now = new Date();
    const times = [];
    
    // Morning (9 AM)
    const morning = new Date(now);
    morning.setHours(9, 0, 0, 0);
    if (morning <= now) morning.setDate(morning.getDate() + 1);
    
    // Lunch (12 PM)
    const lunch = new Date(now);
    lunch.setHours(12, 0, 0, 0);
    if (lunch <= now) lunch.setDate(lunch.getDate() + 1);
    
    // Afternoon (3 PM)
    const afternoon = new Date(now);
    afternoon.setHours(15, 0, 0, 0);
    if (afternoon <= now) afternoon.setDate(afternoon.getDate() + 1);
    
    // Evening (6 PM)
    const evening = new Date(now);
    evening.setHours(18, 0, 0, 0);
    if (evening <= now) evening.setDate(evening.getDate() + 1);

    return [
      { time: morning, label: 'Morning', icon: Sunrise, description: '9:00 AM - High engagement' },
      { time: lunch, label: 'Lunch', icon: Sun, description: '12:00 PM - Peak activity' },
      { time: afternoon, label: 'Afternoon', icon: Sun, description: '3:00 PM - Good reach' },
      { time: evening, label: 'Evening', icon: Sunset, description: '6:00 PM - After work' },
    ];
  };

  const formatDateTimeLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleQuickSchedule = (date: Date) => {
    onChange(formatDateTimeLocal(date));
    setShowQuickOptions(false);
  };

  const clearSchedule = () => {
    onChange('');
  };

  const getScheduleInfo = () => {
    if (!value) return null;
    
    const scheduledDate = new Date(value);
    const now = new Date();
    const diffMs = scheduledDate.getTime() - now.getTime();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMs < 0) {
      return { type: 'error', message: 'Scheduled time is in the past' };
    } else if (diffHours < 1) {
      return { type: 'warning', message: 'Scheduled in less than 1 hour' };
    } else if (diffHours < 24) {
      return { type: 'info', message: `Scheduled in ${diffHours} hours` };
    } else {
      return { type: 'info', message: `Scheduled in ${diffDays} days` };
    }
  };

  const scheduleInfo = getScheduleInfo();
  const optimalTimes = getOptimalTimes();

  return (
    <div className="space-y-3">
      {/* Schedule Input */}
      <div className="relative">
        <Input
          type="datetime-local"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pr-20 transition-all duration-200 hover:border-primary/50 focus:ring-2 focus:ring-primary"
          min={new Date().toISOString().slice(0, 16)}
        />
        
        {/* Clear and Quick Options Buttons */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
          {value && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSchedule}
                    className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clear schedule</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowQuickOptions(!showQuickOptions)}
                  className="h-6 w-6 p-0 hover:bg-primary/10"
                >
                  <Zap className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Quick schedule options</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Schedule Info */}
      {scheduleInfo && (
        <div className={`p-2 rounded-lg text-xs flex items-center space-x-2 ${
          scheduleInfo.type === 'error' ? 'bg-destructive/10 text-destructive' :
          scheduleInfo.type === 'warning' ? 'bg-yellow-500/10 text-yellow-600' :
          'bg-primary/10 text-primary'
        }`}>
          <Clock className="h-3 w-3" />
          <span>{scheduleInfo.message}</span>
        </div>
      )}

      {/* Quick Schedule Options */}
      {showQuickOptions && (
        <div className="p-3 bg-gradient-subtle rounded-lg border border-border/50 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Optimal posting times</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowQuickOptions(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {optimalTimes.map(({ time, label, icon: Icon, description }) => (
              <Button
                key={label}
                variant="outline"
                size="sm"
                onClick={() => handleQuickSchedule(time)}
                className="justify-start h-auto p-3 hover:bg-primary/10 transition-all duration-200"
              >
                <div className="flex items-center space-x-3 w-full">
                  <Icon className="h-4 w-4 text-primary" />
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">{label}</div>
                    <div className="text-xs text-muted-foreground">{description}</div>
                    <div className="text-xs text-muted-foreground">
                      {time.toLocaleDateString()} at {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>

          {/* Custom Quick Options */}
          <div className="border-t border-border/50 pt-3 space-y-2">
            <div className="text-xs font-medium text-muted-foreground">Quick options:</div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  tomorrow.setHours(9, 0, 0, 0);
                  handleQuickSchedule(tomorrow);
                }}
                className="text-xs"
              >
                Tomorrow 9 AM
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const nextWeek = new Date();
                  nextWeek.setDate(nextWeek.getDate() + 7);
                  nextWeek.setHours(12, 0, 0, 0);
                  handleQuickSchedule(nextWeek);
                }}
                className="text-xs"
              >
                Next week
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const in2Hours = new Date();
                  in2Hours.setHours(in2Hours.getHours() + 2);
                  handleQuickSchedule(in2Hours);
                }}
                className="text-xs"
              >
                In 2 hours
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Scheduling Tips */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>💡 <strong>Best times to post:</strong></p>
        <ul className="ml-4 space-y-0.5">
          <li>• Instagram: 11 AM - 1 PM, 7 PM - 9 PM</li>
          <li>• Twitter: 9 AM - 10 AM, 7 PM - 9 PM</li>
          <li>• LinkedIn: 8 AM - 10 AM, 12 PM - 2 PM</li>
          <li>• Facebook: 1 PM - 3 PM, 7 PM - 9 PM</li>
        </ul>
      </div>
    </div>
  );
};