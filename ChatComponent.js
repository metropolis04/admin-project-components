import React,{useState, useEffect} from "react"
import "./chat-component.scss"
import {getEmployees} from "../api.js"
import {useSelector} from "react-redux"
import {Message} from "./Message.js"
import {addNewMessageToUser} from "../api.js"

export const ChatComponent = ({chat}) => {


const userData = useSelector(state => state.value)
const [messageUsers, setMessageUsers] = useState([])
const [chatMessages, setChatMessages] = useState([])
const [message,setMessage] = useState("")


useEffect(() => {
  getEmployees().then(data => {
    
    const chatUsers = []
    const messagesForState = []
    
    chat.forEach(value => {
      if (chatUsers.includes(value.senderId) === false && value.senderId != userData.userId) {
        chatUsers.push(value.senderId)
      } 
    })
    
    chatUsers.forEach(value => {
      const chatObject = {
        senderId : value,
        messages : []
      }
      chat.forEach(message => {
        if (message.senderId === value || (userData.userId === message.senderId && message.recipientId === value) ) {
          // to do
          chatObject.messages.push(message)
        }
      })
      messagesForState.push(chatObject)
    })
    setMessageUsers(messagesForState)
  }).catch(error => console.log(error))
},[])

const handleSendMessage = (event) => {
  event.preventDefault()
  if (message.length === 0) {
    return
  }
  const form = event.currentTarget

  const msgObject = {
    senderId           : userData.userId,
    recipientId        : chatMessages[0].senderId === userData.userId ? chatMessages[0].recipientId  : chatMessages[0].senderId,
    text               : message,
    senderImage        : userData.image,
    senderName         : userData.username,
    recipientImage     : chatMessages[0].senderId === userData.userId ? chatMessages[0].recipientImage  : chatMessages[0].senderImage,
    recipientFirstName : chatMessages[0].senderId === userData.userId ? chatMessages[0].recipientFirstName  : chatMessages[0].senderName,
    year               : new Date().getFullYear(),
    month              : new Date().getMonth() + 1,
    day                : new Date().getDate(),
    hour               : new Date().getHours(),
    minutes            : new Date().getMinutes(),
    seconds            : new Date().getSeconds()
    
  }

  addNewMessageToUser(msgObject).then(data => {
    setChatMessages([...chatMessages, msgObject])
    setMessageUsers(messageUsers.map(value => {
      if (value.senderId === msgObject.recipientId) {
        value.messages.push(msgObject)
      }
      return value
    }))
    form.reset()
  }).catch(error => console.log(error))
  
}




  return (
    <>
      <div className="row jumpViewDown">
              
              <div className="col-lg-4 flex-column mt-3 menu-width-300" >
                {messageUsers.map((value,index) => {
                  return(
                        <div key={index} className="bg-light rounded mt-2">  
                          <div className="d-flex flex-row align-items-center justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                            <img className="img-profile-xxs" src={value.messages[0].senderImage === userData.image ? value.messages[0].recipientImage : value.messages[0].senderImage} />
                            <h6 
                            className="p-2 form-text fw-bold"
                            style={{cursor:'pointer'}}
                            onClick={() => setChatMessages([...value.messages])}
                            >{value.messages[0].senderName === userData.username ? value.messages[0].recipientFirstName : value.messages[0].senderName }
                            </h6>
                            </div>
                            <span className="badge rounded-pill bg-primary">{value.messages.length}</span>
                          </div>
                        </div>
                   )
                })}
              </div>
              <div className="col-lg-8 flex-column mt-3 menu-width-500 ">
                <div className="d-flex flex-row pad-l border-bottom">
                  <h6 className="text-m-dark">Chat section</h6>
                </div>
                {chatMessages.length === 0 && <div className="row flex-wrap-reverse">
                  <div className="col-lg-6">
                    <img style={{width:'100%'}} src="https://firebasestorage.googleapis.com/v0/b/booking-project-1637313077100.appspot.com/o/bar-chart.png?alt=media&token=a3873695-b14b-4df2-bddf-cb4fc8685b22" />
                  </div>
                  <div className="col-lg-6 d-flex flex-row justify-content-center align-items-center" style={{textAlign:'center'}}>
                    <h6 className="text-m-dark p-2">This is your chat section.Click on users to view chat</h6>
                  </div>
                </div>}
                <div style={{height:'200px',overflow:'auto'}}>
                  {chatMessages.map((value,index) => <Message user={userData} key={index} details={value} />)}
                </div>
                {chatMessages.length > 0 && 
                <div className="d-flex flex-row">
                  <form onSubmit={handleSendMessage} style={{height:'60px',width:'100%'}}>
                    <textarea 
                      onChange={(e) => setMessage(e.target.value)} 
                      style={{resize:'none',width:'100%',backgroundColor:'rgb(199, 244, 249)',border:'none',borderRadius:'5px',marginTop:'15px'}}
                      className="text-s-dark"
                      placeholder="write here..."
                      >
                    </textarea>
                    <button 
                        type="submit"  
                        className="transparent bg-success form-text text-light fw-bold rounded"
                      >send
                    </button>
                  </form>
                </div>}
              </div>
              
          </div>
    </>
  )

}
