export const calculateOffers = (
  productsOffers,
  selectedProductTypes,
  selectedYear
) => {
  const totalPriceWithoutSpecialOffers = selectedProductTypes.reduce(
    (acc, cur) =>
      acc +
        productsOffers.find(
          (offer) => offer.types.length === 1 && offer.types.includes(cur)
        )?.pricePerYear[selectedYear] ?? 0,
    0
  );

  const getCombinations = (array, selectedProductTypes, selectedYear) => {
    let combinations = [];

    const validateSubset = (subset) => {
      const productTypesInSubset = [
        ...new Set(subset.reduce((acc, cur) => [...acc, ...cur.types], [])),
      ];
      return selectedProductTypes.every((selectedType) =>
        productTypesInSubset.includes(selectedType)
      );
    };

    const isMoreThanOneSpecialOffer = (subset) => {
      let specialOfferCounter = 0;
      for (let i = 0; i < subset.length; i++) {
        if (subset[i].types.length > 1) specialOfferCounter++;
        if (specialOfferCounter > 1) break;
      }
      return specialOfferCounter > 1;
    };

    const calculateTotalPrice = (subset, selectedYear) => {
      return subset.reduce(
        (acc, cur) => acc + cur.pricePerYear[selectedYear],
        0
      );
    };

    const getSubsets = (array, index = 0, subset = []) => {
      if (index === array.length) {
        subset.length &&
          validateSubset(subset) &&
          !isMoreThanOneSpecialOffer(subset) &&
          combinations.push({
            offersCombination: subset,
            totalPrice: calculateTotalPrice(subset, selectedYear),
          });
      } else {
        getSubsets(array, index + 1, subset.concat(array[index]));
        getSubsets(array, index + 1, subset);
      }
    };

    getSubsets(array);

    return combinations;
  };

  const generateAllOfferCombinations = (
    productsOffers,
    selectedProductTypes,
    selectedYear
  ) => {
    const possibleOffers = productsOffers.filter((offer) =>
      offer.types.some((type) => selectedProductTypes.includes(type))
    );
    return getCombinations(possibleOffers, selectedProductTypes, selectedYear);
  };
  const allPossibleOffersCombinationsWithTotalPrices =
    generateAllOfferCombinations(
      productsOffers,
      selectedProductTypes,
      selectedYear
    );

  const minOfferPrice = Math.min(
    ...allPossibleOffersCombinationsWithTotalPrices.map(
      ({ totalPrice }) => totalPrice
    )
  );

  const offerWithMinPrice = allPossibleOffersCombinationsWithTotalPrices.find(
    ({ totalPrice }) => totalPrice === minOfferPrice
  );

  return {
    offerWithMinPrice,
    minOfferPrice,
    totalPriceWithoutSpecialOffers,
    allPossibleOffersCombinationsWithTotalPrices,
  };
};
