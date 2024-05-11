"use client";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useState } from "react";
import { ActiveChain, MatrixAbi, MatrixAddress } from "./componant/Constants";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
// import { ethers } from "ethers";
const ethers = require("ethers");

export default function Home() {
  const address = useAddress();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const { contract: MatrixContract } = useContract(MatrixAddress, MatrixAbi);
  const { mutateAsync: Register, isLoading: registerIsLoading } =
    useContractWrite(MatrixContract, "FreeRegistration");
  const { contract } = useContract(MatrixAddress, MatrixAbi);
  const { data: LastIdUser, isLoading: LastIdUserIsLoading } = useContractRead(
    contract,
    "LastIdUser"
  );
  console.log(
    "LastIdUser--0-->",
    parseInt(Number(LastIdUser && LastIdUser[0]))
  );
  console.log(
    "LastIdUser--1-->",
    parseInt(Number(LastIdUser && LastIdUser[1]))
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const sdk = new ThirdwebSDK(ActiveChain);
      const contract = await sdk.getContract(MatrixAddress, MatrixAbi);
      const refAddr = await contract.call("IdToAddress", [1]);

      const data = await Register({
        args: [
          formData.user_address,
          formData.ref_address,
          "0x131B63c522F7bF238199A032A764e682278E7FF1",
          true,
        ],
      });
      console.log("file: page.tsx:214  callRegister  data:", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-3 md:p-0 bg-teal-300">
      {/* <div className="flex self-end p-4">
        <ConnectWallet />
      </div>
      <div className="w-full max-w-lg">
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="user_address"
            >
              User Address:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="user_address"
              type="text"
              onChange={handleChange}
              placeholder="user Address"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="ref-address"
            >
              Ref Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="ref_address"
              type="text"
              onChange={handleChange}
              placeholder="Ref address"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div> */}
    </main>
  );
}
