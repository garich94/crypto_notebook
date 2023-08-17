import { Contract } from "ethers";
import provider from "./provider";

const address = "0xC83C0f5C16e274E257F5F0bB1A2e4EA743D466f5";
const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_telegram",
        type: "string",
      },
    ],
    name: "createContact",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_telegram",
        type: "string",
      },
      {
        internalType: "string",
        name: "_disc",
        type: "string",
      },
    ],
    name: "createContact",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "ownerToContact",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const ethABI = [
  "function ownerToContact(address) public view returns (address)",
  "function createContact(string, string) public",
  "function createContact(string) public",
];
const contactFactory = new Contract(address, ethABI, provider);

export default contactFactory;
