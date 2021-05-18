export  const  getCurrent = async (input:String) => {
  const myKey= "32bbe68c7ea8dcb91cd98537c397af64"
  const response = await fetch(`
  https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}
  `)

  const data = await response.json();
  console.log('response',data);
  return data;

}


export  const getDialoguePhp = async (url: string,formData:any) => {
  console.log('getDialoguePhpf',formData)
  const response = await fetch(url,{
    // mode: 'no-cors',    
    method: "POST",
    body: formData
  });
  const data = await response.json();
  console.log("response",data);
  return data;
}


export const getDialogueJsonPhp = async (url: string,jsonData:any) => {
  console.log('getDialoguePhp',jsonData)
  const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData)
    }
  const response = await fetch(url,config
  );
  const data = await response.json();
  console.log("response",data);
  return data;
}
