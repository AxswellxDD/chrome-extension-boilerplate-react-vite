import {useState} from 'react'
import currentUrl from './CurrentUrlComponnent';

const BASE_URL = currentUrl + '/forms';

interface Form {
    id : number;
    title : string;
}

export default function Demo() {
    const [forms, setForms] = useState<Form[]>([]);

    return(
        <div className='DemoContainer'>
            <h1>Fething forms data</h1>
            <ul>
                {forms.map(form => (
                    <li key={form.id}>{form.title}</li>
                ))}
            </ul>
        </div>
    );

}