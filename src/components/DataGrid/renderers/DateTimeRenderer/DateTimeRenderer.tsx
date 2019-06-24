import { format } from 'date-fns';

function DateTimeRenderer({ value }: { value: number | Date }) {
  const formattedDate = value ? format(value, 'MMM d, yyyy') : '';
  const formattedTime = value ? format(value, 'hh:ss a') : '';
  return (
    <div className="my-2">
      <p className="m-0 text-sm">{formattedDate}</p>
      <p className="m-0 text-xs">{formattedTime}</p>
    </div>
  );
}

export default DateTimeRenderer;
