import axios from "axios";

const ethereumUsd = async () => {
  try {
    const ETH_USD = await axios.get(
      "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
    );
    console.log("Ethereum Price in USD:", ETH_USD.data.price);

    return ETH_USD.data.price;
  } catch (error) {
    console.log(error);
  }
};

export { ethereumUsd };
