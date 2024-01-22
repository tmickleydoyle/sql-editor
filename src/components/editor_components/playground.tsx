"use client";

import Editor from '@monaco-editor/react';

interface Props {
  code?: string;
  onChange?: (value?: string) => void;
}

function Playground(props: Props) {
  return (
      <div className="text-sm font-mono text-gray-900 dark:text-gray-50 code-container">
        <Editor
          className="h-screen"
          defaultLanguage="sql"
          defaultValue={props.code?.trim() ?? ''}
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