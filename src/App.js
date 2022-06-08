import './App.css';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

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
      const response = await fetch('https://syncvr-challenge.herokuapp.com/numberPosition?number=' + numberPosition, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      setFibonacciNumber(json);
    } catch (error) {
      console.error(error);
    }
  }

  const getList = async () => {
    try {
      const response = await fetch('https://syncvr-challenge.herokuapp.com/getList');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getList();
  }, [data]);

  const formatDate = (date) => {
    let formatedDate = date.split("-");
    return formatedDate[2] + "/" + formatedDate[1] + "/" + formatedDate[0].substring(2);
  }

  return (
    <div className="App">
      <div class="top-container">
        <div className="search">
          <div className="row">
            <div className="col">
              <label> Number position: {numberPosition}  </label>
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
              <label> Fibonacci Number: {fibonnaciNumber}  </label>
            </div>
          </div>

        </div>
      </div>
      <Container fluid>


      </Container>
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
                return <tr><td>{item.number_position}</td> <td>{item.fibonacci_number}</td> <td>{date[1].split(".")[0]} {formatDate(date[0])}</td></tr>
              })
            }
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
