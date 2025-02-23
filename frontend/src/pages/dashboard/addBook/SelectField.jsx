import React from 'react'

const SelectField = ({label, name, options, register}) => {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-semibold text-gray-700' >{label}</label>
      <select {...register(name, {required:true})} className='p-2 w-full border rounded-md focus:border-blue-300'>
        {options.map((option)=>(
            <option key={option.value} value={option.value}> {option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default SelectField
