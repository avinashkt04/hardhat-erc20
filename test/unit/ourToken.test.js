const { network, ethers, deployments, getNamedAccounts } = require("hardhat");
const { developmentChains, INITIAL_SUPPLY } = require("../../helper-hardhat-config");
const { assert, expect } = require("chai");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("ourToken Unit Tests", async function (){
        let ourToken, player, deployer
        beforeEach(async function () {
            const accounts = await getNamedAccounts()
            player = accounts.player
            deployer = accounts.deployer
            await deployments.fixture(["all"])
            ourToken = await ethers.getContractAt(
                "OurToken",
                (
                    await deployments.get("OurToken")
                ).address
            )
        })

        describe("constructor", function (){
            it("Should have sufficient amount of token", async function (){
                const totalSupply = await ourToken.totalSupply()
                assert.equal(totalSupply, INITIAL_SUPPLY)
            })
            it("initialize the token with corect name and symbol", async function (){
                const name = (await ourToken.name()).toString()
                assert(name, "OurToken")

                const symbol = (await ourToken.symbol()).toString()
                assert(symbol, "OT")
            })
        })

        describe("transfers", function (){
            it("Should be able to transfer token successfully", async function (){
                const tokensToSend = ethers.parseEther("10")
                await ourToken.transfer(player, tokensToSend)
                assert.equal(await ourToken.balanceOf(player), tokensToSend)
            })
            it("emit a transfer event, when a transfer occurs", async function (){
                const tokensToSend = ethers.parseEther("10")
                expect((await ourToken.transfer(player, tokensToSend)).toString()).to.be.emit(ourToken, "Transfer")
            })
        })

        describe("allowance", function (){
            it("should approve other address to spend token", async function (){
                const tokensToSend = ethers.parseEther("10")
                expect((await ourToken.approve(player, tokensToSend)).toString()).to.be.emit(ourToken, "Approval")
                await ourToken.allowance(deployer, player)
                // console.log(await ourToken.transferFrom(deployer, player, tokensToSend))
            })
        })
    })