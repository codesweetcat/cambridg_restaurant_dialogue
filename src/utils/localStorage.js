export const saveToLocalStorage=(data)=> {
  localStorage.setItem("location", JSON.stringify(data));
}
export const   clearLocalStorage=()=> {
  localStorage.clear();
}
export const   setDataIntoArray = (input, data, itemName)=>{
  data['input'] = input;
  if(localStorage.getItem(itemName)===null){
      return [data];
  }else{
     let tasks = JSON.parse(localStorage.getItem(itemName));
     tasks.push(data)
     return tasks
  }
}
export let counter = 1;


export const getNameofAudioFile=(userId,counter)=>{
  const timeStamp = new Date().getTime();
  return `${userId}-${timeStamp}-${counter}`;
}