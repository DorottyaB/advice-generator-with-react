import 'bootstrap/dist/css/bootstrap.min.css';
import useWindowDimensions from './useWindowDimensions';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

function App() {
  const [advice, setAdvice] = useState({});
  const { width } = useWindowDimensions();
  const cardWidth = width < 600 ? 90 : 70;
  const cardPadding = width < 600 ? 20 : 36;

  const getAdvice = async () => {
    try {
      const res = await fetch('https://api.adviceslip.com/advice');
      const data = await res.json();
      setAdvice(data.slip);
    } catch (err) {
      setAdvice(null);
    }
  };

  useEffect(() => {
    getAdvice();
    console.log(advice);
  }, []);

  return (
    <Card
      style={{
        width: cardWidth + '%',
        maxWidth: '550px',
        backgroundColor: 'hsl(217, 19%, 24%)',
        color: 'hsl(193, 38%, 86%)',
        paddingRight: cardPadding + 'px',
        paddingLeft: cardPadding + 'px',
        paddingTop: '36px',
        paddingBottom: '36px',
      }}
      className='rounded-4 shadow-lg position-relative mx-auto'
    >
      {advice ? (
        <Card.Body className='p-0 pb-4 text-center d-flex flex-column align-items-center'>
          <Card.Text
            className='fw-semibold text-uppercase mb-3'
            style={{ color: 'hsl(150, 100%, 66%)', fontSize: '11px', letterSpacing: '3px' }}
          >
            Advice #{advice.id}
          </Card.Text>
          <Card.Text className='fs-3 fw-bold mb-4'>“{advice.advice}”</Card.Text>
          {width > 800 ? (
            <svg width='444' height='16' xmlns='http://www.w3.org/2000/svg'>
              <g fill='none' fillRule='evenodd'>
                <path fill='#4F5D74' d='M0 8h196v1H0zM248 8h196v1H248z' />
                <g transform='translate(212)' fill='#CEE3E9'>
                  <rect width='6' height='16' rx='3' />
                  <rect x='14' width='6' height='16' rx='3' />
                </g>
              </g>
            </svg>
          ) : (
            <svg width='295' height='16' xmlns='http://www.w3.org/2000/svg'>
              <g fill='none' fillRule='evenodd'>
                <path fill='#4F5D74' d='M0 8h122v1H0zM173 8h122v1H173z' />
                <g transform='translate(138)' fill='#CEE3E9'>
                  <rect width='6' height='16' rx='3' />
                  <rect x='14' width='6' height='16' rx='3' />
                </g>
              </g>
            </svg>
          )}
          <Button
            className='position-absolute top-100 start-50 translate-middle rounded-circle'
            style={{
              backgroundColor: 'hsl(150, 100%, 66%)',
              height: '60px',
              width: '60px',
              border: 'none',
            }}
            onClick={getAdvice}
          >
            <svg
              className='position-absolute top-50 start-50 translate-middle'
              width='24'
              height='24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z'
                fill='#202733'
              />
            </svg>
          </Button>
        </Card.Body>
      ) : (
        <Card.Body>
          <Card.Text className='mb-0 fs-5'>Something went wrong!</Card.Text>
          <Card.Text className='mb-4 fs-5'>Please try again later.</Card.Text>
          <svg
            onClick={() => window.location.reload(false)}
            style={{ cursor: 'pointer' }}
            width='25'
            height='25'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
          >
            <path
              d='M480 256c0 123.4-100.5 223.9-223.9 223.9c-48.84 0-95.17-15.58-134.2-44.86c-14.12-10.59-16.97-30.66-6.375-44.81c10.59-14.12 30.62-16.94 44.81-6.375c27.84 20.91 61 31.94 95.88 31.94C344.3 415.8 416 344.1 416 256s-71.69-159.8-159.8-159.8c-37.46 0-73.09 13.49-101.3 36.64l45.12 45.14c17.01 17.02 4.955 46.1-19.1 46.1H35.17C24.58 224.1 16 215.5 16 204.9V59.04c0-24.04 29.07-36.08 46.07-19.07l47.6 47.63C149.9 52.71 201.5 32.11 256.1 32.11C379.5 32.11 480 132.6 480 256z'
              fill='#52ffa8'
            />
          </svg>
        </Card.Body>
      )}
    </Card>
  );
}

export default App;
