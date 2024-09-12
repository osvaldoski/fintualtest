class Stock {
  symbol: string;
  prices: Record<string, number>;

  constructor(symbol: string, prices: Record<string, number>) {
    this.symbol = symbol;
    this.prices = prices;
  }

  getPrice(date: string): number {
    return this.prices[date] || 0.0;
  }
}

class Portfolio {
  private stocks: Stock[] = [];

  addStock(stock: Stock): void {
    this.stocks.push(stock);
  }

  profit(startDate: string, endDate: string): number {
    let startValue = 0;
    let endValue = 0;

    this.stocks.forEach(stock => {
      startValue += stock.getPrice(startDate);
      endValue += stock.getPrice(endDate);
    });

    return endValue - startValue;
  }

  annualizedReturn(startDate: string, endDate: string): number {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const timeDiff = endDateObj.getTime() - startDateObj.getTime();
    const yearsDiff = timeDiff / (1000 * 60 * 60 * 24 * 365);

    const startValue = this.stocks.reduce(
      (acc, stock) => acc + stock.getPrice(startDate),
      0
    );
    const endValue = this.stocks.reduce(
      (acc, stock) => acc + stock.getPrice(endDate),
      0
    );

    const totalReturn = (endValue - startValue) / startValue;
    return Math.pow(1 + totalReturn, 1 / yearsDiff) - 1;
  }
}

//Initialize example stocks
const stock1 = new Stock('BCH', {
  '2023-01-01': 100,
  '2023-06-01': 200,
  '2024-01-01': 300,
});

const stock2 = new Stock('CGE', {
  '2023-01-01': 400,
  '2023-06-01': 500,
  '2024-01-01': 600,
});

// Create Portfolio
const portfolio = new Portfolio();
portfolio.addStock(stock1);
portfolio.addStock(stock2);

// Calculate profit between two dates
const profit = portfolio.profit('2023-01-01', '2024-01-01');
console.log(`Ganancia del portafolio: $${profit}`);

// Calculate annual return between two dates
const annualizedReturn = portfolio.annualizedReturn('2023-01-01', '2024-01-01');
console.log(`Retorno anualizado: ${(annualizedReturn * 100).toFixed(2)}%`);
