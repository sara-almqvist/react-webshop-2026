import { useEffect, useState } from 'react';
import Card from './Card.jsx';

/*const buttonStyle = {
  color: 'darkgreen',
  fontSize: 15,
  fontWeight: 'bold',
  backgroundColor: 'beige',
  padding: 10,
  margin: 5,
};*/

function SearchUI() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isFetched, setIsFetched] = useState(false); //för att undvika anrop vid omladdning eller tomt sökfält
  const [cart, setCart] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setIsFetched(false);
    } else {
      setIsFetched(true);
    }
  };

  const addItemToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  useEffect(() => {
    if (!isFetched) {
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchTerm}`
        );
        if (!res.ok) {
          throw new Error('fel vid hämtning');
        }

        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Något gick fel', error);
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      setIsFetched(false);
    };
  }, [searchTerm]);

  return (
    <div>
      <h2>Smart sök</h2>
      <input
        type="text"
        placeholder="Skriv för att söka ..."
        value={searchTerm}
        onChange={handleChange}
      />

      <ul
        style={{
          listStyleType: 'none',
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        {products.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            src={item.images[0]}
            description={item.description}
            onClickCart={addItemToCart}
          />
        ))}
      </ul>
      <p>
        Min kundvagn:{' '}
        {cart.map((item) => (
          <span key={item.id} style={{ margin: 5 }}>
            {item.title}
          </span>
        ))}
      </p>
    </div>
  );
}

export default SearchUI;
