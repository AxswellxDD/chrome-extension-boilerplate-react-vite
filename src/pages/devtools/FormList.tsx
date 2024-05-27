import React from 'react';

interface FormsListProps {
  formsData: any[];
}

const FormList: React.FC<FormsListProps> = ({ formsData }) => (
  <div>
    <h1>Forms Data</h1>
    {formsData.map((formData, index) => (
      <div key={index}>
        <h2>Form {index + 1}</h2>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    ))}
  </div>
);

export default FormList;