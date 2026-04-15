//import { useState, useEffect } from 'react';

const buttonStyle = {
  color: 'darkgreen',
  fontSize: 15,
  fontWeight: 'bold',
  backgroundColor: 'beige',
  padding: 10,
  margin: 5,
};

const Card = ({ id, title, src, description, onClickCart }) => {
  return (
    <>
      <li
        key={id}
        style={{
          border: '2px dotted green',
          padding: 10,
        }}
      >
        <h3>{title}</h3>
        <img src={src} style={{ height: 100 }} />
        <p style={{ width: 300 }}>{description}</p>
        <button style={buttonStyle}>Favoritmarkera</button>
        <button style={buttonStyle} onClick={() => onClickCart({ title, id })}>
          Lägg i kundvagn
        </button>
      </li>
    </>
  );
};

export default Card;
