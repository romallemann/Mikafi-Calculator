import "./App.css";
import { useState } from "react";
import classNames from "classnames";

function App() {
	//General
	const gramOfCoffeePerBeverage = 0.015;
	const subscriptionFee = 390.0;
	const payPerRoastFee = 2.0;
	const greenCoffeeKgPrice = 9.0;
	const packagingCostBags = 1.0;
	const [beverageSalesIncrease, setBeverageSalesIncrease] = useState(1.1);
	const [beveragePriceIncrease, setBeveragePriceIncrease] = useState(1.1);
	const [currentPredictionType, setCurrentPredictionType] =
		useState("Realistic");

	//CURRENT Te

	const [currentCoffeeUsed, setCurrentCoffeeUsed] = useState(60);
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
		currentCoffeeUsed * beverageSalesIncrease;
	const expectedBeveragePrice = currentBeveragePrice * beveragePriceIncrease;
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

	const expectedBeanSold = 18;
	const coffeeBagKgSellingPrice = 60;
	const coffeeBagCostPerKG =
		greenCoffeeKgPrice + payPerRoastFee + packagingCostBags;
	const coffeeBagTurnover = expectedBeanSold * coffeeBagKgSellingPrice;
	const coffeeBagCosts = expectedBeanSold * coffeeBagCostPerKG;
	const coffeeBagProfit = coffeeBagTurnover - coffeeBagCosts;

	function addPlusToPositive(number) {
		return number > 0 ? `+${number}` : number.toString();
	}

	return (
		<div className="App">
			<div className="current m-8 bg-gray-300">
				<h1 className="text-2xl">Your Current Situation</h1>
				<div className="flex justify-center gap-4">
					<div className="flex flex-col">
						Coffee Used 
						<input
							type="number"
							className="border border-gray text-center"
							value={currentCoffeeUsed}
							onChange={(event) =>
								setCurrentCoffeeUsed(
									parseFloat(event.target.value)
								)
							}
						/>
					</div>
					<div className="flex flex-col">
						Average Beverage Price
						<input
							type="number"
							className="border border-gray text-center"
							value={currentBeveragePrice}
							onChange={(event) =>
								setCurrentBeveragePrice(
									parseFloat(event.target.value)
								)
							}
						/>
					</div>
					<div className="flex flex-col">
						Coffee Purchasing Price
						<input
							type="number"
							className="border border-gray text-center"
							value={currentCoffeePurchasingPrice}
							onChange={(event) =>
								setCurrentCoffeePurchasingPrice(
									parseFloat(event.target.value)
								)
							}
						/>
					</div>
				</div>
				<div className="flex justify-center gap-4">
					<div>
						<h2>Turnover</h2>
						<h3>${currentTurnover.toFixed(2)}</h3>
					</div>
					<div>
						<h2>Costs</h2>
						<h3>${currentCosts.toFixed(2)}</h3>
					</div>
					<div>
						<h2>Profit</h2>
						<h3>${currentProfit.toFixed(2)}</h3>
					</div>
				</div>
			</div>
			<div className="m-8">
				<h1 className="text-2xl">Projection with Mikafi</h1>
				<div className="flex justify-center gap-4 bg-gray-200 w-fit rounded-full">
					<button
						className={
							"py-2 px-4 rounded-full " +
							classNames(
								currentPredictionType === "Pessimisstic" &&
									"bg-black text-white"
							)
						}
						onClick={() => {
							setBeverageSalesIncrease(1.05);
							setBeveragePriceIncrease(1.1);
							setCurrentPredictionType("Pessimisstic");
						}}
					>
						Pessimisstic
					</button>
					<button
						className={
							"py-2 px-4 rounded-full " +
							classNames(
								currentPredictionType === "Realistic" &&
									"bg-black text-white"
							)
						}
						onClick={() => {
							setBeverageSalesIncrease(1.1);
							setBeveragePriceIncrease(1.1);
							setCurrentPredictionType("Realistic");
						}}
					>
						Realistic
					</button>
					<button
						className={
							"py-2 px-4 rounded-full " +
							classNames(
								currentPredictionType === "Optimistic" &&
									"bg-black text-white"
							)
						}
						onClick={() => {
							setBeverageSalesIncrease(1.2);
							setBeveragePriceIncrease(1.1);
							setCurrentPredictionType("Optimistic");
						}}
					>
						Optimistic
					</button>
				</div>
				<div className="flex justify-center gap-4">
					<div>
						<h2>Coffee Used</h2>
						<h3>
							{expectedBeverageCoffeeUsed.toFixed(2)} kg (+
							{(beverageSalesIncrease * 100 - 100).toFixed(1)}%)
						</h3>
					</div>
					<div>
						<h2>Average Beverage Price</h2>
						<h3>
							${expectedBeveragePrice.toFixed(2)} (+
							{(beveragePriceIncrease * 100 - 100).toFixed(1)}%)
						</h3>
					</div>
					<div>
						<h2>Roasted Coffee Price</h2>
						<h3>
							${expectedRoastedCoffeePricePerKg.toFixed(2)} / kg (
							{addPlusToPositive(
								(
									expectedRoastedCoffeePricePerKg /
										(currentCoffeePurchasingPrice / 100) -
									100
								).toFixed(1)
							)}
							%)
						</h3>
					</div>
				</div>
				<div className="flex justify-center gap-4">
					<div>
						<h2>Turnover</h2>
						<h3>
							${expectedBeverageTurnover.toFixed(2)}(
							{addPlusToPositive(
								(
									expectedBeverageTurnover /
										(currentTurnover / 100) -
									100
								).toFixed(1)
							)}
							%)
						</h3>
					</div>
					<div>
						<h2>Costs</h2>
						<h3>
							${expectedBeverageCosts.toFixed(2)}(
							{addPlusToPositive(
								(
									expectedBeverageCosts /
										(currentCosts / 100) -
									100
								).toFixed(1)
							)}
							%)
						</h3>
					</div>
					<div>
						<h2>Profit</h2>
						<h3>
							${expectedBeverageProfit.toFixed(2)}(
							{addPlusToPositive(
								(
									expectedBeverageProfit /
										(currentProfit / 100) -
									100
								).toFixed(1)
							)}
							%)
						</h3>
					</div>
				</div>
				<div className="m-8">
					<h1 className="text-2xl">+ Coffee Bags Sales</h1>
					<div className="flex justify-center gap-4">
						<div>
							<h2>Coffee Beans Sold</h2>
							<h3>{expectedBeanSold.toFixed(2)} kg</h3>
						</div>
						<div>
							<h2>Selling Price per KG</h2>
							<h3>${coffeeBagKgSellingPrice.toFixed(2)}</h3>
						</div>
						<div>
							<h2>Cost per KG</h2>
							<h3>{coffeeBagCostPerKG.toFixed(2)} kg</h3>
						</div>
					</div>
					<div className="flex justify-center gap-4">
						<div>
							<h2>Turnover</h2>
							<h3>${coffeeBagTurnover.toFixed(2)}</h3>
						</div>
						<div>
							<h2>Costs</h2>
							<h3>${coffeeBagCosts.toFixed(2)}</h3>
						</div>
						<div>
							<h2>Profit</h2>
							<h3>${coffeeBagProfit.toFixed(2)}</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
