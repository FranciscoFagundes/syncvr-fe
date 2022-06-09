import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import './App.css';
function App() {


  const [numberPosition, setNumberPosition] = useState("");
  const [fibonnaciNumber, setFibonacciNumber] = useState("");
  const [data, setData] = useState([]);

  const buttonClick = (event) => {
    event.preventDefault();
    getFibonnaci(numberPosition);
    getList();
  }

  const getFibonnaci = async (numberPosition) => {
    try {
      await axios.post('https://syncvr-challenge.herokuapp.com/numberPosition?number=' + numberPosition)
        .then(function (response) {
          setFibonacciNumber(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    } catch (error) {
      console.error(error);
    }
  }

  const getList = async () => {
    try {
      await axios.get('https://syncvr-challenge.herokuapp.com/getList')
        .then(function (response) {
          setData(response.data);
          //console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getList();
  }, []);

  const formatDate = (date) => {
    let formatedDate = date.split("-");
    return formatedDate[2] + "/" + formatedDate[1] + "/" + formatedDate[0].substring(2);
  }

  return (
    <div className="App">
      <div className="top-container">
        <div className="search">
          <div className="row">
            <div className="col">
              <img className="fibonacci-image" alt="Fibonnaci" src={require('./img/Fibonacci.jpeg')} />
            </div>
            <div className="col">
              <label> Type the number position on Fibonacci Sequence</label>
            </div>
            <div className="col">
              <form onSubmit={buttonClick}>
                <input
                  type="number"
                  value={numberPosition}
                  onChange={(e) => {
                    setNumberPosition(e.target.value);
                    setFibonacciNumber("");
                  }}
                />
                <input type="submit" />
              </form>
            </div>
            <div className="col">
              <label> Number Position: {numberPosition}  </label>
            </div>
            <div className="col">
              <label> Fibonacci Number: {fibonnaciNumber}  </label>
            </div>
          </div>

        </div>
      </div>
      <Container>
        <div>
          <table className="darkTable">
            <thead>
              <tr>
                <th>Number Position</th>
                <th>Fibonacci Number</th>
                <th>Requested Time and Date</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((item, key) => {
                  let date = item.requisition_date.toString().split("T");
                  return <tr key={key}><td>{item.number_position}</td><td>{item.fibonacci_number}</td><td>{date[1].split(".")[0]} {formatDate(date[0])}</td></tr>
                })
              }
            </tbody>
          </table>
        </div>
      </Container>
    </div>

  );
}

export default App;
