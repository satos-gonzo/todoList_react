import React from 'react';


export class TodoCreater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      errMsg: '',
      errFlg: false
    }
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /* input箇所の入力値が変更されたら行う処理 */
  handleChange(event) {
    this.setState({ val: event.target.value });
  }

  /* keyUpした時のイベント */
  handleKeyUp(event) {
    if (event.keyCode === 13 && event.shiftKey === true) {//Ent + Shift押した場合
      const val = event.target.value;
      if (!val) {
        this.setState({
          errFlg: true,
          errMsg: 'タスク名が未入力です',
        });
        return;
      }
      // valueが空でない時の処理
      this.setState({
        val: '',
        errMsg: '',
      });
      /* リファクタ：Taskの追加処理 */
      this.props.callBackAddTask(val);
    }
  }


  render() {
    const errMsg = (this.state.errFlg) ? <span className="error">{this.state.errMsg}</span> : '';
    return (
      <div className="form">
        <div className="inputArea">
          <input type="text"
            className="inputText"
            placeholder="something to do task"
            value={this.state.val}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp} />
          {errMsg}
        </div>
      </div>
    );
  }
}
