import React, { Component, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [funcShow, setFuncShow] = useState(true);
  const [classShow, setClassShow] = useState(true);

  return (
    <div className="container">
      <h1>Hello World</h1>
      <button type="button" onClick={() => setFuncShow(false)}>
        remove func
      </button>
      <button type="button" onClick={() => setClassShow(false)}>
        remove class
      </button>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}

let funcId = 0;

function FuncComp(props) {
  const [number, setNumber] = useState(props.initNumber);
  const [date, setDate] = useState(new Date().toString());

  useEffect(() => {
    console.log('func => useEffect (componentDidMount)' + ++funcId);
    return function cleanup() {
      console.log('useEffect (componentWillUnmount)' + ++funcId);
    };
  }, []);

  useEffect(() => {
    console.log(
      'func => useEffect number(componentDidMount & componentDidUpdate)' +
        ++funcId
    );
    document.title = number;
    return function cleanup() {
      console.log(
        'useEffect number return (componentDidMount & componentDidUpdate)' +
          ++funcId
      );
    };
  }, [number]);

  useEffect(() => {
    console.log(
      'func => useEffect date(componentDidMount & componentDidUpdate)' +
        ++funcId
    );
    document.title = date;
    return function cleanup() {
      console.log(
        'useEffect date return (componentDidMount & componentDidUpdate)' +
          ++funcId
      );
    };
  }, [date]);

  console.log('func => render' + ++funcId);

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number: {number}</p>
      <p>Date: {date}</p>
      <button
        type="button"
        onClick={() => {
          setNumber(Math.random() * 10);
        }}
      >
        number
      </button>
      <button
        type="button"
        onClick={() => {
          setDate(new Date().toString());
        }}
      >
        date
      </button>
    </div>
  );
}

class ClassComp extends Component {
  state = {
    number: this.props.initNumber,
    date: new Date().toString(),
  };

  componentDidMount() {
    console.log('class => componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true;
    }
    console.log('class => shouldComponentUpdate');
  }

  componentDidUpdate(nextProps, nextState) {
    console.log('class => componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('class => componentWillUnmount');
  }

  render() {
    console.log('class => render');

    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number: {this.state.number}</p>
        <p>Date: {this.state.date}</p>
        <button
          type="button"
          onClick={() => {
            this.setState({
              number: Math.random() * 10,
            });
          }}
        >
          number
        </button>
        <button
          type="button"
          onClick={() => {
            this.setState({
              date: new Date().toString(),
            });
          }}
        >
          date
        </button>
      </div>
    );
  }
}

export default App;
