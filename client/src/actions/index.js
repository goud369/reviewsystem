import {DEV_URL} from '../../src/config';

export async function getLoginDetails(data){
    try{
        const response = await fetch(DEV_URL+'/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
     const result = await response.json();
     return result;
    }
    catch(error){
        console.log('Error', error);
    }
}


