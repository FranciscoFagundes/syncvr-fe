import { useState, useEffect } from 'react';
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
              <h1> Type the number position on Fibonacci Sequence</h1>
            </div>
            <div className="col">
              <form onSubmit={buttonClick}>
                <input
                  className="input-search"
                  type="number"
                  value={numberPosition}
                  onChange={(e) => {
                    setNumberPosition(e.target.value);
                    setFibonacciNumber("");
                  }}
                />
                <input className="button-search" type="submit" value="Search" />
              </form>
            </div>
            <div className="col">
              <h2> Number Position: {numberPosition}  </h2>
            </div>
            <div className="col">
              <h2> Fibonacci Number: {fibonnaciNumber}  </h2>
            </div>
          </div>

        </div>
      </div>
      <section>
        <div className="tbl-header">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>Number Position</th>
                <th>Fibonacci Number</th>
                <th>Requested Time and Date</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
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
      </section>
    </div>

  );
}

export default App;
