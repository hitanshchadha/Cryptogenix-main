import Moralis from "moralis";

if (!Moralis.Core.isStarted) {
  Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_APP_ID });
  console.log("✅ Moralis Initialized");
}

export default Moralis;
