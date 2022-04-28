import React, {useState} from "react"
import "./loginpage.scss"
import {useNavigate} from "react-router-dom"
import {loginUser} from "../api.js"
import {useDispatch} from "react-redux";
import {update} from "../store.js"  



export const LoginPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [spinner, setSpinner] = useState(false)

  const handleKeyPress = (event) => {

    if (event.key === "Enter") {
      handleFormSubmit(event)
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    setErrorMessage("")
    setSpinner(true)
    loginUser({email : userEmail , password : password }).then(data => {
      if (data.jwt) {
        localStorage.setItem("admintoken",JSON.stringify(data.jwt))
        dispatch(update(data.user))
        setErrorMessage("")
        setSpinner(false)
        navigate("/dashboard", { replace: true });
      } 
      if (data === 'no user') {
        setSpinner(false)
        setErrorMessage('Uncorrect username/password')
      }
      
    }).catch(error => console.log("не става"))
  }


  return (
    <><div className='main-bg' style={{minHeight:'100vh'}}>
        <div className="container-fluid main-bg">
          <div className="row justify-content-center">
            <div className="col-lg-10 bg-main-light">
              <div className="d-flex flex-row align-items-start">
                <button className="menu-button-m-main-dark">sass</button>
                <button className="menu-button-m-main-dark">bootstrap</button>
                <button className="menu-button-m-main-dark">react</button>
                <button className="menu-button-m-main-dark">redux</button>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center reverse ">
              <div className="d-flex flex-column  login-main pad-xl">
                <h6 className="text-xl-dark">This is private page for Admin panel employers</h6>
                <img src="https://firebasestorage.googleapis.com/v0/b/booking-project-1637313077100.appspot.com/o/chatting.png?alt=media&token=147ba79b-7ec0-43f0-87d3-95a10fb278b8" className="img-panel mt-3" />
              </div>
              <div className="d-flex flex-column justify-content-center bg-main pad-xl login-main">
                
                  <div className="d-flex flex-row justify-content-between" >
                    <div>
                      <h5 className="text-m-light pad-m">Enter account</h5>
                    </div>
                    <div>
                      <h5 className="text-s-light pad-l">if you are not a user please contact administrator</h5>
                    </div>
                  </div>
                  <form 
                  className="form-group mt-3 pad-l"
                  onSubmit={handleFormSubmit}>
                      <h6 className="text-s-light">E-mail</h6>
                      <input
                        value={userEmail}
                        name="userEmail"
                        onChange={(event) => setUserEmail(event.target.value)}
                        onKeyPress={(event) => handleKeyPress(event)}
                        type="email" 
                        className="form-control" />
                        <h6 className="text-s-light mt-3">Password</h6>
                      <input
                        value={password}
                        name="password"
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyPress={(event) => handleKeyPress(event)}
                        type="text" 
                        className="form-control " />
                      <h6 className="form-text text-danger fw-bold">{errorMessage}</h6>
                      {spinner === true && <div className="d-flex flex-row spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>}
                      <button 
                        className="btn btn-md btn-warning mt-3 "
                        type="submit"
                        >Enter</button>
                    </form>
              </div>
          </div>
        </div>
      </div>
      
    </>
  )
}
