import { useMultipleSelect } from './hooks/useMultipleSelect';
import { useSingleSelect } from './hooks/useSingleSelect';
import { calculateOffers } from './utils/calculateOffers';
import data from './utils/data.json';
import './index.css';
import { Button } from './components/Button';
import { useState } from 'react';

function App() {
  const { productTypes, productsOffers, productTypesWithRequired } = data;

  const [error, setError] = useState('');
  const [offerCalculation, setOfferCalculation] = useState();

  const productTypesOptions = Object.entries(productTypes).map(
    ([value, label]) => ({ value, label })
  );

  const yearsOptions = Object.keys(productsOffers[0].pricePerYear).map(
    (year) => ({ value: year, label: year })
  );

  const { checkedValues: selectedProductTypes, CheckboxList } =
    useMultipleSelect({
      options: productTypesOptions,
    });
  const { Select, selectedValue: selectedYear } = useSingleSelect({
    options: yearsOptions,
  });

  const areSelectedProductTypesValid = (selectedProductTypes) => {
    let errMessage = '';
    return {
      isValid: selectedProductTypes.every((selectedProductType) => {
        if (productTypesWithRequired[selectedProductType]) {
          return productTypesWithRequired[selectedProductType].every(
            (requiredProductForCurSelectedProduct) => {
              if (
                !selectedProductTypes.includes(
                  requiredProductForCurSelectedProduct
                )
              ) {
                errMessage = `You are not able to add product ${selectedProductType} without ${requiredProductForCurSelectedProduct}`;
                return false;
              }
              return true;
            }
          );
        }
        return true;
      }),
      errMessage: errMessage,
    };
  };

  const submitHandler = () => {
    const { isValid, errMessage } =
      areSelectedProductTypesValid(selectedProductTypes);
    setError(errMessage);
    if (isValid) {
      const calculations = calculateOffers(
        productsOffers,
        selectedProductTypes,
        selectedYear
      );
      console.log(calculations, 'calculations');
      setOfferCalculation(calculations);
    } else {
      setOfferCalculation();
    }
  };

  return (
    <div className='container'>
      <div className='flex flex-wrap mb-2'>
        <div className='flex flex-wrap'>{CheckboxList}</div>
        <div className='flex'>{Select}</div>
      </div>
      <div>
        <Button onClick={submitHandler}>Calculate offer</Button>
      </div>
      <div className='result-container'>
        {error ? <p className='error-message'>{error}</p> : null}
        {offerCalculation ? (
          <>
            <p>
              Standard price:{' '}
              <b> ${offerCalculation.totalPriceWithoutSpecialOffers}</b>
            </p>
            <p>
              Special offers price: <b>${offerCalculation.minOfferPrice}</b>
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
