import { ExampleComponent, Option, OptionList, Select } from 'caoc-react-lib'
import React, { FormEvent, useEffect, useState } from 'react'

import { OptionProps } from '../../src/select/Option'

const App = (): JSX.Element => {
  const [testForm, setTestForm] = useState({
    option: ''
  })
  const [selectedOption, setSelectedOption] = useState<string>('')

  const [options, setOptions] = useState<OptionProps[]>([])
  useEffect(() => {
    const optionList = [
      {
        text: 'foo',
        value: 'bar'
      },
      {
        text: 'bar',
        value: 'foo'
      }
    ]
    setOptions(optionList)
  }, [])
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target
    setSelectedOption(value)
    console.log(selectedOption)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setTestForm({ ...testForm, option: selectedOption })
    console.log(testForm)
  }

  return (
    <>
      <ExampleComponent text="Create React Library Example 😄 Michel" />
      <form onSubmit={handleSubmit}>
        <Select
          name="Not children"
          label="Array Options"
          required
          options={options} />
        <br />
        <Select name="Children options" label="Children Option List" handleChange={handleChange}>
          <OptionList options={options}/>
        </Select>
        <br />
        <Select name="Children options" label="Children Option" handleChange={handleChange}>
          <Option text='option 1' value='value 1'/>
          <Option text='option 2' value='value 2'/>
          <Option text='option 3' value='value 3'/>
        </Select>
        <br />
        <button type='submit'>Send</button>
      </form>
    </>
  )
}



export default App
