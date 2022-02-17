
const weatherform = document.querySelector('form')
const Search = document.querySelector('input')
const messageone = document.querySelector('#message1')
const messagetwo = document.querySelector('#message2')

messageone.textContent='Loading...'
messagetwo.textContent=''


weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = Search.value
    console.log(location)

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            messageone.textContent = data.error
        }else{
            messageone.textContent = data.location
            messagetwo.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
            
        }
    })
})

})