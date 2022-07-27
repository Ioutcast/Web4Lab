
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { changeRgraph, showDotsGraph } from '../../api/graphSlice';
import styled from 'styled-components'
import { AuthContext } from '../../context';
import axios from 'axios';
const Graph = (props) => {

  const graph = useSelector(changeRgraph);
  const { datatable, setDatatable } = useContext(AuthContext);
  // console.log(user + '/'+ typeof(user.r)+ ' user r - '+ (user.r!==0));
  function checkin(x, y, r) {
   if(r >= 0)
   return (((x >= 0) && (y <= 0) && (x * x + y * y <= r * r / 4))
      || ((x <= 0) && (y >= 0) && (x >= -r) && (y <= r))
      || (((x >= 0) && (y >= 0) && (y <= -x / 2 + r / 2) && (y <= r / 2) && (x <= r)))
      && (((r >= 0) && (r <= 2))))    
   if (r<=0){
       var r1=Math.abs(r); 
       var x1=-x; 
       var y1=-y;
      return ((  (x1 <= 0 && y1 <= 0 && x1 >= -r1 && y1 >= -r1/2 && y1>=-x1/2 - r1/2)
      || (x1 <= 0 && y1 >= 0 && x1*x1 + y1*y1 <= r1*r1/4)
      || (x1 >= 0 && y1 <= 0 && y1 >= -r1 && x1<= r1))
    ) && (r < 0 && r >= -3);
    }

  }
  const {
    detectedEnvironment: {
        isMouseDetected = false,
        isTouchDetected = false
    } = {},
    elementDimensions: {
        width = 0,
        height = 0
    } = {},
    position: {
        x = 0,
        y = 0
    } = {},
    isActive = false,
    isPositionOutside = false
} = props;
const svgSize = 300
const graphX = (((Number(graph.r) / 50) * (svgSize / 2 - x) * -1) / 2).toFixed(1)
const graphY = (((Number(graph.r) / 50) * (svgSize / 2 - y)) / 2 ).toFixed(1)

 const graphClickHandler=()=>{
  axios.put("http://localhost:8080/api/point",
  {"x": graphX, "y": graphY, "r": graph.r},
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
 });
}
  return (
    <div onClick={graphClickHandler} className={"graph-wrap"}>
      <svg id='graph' width="300" height="300" className="svg-graph" xmlns="http://www.w3.org/2000/svg">

        <line className="axis" x1="50" x2="250" y1="150" y2="150" stroke="white" />
        <line className="axis" x1="150" x2="150" y1="0" y2="300" stroke="white" />
        <polygon points="150,0 144,15 156,15" stroke="white" fill="white" />
        <polygon points="265,150 250,156 250,144" stroke="white" fill="white" />

        <line className="coor-line" x1="200" x2="200" y1="155" y2="145" stroke="white" />
        <line className="coor-line" x1="250" x2="250" y1="155" y2="145" stroke="white" />

        <line className="coor-line" x1="50" x2="50" y1="155" y2="145" stroke="white" />
        <line className="coor-line" x1="100" x2="100" y1="155" y2="145" stroke="white" />

        <line className="coor-line" x1="145" x2="155" y1="100" y2="100" stroke="white" />
        <line className="coor-line" x1="145" x2="155" y1="50" y2="50" stroke="white" />

        <line className="coor-line" x1="145" x2="155" y1="200" y2="200" stroke="white" />
        <line className="coor-line" x1="145" x2="155" y1="250" y2="250" stroke="white" />

        <text className="coor-text" x="195" y="140" fill="white">{graph.r / 2}</text>
        <text className="coor-text" x="248" y="140" fill="white">{graph.r}</text>

        <text className="coor-text" x="40" y="140" fill="white">{-graph.r}</text>
        <text className="coor-text" x="90" y="140" fill="white">{-graph.r / 2}</text>

        <text className="coor-text" x="160" y="105" fill="white">{graph.r / 2}</text>
        <text className="coor-text" x="160" y="55" fill="white">{graph.r}</text>

        <text className="coor-text" x="160" y="205" fill="white">{-graph.r / 2}</text>
        <text className="coor-text" x="160" y="255" fill="white">{-graph.r}</text>


        {Number(graph.r) >= 0 ? (
          <>
            <polygon id="rectanglepl" className="svg-figure rectangle-figure" points="150,150 150,50 50,50, 50,150"
              fill="white" fill-opacity="0.3" stroke="white" />


            <path id='circlepl' className="svg-figure circle-figure"
              d="M 250 150 A 100 100, 0, 0, 1, 150 250 L 150 150 Z"
              fill="white" fill-opacity="0.3" stroke="white" />



            <polygon id='trianglepl' className="svg-figure triangle-figure" points="150,100 150,150 250,150"
              fill="white" fill-opacity="0.3" stroke="white" />
          </>) : (

          <>
            <polygon id="rectanglemi" className="svg-figure rectangle-figure-mi" points="150,150 150,250 250,250, 250,150"
              fill="white" fill-opacity="0.3" stroke="white" />


            <path id='circlemi' className="svg-figure circle-figure-mi"
              d="M 50 150 A 100 100, 90, 0, 1, 150 50 L 150 150 Z"
              fill="white" fill-opacity="0.3" stroke="white" />



            <polygon id='trianglemi' className="svg-figure triangle-figure-mi" points="150,200 150,150 50,150"
              fill="white" fill-opacity="0.3" stroke="white" />
          </>
        )
        }
        {/* </>):(<>
                          <text className="coor-text" x="195" y="140" fill="white">0</text>
                        <text className="coor-text" x="248" y="140" fill="white">0</text>
    
                        <text className="coor-text" x="40" y="140" fill="white">0</text>
                        <text className="coor-text" x="90" y="140" fill="white">0</text>
    
                        <text className="coor-text" x="160" y="105" fill="white">0</text>
                        <text className="coor-text" x="160" y="55" fill="white">0</text>
    
                        <text className="coor-text" x="160" y="205" fill="white">0</text>
                        <text className="coor-text" x="160" y="255" fill="white">0</text>

                        <polygon id="rectanglepl" className="svg-figure rectangle-figure" points="150,150 150,50 50,50, 50,150"
                                     fill="white" fill-opacity="0.3" stroke="white"/>
    
                          
                            <path id='circlepl' className="svg-figure circle-figure"
                                  d="M 250 150 A 100 100, 0, 0, 1, 150 250 L 150 150 Z"
                                  fill="white" fill-opacity="0.3" stroke="white"/>
    
    
    
                            <polygon id='trianglepl' className="svg-figure triangle-figure" points="150,100 150,150 250,150"
                                     fill="white" fill-opacity="0.3" stroke="white"/>
                        </>) */}

        {datatable.rows.map((point) => {

          const cx = (Number(point.positionX) * 2) / Number(graph.r) * 50 + 300 / 2
          const cy = 300 / 2 - (Number(point.positionY) * 2) / Number(graph.r) * 50
          const color = "white"
          return (
            <circle r="5" cx={Number(cx)} cy={Number(cy)} id="target-dot" stroke={color} fill={checkin(point.positionX, point.positionY, graph.r) ? "green" : "red"} />

          )
        })}

      </svg>
      <p>
                    {`x: ${graphX}`}<br />
                    {`y: ${graphY}`}<br />
                </p>
    </div>



  )
}

export default Graph
