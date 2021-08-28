import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    inputTitle: '',
    inputAmount: '',
    inputType: transactionTypeOptions[0].optionId,
  }

  onChangeInputTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeInputAmount = event => {
    this.setState({inputAmount: parseInt(event.target.value)})
  }

  onChangeInputType = event => {
    this.setState({inputType: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {inputTitle, inputAmount, inputType} = this.state

    const optionType = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === inputType,
    )

    const {displayText} = optionType

    const newTransaction = {
      id: uuidv4(),
      title: inputTitle,
      amount: parseInt(inputAmount),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      inputTitle: '',
      inputAmount: '',
      inputType: transactionTypeOptions[0].optionId,
    }))
  }

  calculateExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  calculateIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  calculateBalance = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0
    let incomeAmount = 0
    let balanceAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      } else {
        incomeAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionsList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    this.setState({transactionsList: updatedTransactionsList})
  }

  render() {
    const {inputTitle, inputAmount, inputType, transactionsList} = this.state

    const incomeAmount = this.calculateIncome()
    const expensesAmount = this.calculateExpenses()
    const balanceAmount = this.calculateBalance()
    return (
      <div className="money-manager_bg-container">
        <div className="money-manager-container">
          <div className="head-container">
            <h1>Hi, Pradeep</h1>
            <p>
              Welcome back to your
              <span className="money-manager-text"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
            balanceAmount={balanceAmount}
          />
          <div className="transactions-container">
            <form
              className="add-transaction-container"
              onSubmit={this.onAddTransaction}
            >
              <h1 className="transaction-heading">Add Transaction</h1>
              <label htmlFor="input-title">TITLE</label>
              <input
                type="text"
                placeholder="TITLE"
                id="input-title"
                value={inputTitle}
                onChange={this.onChangeInputTitle}
              />
              <label htmlFor="input-amount">AMOUNT</label>
              <input
                type="text"
                placeholder="AMOUNT"
                id="input-amount"
                value={inputAmount}
                onChange={this.onChangeInputAmount}
              />
              <label htmlFor="input-type">TYPE</label>
              <select
                id="input-type"
                value={inputType}
                onChange={this.onChangeInputType}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <div className="history-transactions">
              <h1 className="history">History</h1>
              <div className="history-transactions-container">
                <ul className="transactions-table">
                  <li className="history-headings">
                    <p className="history-heading">Title</p>
                    <p className="history-heading">Amount</p>
                    <p className="history-heading">Type</p>
                  </li>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
