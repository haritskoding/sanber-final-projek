import React, { useEffect, useState } from 'react';
import './App.css';
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Kematian, KasusPositif, Sembuh } from './FormatNumber'
import AnimationCount from 'react-count-animation';
import 'react-count-animation/dist/count.min.css';
import CardColumn from "react-bootstrap/CardColumns"
import Columns from "react-columns";
import Form from "react-bootstrap/Form";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import moment from 'moment'

function App(props) {

  const [terkini, setTerkini] = useState([]);
  const [hasil, setHasil] = useState([]);
  const [cariNegara2, setCariNegara2] = useState("")

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries"),
      ])
      .then(res => {
        setTerkini(res[0].data);
        setHasil(res[1].data);

      })
      .catch(err => {
        console.log(err);
      });
  }, [
  ]);


  const kematian = {
    start: 0,
    count: terkini.deaths,
    duration: 2950,
    useGroup: true,
    animation: 'up',
  };


  const sembuh = {
    start: 0,
    count: terkini.recovered,
    duration: 2900,
    useGroup: true,
    animation: 'up',
  };

  const KasusPositif = {
    start: 0,
    count: terkini.cases,
    duration: 3000,
    useGroup: true,
    animation: 'up',
  };

  const tanggal = new Date(parseInt(terkini.updated));
  const terakhirUpdate = tanggal.toString();

  const filterNegara2 = hasil.filter(item => {
    return cariNegara2 !== "" ?
      item.country.includes(cariNegara2) : item;
  })

  //  hasil.map((props, index)
  const Negara = filterNegara2.map((props, index) => {
    return (
      <Card
        key={index}
        bg="light"
        text="dark"
        className="text-danger"
        style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={props.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{props.country}</Card.Title>
          <Card.Text>Kasus Positif {props.cases}</Card.Text>
          <Card.Text>Angka Kematian {props.deaths}</Card.Text>
          <Card.Text>Sembuh {props.recovered}</Card.Text>
          <Card.Text>Kasus Baru Hari ini {props.todayCases}</Card.Text>
          <Card.Text>Angka Kematian Hari Ini {props.todayDeaths}</Card.Text>
          <Card.Text>Aktif {props.active}</Card.Text>
          <Card.Text>Kritis {props.critical}</Card.Text>
        </Card.Body>
      </Card>
    );
  });


  let queries = [{
    columns: 2,
    query: 'min-width:500px'
  }, {
    columns: 3,
    query: 'min-width:1000px'
  }]


  return (
    <React.Fragment>
      <CardDeck>

        <Card
          className="text-center"
          bg="secondary"
          text="white"
          style={{ margin: '10px' }}
        >
          <Card.Body>
            <Card.Title>Kasus Positif</Card.Title>
            <Card.Text style={{ color: 'white' }}>
              {/* <KasusPositif cases={terkini.cases} /> */}
              <AnimationCount {...KasusPositif} />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Terakhir di Update Pada &nbsp;:&nbsp;{moment(terakhirUpdate).format('LLL')}</small>
          </Card.Footer>
        </Card>
        <Card
          className="text-center"
          border="primary"
          bg="danger"
          text="white"
          style={{ margin: '10px' }}
        >
          <Card.Body>
            <Card.Title>Kematian</Card.Title>
            <Card.Text style={{ color: 'white' }}>
              <AnimationCount {...kematian} />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Terakhir di Update Pada &nbsp;:&nbsp;{moment(terakhirUpdate).locale("ina").format('LLL')}</small>
          </Card.Footer>
        </Card>
        <Card
          className="text-center"
          border="primary"
          bg="success"
          text="white"
          style={{ margin: '10px' }}
        >
          <Card.Body>
            <Card.Title>sembuh</Card.Title>
            <Card.Text style={{ color: 'white' }}>
              {/* <Sembuh sembuh={terkini.recovered} /> */}
              <AnimationCount  {...sembuh} />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Terakhir di Update Pada &nbsp;:&nbsp;{moment(terakhirUpdate).format('LLL')}</small>
          </Card.Footer>
        </Card>
      </CardDeck>

      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control
            type="text"
            placeholder="Ketikan nama negara untuk mencari..."
            onChange={e => setCariNegara2(e.target.value)}
          />
        </Form.Group>
      </Form>
      <br />
      {/* <h4>Daftar Negara2 di seluruh dunia </h4> */}
      <Columns queries={queries}>{Negara}</Columns>
    </React.Fragment>
  )
}
export default App;
