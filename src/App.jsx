import './App.css';
import { useState } from 'react';
import Toggle from './toggle';
import Slider from './slider';
import Input from './input';
import Value from './value';

function App() {
  //General
  const gramOfCoffeePerBeverage = 0.015;
  const subscriptionFee = 390.0;
  const openDays = 24;
  const payPerRoastFee = 2.0;
  const greenCoffeeKgPrice = 9.0;
  const packagingCostBags = 1.0;
  const [beverageSalesIncrease, setBeverageSalesIncrease] = useState(10);
  const [beveragePriceIncrease, setBeveragePriceIncrease] = useState(10);
  const [currentPredictionType, setCurrentPredictionType] =
    useState('Realistic');

  //CURRENT

  const [currentCoffeeUsed, setCurrentCoffeeUsed] = useState(60.0);
  const [currentBeveragePrice, setCurrentBeveragePrice] = useState(5.0);
  const [currentCoffeePurchasingPrice, setCurrentCoffeePurchasingPrice] =
    useState(30.0);
  const currentTurnover =
    (currentCoffeeUsed / gramOfCoffeePerBeverage) * currentBeveragePrice;
  const currentCosts = currentCoffeeUsed * currentCoffeePurchasingPrice;
  const currentProfit = currentTurnover - currentCosts;

  //EXPECTED

  //Turnover
  const expectedBeverageCoffeeUsed =
    currentCoffeeUsed * (beverageSalesIncrease / 100 + 1);
  const expectedBeveragePrice =
    currentBeveragePrice * (beveragePriceIncrease / 100 + 1);
  const expectedBeverageTurnover =
    (expectedBeverageCoffeeUsed / gramOfCoffeePerBeverage) *
    expectedBeveragePrice;
  //Costs
  const expectedGreenCoffeeCosts =
    greenCoffeeKgPrice * expectedBeverageCoffeeUsed;
  const expectedBeveragePayPerRoastTotal =
    payPerRoastFee * expectedBeverageCoffeeUsed;
  const expectedBeverageCosts =
    expectedGreenCoffeeCosts +
    subscriptionFee +
    expectedBeveragePayPerRoastTotal;
  const expectedRoastedCoffeePricePerKg =
    expectedBeverageCosts / expectedBeverageCoffeeUsed;
  //Profit
  const expectedBeverageProfit =
    expectedBeverageTurnover - expectedBeverageCosts;

  // COFFEE BAGS

  const [expectedBagsSold, setExpectedBagsSold] = useState(4);
  const expectedKgCoffeeSold = expectedBagsSold * 0.25 * openDays;
  const coffeeBagKgSellingPrice = 60;
  const coffeeBagCostPerKG =
    greenCoffeeKgPrice + payPerRoastFee + packagingCostBags;
  const coffeeBagTurnover = expectedKgCoffeeSold * coffeeBagKgSellingPrice;
  const coffeeBagCosts = expectedKgCoffeeSold * coffeeBagCostPerKG;
  const coffeeBagProfit = coffeeBagTurnover - coffeeBagCosts;

  const pessimistic = () => {
    setBeverageSalesIncrease(5);
    setBeveragePriceIncrease(5);
    setCurrentPredictionType('Pessimistic');
  };
  const realistic = () => {
    setBeverageSalesIncrease(10);
    setBeveragePriceIncrease(10);
    setCurrentPredictionType('Realistic');
  };
  const optimistic = () => {
    setBeverageSalesIncrease(20);
    setBeveragePriceIncrease(10);
    setCurrentPredictionType('Optimistic');
  };

  return (
    <div className="w-screen md:h-screen md:flex md:justify-center items-center">
      <div className="flex-col md:flex-row flex gap-6 md:m-8 h-screen max-h-[720px] w-full max-w-[1500px] md:justify-center">
        <div className="w-full md:w-[28%] current px-6 py-8 md:px-8 md:pt-8 md:pb-10  flex flex-col justify-between">
          <div className="flex flex-col gap-2 md:gap-8">
            <div className="flex flex-col gap-0 md:gap-4">
              <h1 className="section-title">Your Monthly Coffee Business</h1>
              <p className="text h-16">
                The numbers are calculated with an average of 15gr of coffee per
                beverage and 24 open days per month
              </p>
            </div>
            <div className="flex flex-col gap-2 min-w-[200px] w-11/12 pb-8 md:pb-0">
              <Input
                value={currentCoffeeUsed}
                onChange={setCurrentCoffeeUsed}
                label="Monthly Amount of Coffee Sold"
                unit="kg"
                increment={1}
                comment={(currentCoffeeUsed / 24).toFixed(1) + ' kg / day'}
              ></Input>
              <Input
                value={currentBeveragePrice}
                onChange={setCurrentBeveragePrice}
                label="Average Beverage Price"
                unit="$"
                increment={0.1}
              ></Input>
              <Input
                value={currentCoffeePurchasingPrice}
                onChange={setCurrentCoffeePurchasingPrice}
                label="Coffee Purchasing Price by kg"
                unit="$"
                increment={1}
              ></Input>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-8">
            <div className="flex flex-col gap-4">
              <Value
                label="Turnover"
                value={currentTurnover}
                size="small"
              ></Value>
              <Value label="Costs" value={currentCosts} size="small"></Value>
            </div>
            <Value label="Profit" value={currentProfit} size="large"></Value>
          </div>
        </div>
        <div className="w-full md:w-[36%] px-6 py-8 md:px-8 md:pt-8 md:pb-10  bg-white h-full flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2 md:gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="section-title">
                Coffee Beverages Business with Mikafi
              </h1>
              <div className="h-16">
                <Toggle
                  currentState={currentPredictionType}
                  tab1Name="Pessimistic"
                  tab2Name="Realistic"
                  tab3Name="Optimistic"
                  tab1Action={pessimistic}
                  tab2Action={realistic}
                  tab3Action={optimistic}
                ></Toggle>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-7 py-3">
              <Value
                label="Monthly Amount of Coffee Sold"
                value={expectedBeverageCoffeeUsed}
                size="small"
                pourcent={beverageSalesIncrease}
                type="kg"
              ></Value>
              <Value
                label="Average Beverage Price"
                value={expectedBeveragePrice}
                size="small"
                pourcent={beveragePriceIncrease}
              ></Value>
              <Value
                label="Roasted Coffee Price"
                value={expectedRoastedCoffeePricePerKg}
                size="small"
                pourcent={
                  expectedRoastedCoffeePricePerKg /
                    (currentCoffeePurchasingPrice / 100) -
                  100
                }
                negative
              ></Value>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-8">
            <div className="flex flex-col gap-4">
              <Value
                label="Turnover"
                value={expectedBeverageTurnover}
                size="small"
                pourcent={
                  expectedBeverageTurnover / (currentTurnover / 100) - 100
                }
              ></Value>
              <Value
                label="Costs"
                value={expectedBeverageCosts}
                size="small"
                negative
                pourcent={expectedBeverageCosts / (currentCosts / 100) - 100}
              ></Value>
            </div>
            <Value
              label="Profit"
              value={expectedBeverageProfit}
              size="large"
              pourcent={expectedBeverageProfit / (currentProfit / 100) - 100}
            ></Value>
          </div>
        </div>
        <div className="w-full md:w-[36%] h-full flex flex-col gap-6">
          <div className=" gap-4 p-6 md:px-8 md:pt-8 md:pb-10 flex flex-col justify-between bg-white h-1/2">
            <h1 className="section-title">Coffee Bags Sales with Mikafi</h1>
            <Slider
              label="250gr bags sold daily"
              value={4}
              min={0}
              max={10}
              onChange={setExpectedBagsSold}
            ></Slider>

            <div className="flex justify-between items-end">
              <Value
                label="Profit"
                value={coffeeBagProfit}
                size="large"
              ></Value>
              <Value
                label="Turnover"
                value={coffeeBagTurnover}
                size="small"
              ></Value>
              <Value label="Costs" value={coffeeBagCosts} size="small"></Value>
            </div>
          </div>
          <div className="p-6 md:px-8 md:pt-8 md:pb-10 bg-[#FBEDD9] h-1/2 flex flex-col justify-between">
            <h1 className="section-title">Total Coffee Business with Mikafi</h1>

            <div className="flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-4">
                <Value
                  label="Turnover"
                  value={expectedBeverageTurnover + coffeeBagTurnover}
                  size="small"
                  pourcent={
                    (expectedBeverageTurnover + coffeeBagTurnover) /
                      (currentTurnover / 100) -
                    100
                  }
                ></Value>
                <Value
                  label="Costs"
                  value={expectedBeverageCosts + coffeeBagCosts}
                  size="small"
                ></Value>
              </div>
              <Value
                label="Profit"
                value={expectedBeverageProfit + coffeeBagProfit}
                size="large"
                pourcent={
                  (expectedBeverageProfit + coffeeBagProfit) /
                    (currentProfit / 100) -
                  100
                }
              ></Value>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
