import { useEffect , useState } from "react";

const useFetch = (urlEndPoint)=> {
    const [data , setData] = useState(null);
    const [isPending , setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{

        const abortController = new AbortController();
        setTimeout(()=>{
            fetch(urlEndPoint ,{signal:abortController.signal})
            .then((res)=>{
                if(res.ok){
                    return res.json();
                }else{
                    throw Error('could not fetch the data from this resource');
                }  
            })
            .then((data)=>{
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err)=>{
                if(err.name === 'AbortError'){
                    console.log('fetch aborted')
                }else{
                    setError(err.message);
                    setIsPending(false);
                }
                
            })
        },1000)
        
        return ()=> abortController.abort();


    },[urlEndPoint])

    return {data,isPending,error}
}

export default useFetch;