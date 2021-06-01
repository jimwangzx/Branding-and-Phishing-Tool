import React, { useEffect, useState } from 'react'
import { Card, Form,Col, Button, ProgressBar, Spinner } from 'react-bootstrap'
import ReactLoading from 'react-loading';
import Header from '../Components/Header'
import axios from "axios"

const Home = () => {

    const [url1,setUrl1]=useState("");
    const [url2,setUrl2]=useState("");
    const [datas, setData] = useState({});
    const [yes,setYes]=useState(false);
    const [err,setErr]=useState(false);
    
    const compare= async () => {
      setYes(true);
      //  /scan/?q1=https://www.youtube.com/&q2=www.google.com
      const search_url=`/scan/?q1=${url1}&q2=${url2}`;
      console.log(search_url)
      try {
        const { data } = await axios.get(search_url);
        setData(data);
        setYes(false);
        console.log("Finished");
      } catch (error) {
        console.log(error);
        setErr(true);
        setYes(false);
      }
    };

    return (
        <div style={{textAlign:"-webkit-center"}}>
          <Card>
                <Card.Body><h3><p>This module is used for measuring the similarity between two webpages. Enter the two URLS that you want to compare in the below inputs and hit Compare. You will get the similarity expressed in percentage.</p></h3></Card.Body>
            </Card>
            <br />
            <br />
      <Card style={{minWidth:"20rem",boxShadow:"2px 2px 2px #ddd",maxWidth:"80rem"}}>
          <Card.Body style={{backgroundColor:"aliceblue"}}>
              <Form>
                  <Form.Row >
                      <Form.Group as={Col}>
                      <Form.Label>Enter 1st URL</Form.Label>
      <Form.Control type="text" placeholder="Enter URL" style={{    textAlignLast: "center"}} onChange={(e)=>setUrl1(e.target.value)}/>
                      </Form.Group>
                      <Form.Group as={Col}>
                      <Form.Label>Enter 2nd URL</Form.Label>
      <Form.Control type="text" placeholder="Enter URL" style={{    textAlignLast: "center"}} onChange={(e)=>setUrl2(e.target.value)}/>
                      </Form.Group>
                  </Form.Row>
              </Form>
          </Card.Body>
          <Card.Footer>
              <Button variant="outline-dark" style={{width:"100%"}} onClick={compare}>
                    Compare
              </Button>
              {/* <Button variant="outline-dark" style={{width:"100%"}} onClick={compare}>
                    Compare
              </Button> */}
          </Card.Footer>
          {datas && Object.keys(datas).length>0 && !err && datas.err==0?<ProgressBar style={{height:"30px"}} striped variant="success" now={datas.score} animated label={`${datas.score}%`}/>:null}
          {datas && Object.keys(datas).length>0 && datas.hasOwnProperty("err") && datas.err==1?<h2>Some error occured!!</h2>:null}
          {err?<h2>Some error occured!!</h2>:null}
         </Card>
         
        </div>
    )
}

export default Home