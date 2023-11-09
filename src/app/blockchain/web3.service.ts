import { Injectable, NgZone } from '@angular/core';
import { error } from 'console';
import { Observable } from 'rxjs';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
// @Injectable({
//   providedIn: 'root'
// })
const abi = require('../../contracts/artifacts/PollContract.json');

declare var window: any;

export class Web3Service {
  private web3: Web3;
  private contract: Contract;
  private contractAddress: '0x3E7c2f4b5c06fA502C6C80d572097bbF6649654b';
  private contractABI = abi.abi;

  constructor(private zone: NgZone) {
    if (window.web3) {
      console.log('CONTRACT ABI - ', this.contractABI);
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(
        this.contractABI,
        this.contractAddress
      );
    }

    window.ethereum.enable().catch((err) => {
      console.log('ERROR - ', err);
    });
  }

  getAccount(): Promise<string> {
    return this.web3.eth.getAccounts().then((account) => account[0] || '');
  }

  //executeTransaction(vote,pollId,vote)
  async executeTransaction(fnName: string, ...args: any[]): Promise<void> {
    const acc = await this.getAccount();
    this.contract.methods[fnName](...args).send({ from: acc });
  }

  async callFunction(fnName: string, ...args: any[]): Promise<any> {
    const acc = await this.getAccount();
    this.contract.methods[fnName](...args).call({ from: acc });
  }

  onEvents(event: string) {
    return new Observable((observer) => {
      this.contract.events[event]().on('data', (data) => {
        this.zone.run(() => {
          observer.next({
            event: data.event,
            payload: data.returnValues,
          });
        });
      });
    });
  }
}
