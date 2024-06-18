import styled from 'styled-components';

interface ItemCardProps {
  itemImage: string;
  itemTitle: string;
}

export default function ItemCard(props: ItemCardProps) {
  const { itemImage, itemTitle } = props;
  return (
    <>
      <Styled.Container>
        <Styled.ItemImage src={itemImage} alt={'상품 이미지'} />
        <Styled.ItemTitle>{itemTitle}</Styled.ItemTitle>
      </Styled.Container>
    </>
  );
}

const Styled = {
  Container: styled.div`
    width: 250px;
    height: 400px;

    border-radius: 10px;

    background-color: beige;
  `,

  ItemImage: styled.img`
    width: 100%;
    aspect-ratio: 1/1;
  `,

  ItemTitle: styled.h2`
    font-size: 20px;
    color: orange;
  `,
};
