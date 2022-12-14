# React Jodit PRO WYSIWYG Editor

[![npm](https://img.shields.io/npm/v/jodit-pro-react.svg)](https://www.npmjs.com/package/jodit-pro-react)
[![npm](https://img.shields.io/npm/dm/jodit-pro-react.svg)](https://www.npmjs.com/package/jodit-pro-react)
[![npm](https://img.shields.io/npm/l/jodit-pro-react.svg)](https://www.npmjs.com/package/jodit-pro-react)

React wrapper for [Jodit PRO](https://xdsoft.net/jodit/pro/)

## Installation

```bash
npm install jodit-pro-react --save
# or
yarn add jodit-pro-react
```

## Update editor version
```bash
npm update jodit-react-pro
```

## Usage

### 1. Require and use Jodit-react component inside your application.

```jsx
import React, {useState, useRef} from 'react';
import JoditEditor from "jodit-pro-react";

const Example = ({}) => {
	const editor = useRef(null)
	const [content, setContent] = useState('')

	const config = {
		readonly: false, // all options from https://xdsoft.net/jodit/doc/,
		uploader: {
			url: 'https://xdsoft.net/jodit/finder/?action=fileUpload'
		},
		filebrowser: {
			ajax: {
				url: 'https://xdsoft.net/jodit/finder/'
			},
			height: 580,
		}
	}

	return (
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {}}
		/>
	);
}
```


License
-----
This package is available under [License](https://xdsoft.net/jodit/pro/license).
