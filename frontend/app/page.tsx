"use client";
import Image from "next/image";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import idl from "../idl/pool_fun.json";
import { useProgram } from "./hooks/useProgram";

export default function Home() {
  const { disconnecting, connected, wallet } = useWallet();
  const program = useProgram();
  const { connection } = useConnection();
  if (wallet) {
    const provider = new AnchorProvider(connection, wallet, {});

    return (
      <>
        <div>Hi</div>
      </>
    );
  } else {
    return <>Not wallet</>;
  }
}
