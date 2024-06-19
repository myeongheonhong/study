import { useEffect, useState } from 'react';
import ItemCard from '../components/common/Card/itemCard';
import styled from 'styled-components';

export default function SearchPage() {
  const [value, setValue] = useState('');
  const [itemList, setItemList] = useState<any>();
  console.log(value);
  console.log(itemList);

  useEffect(() => {
    if (value) {
      console.log(value);
      getItemList(value);
    }
  }, [value]);

  const getItemList = async (value: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/search?itemTitle=${value}`, {
        method: 'GET',
      });
      const data = await response.json();
      const itemListData = data.data.itemList;
      setItemList([...itemListData]);
    } catch (error) {
      console.log(error);
    }
  };

  function handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <>
      <h1>Search Page</h1>
      <h1>검색</h1>
      <input onChange={handleChangeValue} />

      {itemList ? (
        <Styled.ItemContainer>
          {itemList.map((item: any) => (
            <ItemCard itemImage={item.itemImage} itemTitle={item.itemTitle} />
          ))}
        </Styled.ItemContainer>
      ) : (
        <></>
      )}
    </>
  );
}

const Styled = {
  ItemContainer: styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    width: 100%;
  `,
};
