import "./Form.css";
import React, { useState,useEffect,useContext } from 'react'
import { useDispatch } from 'react-redux'
import { setR } from '../../api/graphSlice';
import {  MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import {toast } from "react-toastify";
import {useSelector} from 'react-redux';
import {selectUserUserT} from '../../api/userSlice';
import * as ReactBootStrap from "react-bootstrap";
import { AuthContext } from '../../context';
const Form = () => {
  const token = useSelector(selectUserUserT);
  if(typeof token !== 'undefined')  
        localStorage.setItem('token',token);

  const dispatch = useDispatch();  
  const initialValues = { x: "valueforerror", y: "", r: "" }
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  
  const { datatable, setDatatable } = useContext(AuthContext);

  // const [datatable, setDatatable] = React.useState({
  //    rows: []
  // });

  useEffect(() => {
    
    const fetchPoint = async () =>{ 
      
    const response = await axios.get("http://localhost:8080/api/point", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }).catch((err) => {
      console.log(err);
    });
  
    var copy = [];
    response.data.forEach(dot=>{
    copy.push({
            'name': dot.user.login,
            'positionX': dot.x,
            'positionY': dot.y,
            'positionR': dot.r,
            'date': dot.time,
          });
        })
   setDatatable({ rows: copy})
  }
  fetchPoint();
 
  }, [setDatatable]) 

  function handleChangeR(event){
    handleChange(event);
    RChangeSVG(event);
  }
 
  function RChangeSVG(event) {
    if (event.target.value !== 'Выберете R' && event.target.value !== 'valueforerror') {
      dispatch(setR(event.target.value));
    }
    else dispatch(setR(0));
  }
 
  const handleChange = (e) => {
    setFormErrors({})
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
   
    if( Number(formValues.y)>-3 && Number(formValues.y)<3 && !!Number(formValues.y)){
      axios.put("http://localhost:8080/api/point",
          {"x": formValues.x, "y": formValues.y.replace(",","."), "r": formValues.r},
          {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
      }).then((res) => {
          const newPoint = 
            {
              'name': res.data.name,
              'positionX':res.data.x ,
              'positionY':res.data.y ,
              'positionR': res.data.r,
              'date': res.data.time,
            };
            var copy = Object.assign([], datatable);
            copy.rows.push(newPoint);
            setDatatable(copy);
        toast.success('Точка добавлена успешно', {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }).catch(() => {
        toast.error("Точку не удалось добавить", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      });
    }
  }
  const validate = (values) => {
    const errors = {};
  
    if (Number(values.y)<=-3 || Number(values.y)>=3 || !!!Number(values.y)){
      errors.y= "Неверное значение Y";
    } 
    if ((Number(values.x)<-2 || Number(values.x)>2) || values.x ==='valueforerror'){
      errors.x= "Неверное значение X";
    } 
    if ((Number(values.r)<-2 || Number(values.r)>2)||values.r ===''){
      errors.r= "Неверное значение R";
    } 
    
    return errors;
  }
  function deleteDots() {
    axios.delete("http://localhost:8080/api/point",
      {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    }).then((res) => {
    toast.success('Точки удалены успешно', {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      setDatatable({rows: []})
  }).catch(() => {
    toast.error("Точки не удалось удалить", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  });
  } 
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="white-text">
            <p>{formErrors.y}</p>
            
            <input onChange={handleChange} value={formValues.y} type="text" id="YID" name="y" required placeholder="Введите Y (-3..3)"
              pattern="+-^[0-9]*[.,]?[0-9]+$" />
            <p>{formErrors.x}</p>
            <select name="x" onChange={handleChange} value={formValues.x} >
              <option value="valueforerror" selected>Выберете X</option>
              <option value="2">2</option>
              <option value="1.5">1.5</option>
              <option value="1">1</option>
              <option value="0.5">0.5</option>
              <option value="0">0</option>
              <option value="-0.5">-0.5</option>
              <option value="-1">-1</option>
              <option value="-1.5">-1.5</option>
              <option value="-2">-2</option>
            </select>
            <p>{formErrors.r}</p>
            <select name="r" value={formValues.r} onChange={handleChangeR}>
              <option value="valueforerror" selected>Выберете R</option>
              <option value="2">2</option>
              <option value="1.5">1.5</option>
              <option value="1">1</option>
              <option value="0.5">0.5</option>
              <option value="0">0</option>
              <option value="-0.5">-0.5</option>
              <option value="-1">-1</option>
              <option value="-1.5">-1.5</option>
              <option value="-2">-2</option>
            </select>

          </div>
          <div className="text-center py-4 mt-3">
            <MDBBtn color="cyan" type="submit">
              Submit
            </MDBBtn>
          </div>
          <div className="text-center py-4 mt-3">
            <MDBBtn onClick={deleteDots} color="cyan" type="reset">
              Clear table
            </MDBBtn>
          </div>
        </form>
      </div>

      <div>
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>name</th>
            <th>positionX</th>
            <th>positionY</th>
            <th>positionR</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {datatable.rows &&
            datatable.rows.map((item) => (
              <tr >
                <td>{item.name}</td>
                <td>{item.positionX}</td>
                <td>{item.positionY}</td>
                <td>{item.positionR}</td>
                <td>{item.date}</td>
              </tr>
            ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
      
    </>
  )
}

export default Form
