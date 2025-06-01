'use client'
import React, { useState } from 'react';
import { sendRequest } from '../lib/httpClient';
import Params from '../components/Params';

export default function Home() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState<{status?: number| null ; headers?: any; body?: any}>({});
  const [inputType,setInputType]= useState<'Params'|'Body'|'Headers'>('Params');
  const [params,setParams]  = useState<{key:string,value:string}[]>([]);
      const paramCallbackfn = (param:{key:string,value:string}[]) =>{
        setParams(param)
      }

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        if (!url) return alert('Please enter a URL');

        const baseUrl = url.split('?')[0];
        const searchParams = new URLSearchParams();
                  if (params) {
            params.forEach(p => {
              if (p.key) searchParams.append(p.key, p.value);
            });
          }
        const newUrl = `${baseUrl}?${searchParams.toString()}`
        setUrl(newUrl);

        const res = await sendRequest(method, newUrl);
        setResponse(res);
      };

  return (
    <div>
      <div className="box">
        <form onSubmit={handleSubmit} className="searchBar">
          <div className="requestType">
            <select
              className="text-black bg-white"
              name="reqType"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div className="urlBox">
            <input
              type="url"
              name="url"
              placeholder="https://google.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="sendBtn">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send
            </button>
          </div>
                    <ul className="flex gap-4 cursor-pointer">
                      <li onClick={() => setInputType('Params')}>Params</li>
                      <li onClick={() => setInputType('Headers')}>Headers</li>
                      <li onClick={() => setInputType('Body')}>Body</li>
                    </ul>

          {inputType === 'Params' && <Params paramCallbackfn={paramCallbackfn}/>}
      

        </form>
      </div>

      
      <div className="responseBox mt-4 p-4 bg-blue-100 text-black rounded">
        <h3 className="font-bold mb-2">Response</h3>
        <div><strong>Status:</strong> {response.status || 'N/A'}</div>
        <div>
          <strong>Headers:</strong>
          <pre>{response.headers ? JSON.stringify(response.headers, null, 2) : 'N/A'}</pre>
        </div>
        <div>
          <strong>Body:</strong>
          <pre>{response.body ? JSON.stringify(response.body, null, 2) : 'N/A'}</pre>
        </div>
      </div>
    </div>
  );
}

