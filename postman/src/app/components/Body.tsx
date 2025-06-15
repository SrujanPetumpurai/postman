import { useState } from 'react';

type Props = { bodyCallbackfn: (body: string) => void };

export default function Body({ bodyCallbackfn }: Props) {
  const [body, setBody] = useState('');

  const handleChange = (value: string) => {
    setBody(value);
    bodyCallbackfn(value);
  };

  return (
    <textarea
      placeholder="Raw JSON body"
      value={body}
      onChange={(e) => handleChange(e.target.value)}
      rows={10}
      cols={50}
    />
  );
}
