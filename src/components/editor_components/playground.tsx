"use client";

import { useState } from 'react';
import Editor from '@monaco-editor/react';

const Playground = () => {
  const [code, setCode] = useState(`SELECT * FROM devices.device_usage LIMIT 10;`);
  function handleOnChange(value?: string) {
    console.log('value', value)
    setCode(value || '');
  }
  return (
      <div className="text-sm font-mono text-gray-900 dark:text-gray-50 code-container">
        <Editor
          className="h-screen"
          defaultLanguage="sql"
          defaultValue={code.trim()}
          options={{
            fontSize: 14,
            fontFamily: 'monospace',
            lineNumbers: 'on', 
            minimap: {
              enabled: false
            },
            contextmenu: false,
          }}
          onChange={handleOnChange}
        />
      </div>
  )
}

export default Playground;