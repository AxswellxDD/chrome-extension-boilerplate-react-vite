import { useState, useEffect } from 'react';
import CurrentUrl from './CurrentUrlComponnent';

const BASE_URL = CurrentUrl + '/Form';

type Form = {
  name: string | null;
  type: string;
  id: string | null;
  value: string;
};

export default function FormsValuesReader(){
  const [error , setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [Forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    const fetchForms = async () => {
       setIsLoading(true);

      try {
         const response = await fetch(`${BASE_URL}/Form`);
         const forms = (await response.json()) as Form[];

         setForms(Forms);
      }catch (e : any){
         setError(e);
      }finally{
         setIsLoading(false);
       }

      };
      fetchForms();
    }, []);

    if (isLoading){
      return <h1>Loading...</h1>;
    }

    if (error){
      return <div>Something went wrong! Try again.</div>;
    }


    return (
      <div className='DemoContainer'>
      <h1>Fetching forms data from</h1>
      <ul>
        {Forms.map((form) => (
          <li key={form.id}>
            {form.type} {form.name} {form.value}
          </li>
        ))}
      </ul>
    </div>
  );
};
