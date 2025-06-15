import { useState } from "react";

type Header = { key: string; value: string };
type Props = {
  headersCallbackfn: (headers:{key:string,value:string}[]) => void;
};

export default function Headers({ headersCallbackfn }: Props) {
  const [headers, setHeaders] = useState<Header[]>([{ key: "", value: "" }]);

  const handleHeaderChange = (
    field: string,
    value: string,
    index: number
  ) => {
    const updated = [...headers];
    updated[index] = { ...updated[index], [field]: value };
    setHeaders(updated);

    if (
      index === headers.length - 1 &&
      (updated[index].key !== "" || updated[index].value !== "")
    ) {
      setHeaders([...updated, { key: "", value: "" }]);
    }

    

    headersCallbackfn(headers);  };

  return (
    <div>
      {headers.map((h, i) => (
        <div key={i}>
          <input
            placeholder="Key"
            value={h.key}
            onChange={(e) => handleHeaderChange("key", e.target.value, i)}
          />
          <input
            placeholder="Value"
            value={h.value}
            onChange={(e) => handleHeaderChange("value", e.target.value, i)}
          />
        </div>
      ))}
    </div>
  );
}
