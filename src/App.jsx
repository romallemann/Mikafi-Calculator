import './App.css';
import { useState } from 'react';
import Toggle from './toggle';
import Slider from './slider';
import Input from './input';
import Value from './value';

function App() {
  //General
  const machinePurchasePrice = 9900;
  const gramOfCoffeePerBeverage = 0.01;
  const subscriptionFee = 390.0;
  const openDays = 24;
  const payPerRoastFee = 2.0;
  const [greenCoffeeKgPrice, setGreenCoffeeKgPrice] = useState(6);
  const packagingCostBags = 0.5;
  const [beverageSalesIncrease, setBeverageSalesIncrease] = useState(10);
  const [beveragePriceIncrease, setBeveragePriceIncrease] = useState(10);
  const [currentPredictionType, setCurrentPredictionType] =
    useState('Realistic');
  const [greenCoffeeType, setGreenCoffeeType] = useState('Commercial');

  //CURRENT

  const [currentCoffeeUsed, setCurrentCoffeeUsed] = useState(40.0);
  const [currentBeveragePrice, setCurrentBeveragePrice] = useState(4.0);
  const [currentCoffeePurchasingPrice, setCurrentCoffeePurchasingPrice] =
    useState(15.0);
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
  //Profit
  const expectedBeverageProfit =
    expectedBeverageTurnover - expectedBeverageCosts;
  const expectageBeverageBreakeven =
    machinePurchasePrice / (expectedBeverageProfit - currentProfit) + 1;

  // COFFEE BAGS

  const [expectedBagsSold, setExpectedBagsSold] = useState(4);
  const expectedCoffeeSold = expectedBagsSold * openDays;
  const [coffeeBagSellingPrice, setCoffeeBagSellingPrice] = useState(15);
  const coffeeBagCost =
    (greenCoffeeKgPrice + payPerRoastFee) / 2 + packagingCostBags;
  const coffeeBagProfitperBag = coffeeBagSellingPrice - coffeeBagCost;
  const coffeeBagTurnover = expectedCoffeeSold * coffeeBagSellingPrice;
  const coffeeBagProfit = expectedCoffeeSold * coffeeBagProfitperBag;
  const coffeeBagCosts = expectedCoffeeSold * coffeeBagCost;

  const pessimistic = () => {
    setBeverageSalesIncrease(5);
    setBeveragePriceIncrease(5);
    setCurrentPredictionType('Pessimistic');
  };
  const realistic = () => {
    setBeverageSalesIncrease(10);
    setBeveragePriceIncrease(15);
    setCurrentPredictionType('Realistic');
  };
  const optimistic = () => {
    setBeverageSalesIncrease(15);
    setBeveragePriceIncrease(15);
    setCurrentPredictionType('Optimistic');
  };

  const commercial = () => {
    setGreenCoffeeKgPrice(6);
    setCoffeeBagSellingPrice(14);
    setCurrentCoffeePurchasingPrice(15);
    setGreenCoffeeType('Commercial');
  };
  const specialty = () => {
    setGreenCoffeeKgPrice(9);
    setCoffeeBagSellingPrice(20);
    setCurrentCoffeePurchasingPrice(25);
    setGreenCoffeeType('Specialty');
  };
  return (
    <div className="w-screen md:h-screen md:flex md:justify-center items-center">
      <div className="flex-col md:flex-row flex gap-6 md:m-8  w-full max-w-[1500px] md:justify-center">
        <div className="w-full md:w-[28%] current py-8 md:pt-8  flex flex-col justify-between">
          <div className="flex flex-col gap-2 md:gap-8">
            <div className="flex flex-col gap-0 md:gap-4">
              <h1 className="section-title">Your Monthly Coffee Business</h1>
              <p className="text h-16">
                The numbers are calculated with an average of 10gr of coffee per
                beverage and 24 open days per month
              </p>
            </div>
            <div className="flex flex-col gap-2 min-w-[200px] w-11/12 pb-8 md:pb-0">
              <Input
                value={currentCoffeeUsed}
                onChange={setCurrentCoffeeUsed}
                label="Coffee Sold"
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
                label="Purchasing Price by kg"
                unit="$"
                increment={1}
              ></Input>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-8 pt-12 md:pb-[8.85rem]">
            <Value
              label="Turnover"
              value={currentTurnover}
              size="small"
            ></Value>
            <Value label="Costs" value={currentCosts} size="small"></Value>

            <Value label="Profit" value={currentProfit} size="large"></Value>
          </div>
        </div>
        <div className="flex flex-col w-[72%] gap-5">
          <div className="flex gap-5">
            <div className="w-full md:w-1/2 px-6 py-8 md:px-8 md:pt-8 md:pb-10  bg-white h-full flex flex-col justify-between gap-4">
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
                    label="Coffee Sold"
                    value={expectedBeverageCoffeeUsed}
                    size="small"
                    pourcent={beverageSalesIncrease}
                    type="kg"
                    comment={
                      (expectedBeverageCoffeeUsed / 24).toFixed(1) + ' kg / day'
                    }
                  ></Value>
                  <Value
                    label="Average Beverage Price"
                    value={expectedBeveragePrice}
                    size="small"
                    pourcent={beveragePriceIncrease}
                  ></Value>
                  <div className="flex items-end gap-2 justify-between">
                    <Value
                      label="Green Coffee Price per Kg"
                      value={greenCoffeeKgPrice}
                      size="small"
                      negative
                    ></Value>
                    <div>
                      <Toggle
                        currentState={greenCoffeeType}
                        tab1Name="Commercial"
                        tab2Name="Specialty"
                        tab1Action={commercial}
                        tab2Action={specialty}
                        size="small"
                      ></Toggle>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-8 pt-12">
                <Value
                  label="Turnover Increase, per month"
                  value={expectedBeverageTurnover - currentTurnover}
                  size="small"
                  pourcent={
                    expectedBeverageTurnover / (currentTurnover / 100) - 100
                  }
                  sign="always"
                ></Value>
                <Value
                  label="Costs Change, per month"
                  value={expectedBeverageCosts - currentCosts}
                  size="small"
                  negative
                  pourcent={expectedBeverageCosts / (currentCosts / 100) - 100}
                  sign="always"
                ></Value>

                <Value
                  label="Profit Increase, per month"
                  value={expectedBeverageProfit - currentProfit}
                  size="large"
                  pourcent={
                    expectedBeverageProfit / (currentProfit / 100) - 100
                  }
                  sign="always"
                ></Value>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full flex flex-col gap-6">
              <div className="p-6 md:px-8 md:pt-8 md:pb-10 flex flex-col justify-between bg-white h-full">
                <h1 className="section-title">Coffee Bags Sales with Mikafi</h1>
                <div className="flex flex-col gap-3 pb-10">
                  <Slider
                    label="500gr bags sold daily"
                    value={4}
                    min={0}
                    max={10}
                    onChange={setExpectedBagsSold}
                  ></Slider>

                  <div className="flex justify-between items-end">
                    <div className="w-1/3">
                      <Input
                        value={coffeeBagSellingPrice}
                        onChange={setCoffeeBagSellingPrice}
                        label="Price per Bag"
                        unit="$"
                        increment={1}
                      ></Input>
                    </div>
                    <div className="w-1/3 py-2 pl-8">
                      <Value
                        label="Profit per Bag"
                        value={coffeeBagProfitperBag}
                        size="small"
                      ></Value>
                    </div>
                    <div className="w-1/3 py-2 pl-8">
                      <Value
                        label="Cost per Bag"
                        value={coffeeBagCost}
                        size="small"
                      ></Value>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-8 pt-12">
                  <Value
                    label="Turnover Increase, per month"
                    value={coffeeBagTurnover}
                    size="small"
                    pourcent={coffeeBagTurnover / (currentTurnover / 100)}
                    sign="always"
                  ></Value>
                  <Value
                    label="Additional Costs, per month"
                    value={coffeeBagCosts}
                    size="small"
                    sign="always"
                  ></Value>

                  <Value
                    label="Profit Increase, per month"
                    value={coffeeBagProfit}
                    size="large"
                    pourcent={coffeeBagProfit / (currentProfit / 100)}
                    sign="always"
                  ></Value>
                </div>
              </div>
            </div>
          </div>
          <div className="flex bg-[#FAE4C6] p-6 md:p-8">
            <div className="w-1/3">
              <Value
                label="Total Profit Increase, per month"
                value={expectedBeverageProfit + coffeeBagProfit - currentProfit}
                size="large"
                pourcent={
                  (expectedBeverageProfit + coffeeBagProfit - currentProfit) /
                  (currentProfit / 100)
                }
                sign="always"
              ></Value>
            </div>
            <div className="w-1/3">
              <Value
                label="Total Turnover  Increase, per month"
                value={
                  expectedBeverageTurnover + coffeeBagTurnover - currentTurnover
                }
                size="small"
                pourcent={
                  (expectedBeverageTurnover +
                    coffeeBagTurnover -
                    currentTurnover) /
                  (currentProfit / 100)
                }
                sign="always"
              ></Value>
            </div>
            <div className="w-1/3">
              <Value
                label="Total Costs Change, per month"
                value={expectedBeverageCosts + coffeeBagCost}
                size="small"
                negative
                pourcent={
                  (expectedBeverageCosts + coffeeBagCost) /
                  (currentProfit / 100)
                }
                sign="always"
              ></Value>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
