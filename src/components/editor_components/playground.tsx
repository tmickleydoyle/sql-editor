"use client";

// import { useState } from 'react';
import Editor from '@monaco-editor/react';

interface Props {
  code?: string;
  onChange?: (value?: string) => void;
}

function Playground(props: Props) {
  // // const [code, setCode] = useState(`SELECT * FROM devices.device_usage LIMIT 10;`);
  // const [code, setCode] = useState(props.code || '');
  // function handleOnChange(value?: string) {
  //   console.log('value', value)
  //   setCode(value || '');
  // }
  return (
      <div className="text-sm font-mono text-gray-900 dark:text-gray-50 code-container">
        <Editor
          className="h-screen"
          defaultLanguage="sql"
          defaultValue={props.code.trim()}
          options={{
            fontSize: 14,
            fontFamily: 'monospace',
            lineNumbers: 'on', 
            minimap: {
              enabled: false
            },
            contextmenu: false,
          }}
          onChange={props.onChange}
        />
      </div>
  )
}

export default Playground;