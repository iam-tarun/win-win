import { useEffect, useState } from 'react';

type Reading = {
  id: string;
  label: string;
  readingValue: number;
  ds_sk: Date | string;
};

export default function ReadingList() {
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    const fetchReadings = async () => {
      try {
        const res = await fetch('https://2oapwpr2f9.execute-api.us-east-1.amazonaws.com/newstage/reading');
        const data = await res.json();
        console.log(JSON.parse(data.body))
        setReadings(JSON.parse(data.body)?.items);
      } catch (err) {
        console.error('Error fetching readings:', err);
      }
    };

    fetchReadings(); // initial call
    const interval = setInterval(fetchReadings, 5000); // poll every 5 seconds

    return () => clearInterval(interval); // clean up on unmount
  }, []);

  return (
    <ul>
      {readings && readings.length ? readings.map(r => (
        <li key={r.ds_sk}>
          <strong>{r.label}</strong>: {r.readingValue}
        </li>
      )) : <></>}
    </ul>
  );
}
