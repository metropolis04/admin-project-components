import React,{useState, useEffect}  from "react"
import "./employees-component.scss"
import {getEmployees, getProjects} from "../../api.js"
import {EmployeeCard} from "./EmployeeCard.js"
import {EmployeeCardList} from "./EmployeeCardList.js"
import {FilterIcon} from "../../Icons/FilterIcon.js"
import {InfoEmployeesTable} from "./InfoEmployeesTable.js"

export const EmployeesComponent = () => {

  const [employees, setEmployees] = useState()
  const [filterWord, setFilterWord] = useState("")
  const [showFilter, setShowFilter] = useState(false)

  


  useEffect(() => {
    getEmployees().then(data => {
      setEmployees(data)
    }).catch(error => console.log(error))
    
  },[])

  
  return (
    <>{employees && 
      <div className="row justify-content-center" >
        <div className="col-lg-10 mar-t-xl border-bottom">
          <div className="row">
            <div className="col-lg-6">
              <h5 className="text-xl-dark">Employees section</h5>
            </div>
            <div className="col-lg-6">
              <img className="img-panel mar-b-s"  src="https://firebasestorage.googleapis.com/v0/b/booking-project-1637313077100.appspot.com/o/monitoring.png?alt=media&token=898a80dc-1390-43db-9203-98ef5deb2757" />
            </div>
          </div>
        </div>
        <InfoEmployeesTable data={employees} />
        <div className="col-lg-10 mar-t-xl">
          <div className="d-flex flex-row justify-content-between align-items-center nav-employers bg-main-light border-5">
            <div>
              <div className="d-flex flex-row">
                <input 
                  className="input-info-profile bg-light mar-l-l"
                  type="text"
                  placeholder="search user..."
                  onChange={(event) => setFilterWord(event.target.value)}
                />
              </div>
            </div>
            <div className="position-relative">
              <button className="transparent mar-r-l" onClick={() => setShowFilter(!showFilter)} ><FilterIcon width={25} height={25} /></button>
              <div className="hide-filter" style={{display:`${showFilter === false ? "none" : "block"}`}}>
                <div className="pad-m">
                  <h6 className="text-s-light border-bottom pad-m">Filter users</h6>
                  <div className="row">
                    <div className="col-md-6 mar-t-l">
                      <h6 className="text-s-light">Position</h6>
                      <select className="form-select">
                        <option value="Design engineer">Design engineer</option>
                        <option value="Engineer technologist">Engineer technologist</option>
                        <option value="Quality engineer">Quality engineer</option>
                        <option value="Production menageer">Production menageer</option>
                        <option value="Technical manager">Technical manager</option>
                      </select>
                    </div>
                    <div className="col-md-6 mar-t-l">
                      <h6 className="text-s-light">Status</h6>
                      <select className="form-select">
                        <option value="free">Free employee</option>
                        <option value="project">Employee in project</option>
                      </select>
                    </div>
                    <div className="row mar-t-l">
                      <div className="col-md-6">
                        <button className="btn btn-small btn-warning">Filter</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-10 mar-t-xl">
          <div className="row hob">
            {employees.filter(value => value.firstName.includes(filterWord) || value.lastName.includes(filterWord)).map((value,index) => <EmployeeCard filter={filterWord} key={index} details={value} /> )}
            
          </div>
          <div className="row hol">
          <table className="table">
          <thead>
            <tr>
              <th className="form-text ">#</th>
              <th className="form-text ">Pic</th>
              <th className="form-text ">Firstname</th>
              <th className="form-text ">Lastname</th>
              <th className="form-text ">E-mail</th>
              <th className="form-text ">Position</th>
              <th className="form-text ">Company</th>
              <th className="form-text ">Join date</th>
              <th className="form-text ">Projects</th>
            </tr>
          </thead>
          
          
          <tbody >
          {employees.length > 0 && employees.filter(value => value.firstName.includes(filterWord) || value.lastName.includes(filterWord)).map((value,index) => <EmployeeCardList filter={filterWord} key={index} details={value} rowNumber={index} />)}
          </tbody>

        </table>
          </div>
        </div>
      </div>}
    </>
  )
}
