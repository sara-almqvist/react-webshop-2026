import { useEffect, useState } from 'react';

function SearchUI() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isFetched, setIsFetched] = useState(false); //för att undvika anrop vid omladdning eller tomt sökfält

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setIsFetched(false);
    } else {
      setIsFetched(true);
    }
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
          <li key={item.id} style={{ border: '2px dotted green', padding: 10 }}>
            {item.title}
            <img src={item.images[0]} style={{ height: 100 }} />
            <button>Lägg i kundvagn</button>
            <button>Favoritmarkera</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchUI;
