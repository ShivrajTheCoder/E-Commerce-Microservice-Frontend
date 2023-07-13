import { useEffect, useState } from 'react';

interface TimerProps {
  endTime: string;
}

const Timer: React.FC<TimerProps> = ({ endTime }) => {
  const [timer, setTimer] = useState<string>('');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const [hours, minutes] = endTime.split(':').map((value) => parseInt(value, 10));

      const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

      const timeRemaining = end.getTime() - now.getTime();

      if (timeRemaining <= 0) {
        setTimer('Auction Ended');
      } else {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setTimer(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };

    calculateTimeRemaining();

    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [endTime]);

  return (
    <div className="text-center">
      <div className="text-3xl font-bold">{timer}</div>
      <div className="text-gray-500">Remaining</div>
    </div>
  );
};

export default Timer;
