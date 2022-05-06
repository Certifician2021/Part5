import '../css/main.css'

const Notification = ({message}) => {
 if(message === null)
 return null
 else{
     return <p className='error'>{message}</p>
 }
}

export default Notification