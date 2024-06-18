import { useEffect, useState } from 'react';

export default function PortfolioPage() {
  const accessToken = sessionStorage.getItem('access-token');

  const [data, setData]: any = useState();

  useEffect(() => {
    async function getPortfolios() {
      try {
        const response = await fetch('http://localhost:8080/partners/portfolios', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const responseData = await response.json();

        setData(responseData?.data);
      } catch (error) {
        console.log('error!!', error);
      }
    }
    getPortfolios();
  }, []);

  return (
    <>
      <h1>My Portfolios</h1>

      <>
        {data &&
          data.map((portfolio: any) => (
            <>
              <h2>Title</h2>
              <div>{portfolio?.portfolio_title}</div>
              <br />
              <h2>Image</h2>
              <img src={portfolio?.portfolio_image_url}></img>
            </>
          ))}
      </>
    </>
  );
}
