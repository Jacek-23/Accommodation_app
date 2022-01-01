import { useLayoutEffect, useEffect, useState } from "react";

const quotes = [
  '"Życie daje każdemu tyle, ile sam ma odwagę sobie wziąć, a ja nie zamierzam zrezygnować z czegoś, co mi się należy." - Jacek Pałkiewicz',
  '"Nie czekaj. Pora nigdy nie będzie idealna." - Napoleon Hill',
  '"Za dwadzieścia lat bardziej będziesz żałował tego czego nie zrobiłeś, niż tego co zrobiłeś. Więc odwiąż liny, opuść bezpieczną przystań. Złap w żagle pomyślne wiatry. Podróżuj. Śnij. Odkrywaj." - Mark Twain',
  '"Lepiej zobaczyć coś raz, niż słyszeć o tym tysiące razy." - przysłaowie chińskie',
  '"Każde miejsce, które odwiedzisz staje się w jakiś sposób częścią ciebie." - Anita Densai',
  //'"Bądź silny i bądź mądry. Bądź odważny i bądź szlachetny. Bądź ponad wszystko, i bądź wszędzie, a ponadto bądź sobą i bądź zdecydowany na marzenia." - Jacek Szwesta',
];

const styles = {
  position: 'absolute',
  padding: '5px',
  top: '20px',
  left: '0',
  right: '0',
  textAlign: 'center',
  color: '#fff',
  fontStyle: 'italic'
};

function InspiringQuote(props) {
  const [quote, setQuote] = useState('Wczytywanie cytatów...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useLayoutEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [loading]);

  return (
  <p style={styles}>{quote}</p>
  );
}

export default InspiringQuote;