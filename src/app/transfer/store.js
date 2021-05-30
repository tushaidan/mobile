import { observable, action, toJS } from 'mobx'
import * as API from '../api/api.js'

export class PayStore {

  @observable dataSource = [];
  @observable loading = false;
  @observable payResult = "";

  constructor() {
    // this.getPaySource();
  }

  @action
  async getPaySource () {
    const result = await API.getPaySource()
    console.log(result.data)
    this.payResult = result.data
    
  }
}
