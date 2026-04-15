import { useState, useEffect } from 'react';

const randomNumber = () => {
  return Math.floor(Math.random() * 10 + 1);
};

function Test() {
  const [tal, setTal] = useState(randomNumber);
  const [randomTal, setRandomTal] = useState(randomNumber);
  const [result, setResult] = useState(false);

  /*const checkNumber = () => {
    if (tal > 21) {
      setResult(true);
    }
  };*/

  const fail = () => setResult(true);

  useEffect(() => {
    if (tal > 21) {
      fail;
    }
  }, [result, tal]);

  const handleClick = (num) => {
    setTal((prev) => prev + num);
  };

  return (
    <>
      <h2>Spela sifferleken</h2>
      <p>Nu: {tal}</p>
      <button onClick={() => handleClick(1)}>Öka med 1</button>
      <button onClick={() => handleClick(5)}>Öka med 5</button>
      <button
        onClick={() => {
          setRandomTal(randomNumber);
          handleClick(randomTal);
        }}
      >
        Chansa!
      </button>
      {result && <p>Du förlorade!</p>}
    </>
  );
}

export default Test;
