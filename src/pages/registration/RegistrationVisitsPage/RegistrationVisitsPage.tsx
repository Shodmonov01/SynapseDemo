import { useState } from 'react';

import HorizontalCalendar from './components/HorizontalCalendar.tsx';
import SchedulerTimeline from './components/SchedulerTimeline.tsx';

export const RegistrationVisitsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <HorizontalCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        <SchedulerTimeline selectedDate={selectedDate} />
      </div>
    </>
  );
};
