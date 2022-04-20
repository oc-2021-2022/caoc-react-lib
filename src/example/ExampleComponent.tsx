import React from 'react'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <div style={{
    "margin": "2em",
    "padding": "0.5em",
    "border":" 2px solid #000",
    "fontSize": "2em",
    "textAlign": "center",
    "color":"red"
  }}>Michel Example Component: {text}</div>
}
