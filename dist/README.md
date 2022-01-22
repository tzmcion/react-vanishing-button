# React-Vanishing-Button for typescript apps
## Vanishing Button For React 

Vanishing button is something like thanos awesome glove effect but a little worse

## Instalation:

Typescript : ` npm i react-vanishing-button `
Javascript: `Work in progress`

## Usage

```ts
import React from 'react';
import './App.css';
import {Button as VanishingButton} from 'react-vanishing-button2';

function App() {
  return (
    <div>
      <VanishingButton title="I'm pretty" className="class_to_style_me" />
    </div>
  );
}

export default App;
```



## PROPS
```ts
interface Props{
  title:string  //Title of the button
  className?:string,  //Classname
  id?:string, //id
  duration?:number,   //how long will it be disapearing
  row_quantity?:number, //how many squares it will divide into
  col_quantity?:number  //how many columns it will divide into
  onClick?:any  //...
}
```
------------------
check my:

github: 

website: https://pianoblocksapp.com

linkedin: https://www.linkedin.com/in/tymoteusz-apriasz-2ba8501a6/
