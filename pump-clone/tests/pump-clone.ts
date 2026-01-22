import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PumpClone } from "../target/types/pump_clone";
import { assert } from "chai";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";

describe("pump-clone", () => {
  // Configure the client to use the local cluster.
  let provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.pumpClone as Program<PumpClone>;

  let creator = new anchor.web3.Keypair();
  let user = new anchor.web3.Keypair();

  let curveSeed = [Buffer.from("bonding-pump"), creator.publicKey.toBuffer()];
  let mintSeed = [
    Buffer.from("bonding-pump-mint"),
    creator.publicKey.toBuffer(),
  ];

  let [curveConfigPdaPubkey, curveBump] =
    anchor.web3.PublicKey.findProgramAddressSync(curveSeed, program.programId);
  let [mintPdaPubkey, mintBump] = anchor.web3.PublicKey.findProgramAddressSync(
    mintSeed,
    program.programId
  );

  before("initialize airdrop", async () => {
    // Fund accounts using the provider wallet (1000 SOL pre-funded)
    const transaction = new anchor.web3.Transaction().add(
      anchor.web3.SystemProgram.transfer({
        fromPubkey: provider.wallet.publicKey,
        toPubkey: creator.publicKey,
        lamports: 5 * anchor.web3.LAMPORTS_PER_SOL,
      }),
      anchor.web3.SystemProgram.transfer({
        fromPubkey: provider.wallet.publicKey,
        toPubkey: user.publicKey,
        lamports: 5 * anchor.web3.LAMPORTS_PER_SOL,
      })
    );

    await provider.sendAndConfirm(transaction);

    const creatorInfo = await provider.connection.getAccountInfo(
      creator.publicKey
    );
    assert.equal(creatorInfo.lamports, 5 * anchor.web3.LAMPORTS_PER_SOL);
  });

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .initialize()
      .accounts({
        signer: creator.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([creator])
      .rpc();

    console.log("Your transaction signature", tx);

    let curveConfigPdaInfo = await provider.connection.getAccountInfo(
      curveConfigPdaPubkey
    );
    assert.ok(curveConfigPdaInfo);

    const account = await program.account.curveConfiguration.fetch(
      curveConfigPdaPubkey
    );

    // Correct assertion: Check if the stored owner key equals the creator's key
    assert.ok(account.owner.equals(creator.publicKey));
  });
});
