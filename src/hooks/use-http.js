import { useCallback, useState } from "react";


const useHttp =()=>{

    const [error, setError]=useState(null);
    const [isLoading, setIsLoading]=useState(false);

    const sendRequest= useCallback( async (requestConfig, applyData) =>{
        setIsLoading(true);

        try{
            const response =await fetch  ( requestConfig.url,{
                method: requestConfig.method? requestConfig.method: 'GET',
                body: requestConfig.body? JSON.stringify(requestConfig.body): null,
                headers: requestConfig.headers ? requestConfig.headers: {}
            });

            
            if(!response.ok)
                throw new Error('Request failed with status ' + response.status)
            
                
            const data = await response.json();
            applyData(data);
            setIsLoading(false);
            setError(null);
            
        }
    
        catch(error){
            setIsLoading(false);
            setError('Error '+ error.message);
        }

    },[]);


    return{
        sendRequest, error, isLoading
    }
    
    
};

export default useHttp;